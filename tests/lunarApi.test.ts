import { describe, expect, it } from "vitest";
import {
  buildQuery,
  dataLayers,
  normalizeProducts,
  notebookReport,
  ODE_ENDPOINT,
  PAGE_SIZE,
  readNotebook,
  safeUrl,
  type LayerId,
} from "../src/lunarApi";

const product = {
  ode_id: "37701085",
  pdsid: "dlre_prp_south",
  iid: "DLRE",
  pt: "PRP",
  Data_Set_Id: "lro_diviner_derived1-data_derived_prp",
  Product_title: "LRO Diviner South Polar Resource Product",
  Product_version_id: "1.0",
  Product_creation_time: "2018-02-21T12:00:00",
};
const response = (records: unknown = [product]) => ({
  ODEResults: { Status: "Success", Count: "1", Products: { Product: records } },
});
const entry = () => ({
  product: normalizeProducts(response(), "thermal")[0],
  queryUrl: buildQuery("thermal"),
  fetchedAt: "2026-09-12T12:00:00.000Z",
  layerId: "thermal" as const,
  note: "Verificar a versão do produto antes da interpretação.",
});

describe("Catálogo lunar e caderno de pesquisa", () => {
  it("monta consultas limitadas para os instrumentos selecionados", () => {
    for (const layer of dataLayers) {
      const url = new URL(buildQuery(layer.id, PAGE_SIZE));
      expect(url.origin + url.pathname).toBe(ODE_ENDPOINT);
      expect(url.searchParams.get("target")).toBe("moon");
      expect(url.searchParams.get("iid")).toBe(layer.iid);
      expect(url.searchParams.get("pt")).toBe(layer.pt);
      expect(url.searchParams.get("results")).toBe("copf");
      expect(url.searchParams.get("limit")).toBe(String(PAGE_SIZE));
      expect(url.searchParams.get("offset")).toBe(String(PAGE_SIZE));
    }
    for (const offset of [-1, 0.5, 601, Infinity, NaN])
      expect(() => buildQuery("thermal", offset)).toThrow("fora dos limites");
    expect(() => buildQuery("desconhecido" as LayerId)).toThrow("fora dos limites");
  });

  it("recusa respostas malformadas e estados de erro do serviço", () => {
    for (const payload of [null, [], {}, { ODEResults: { Status: "Error" } }])
      expect(() => normalizeProducts(payload, "thermal")).toThrow("não confirmou");
    expect(() => normalizeProducts({
      ODEResults: { Status: "Success", Count: "1" },
    }, "thermal")).toThrow("estrutura inesperada");
  });

  it("reconhece resposta vazia confirmada e aceita registro único", () => {
    expect(normalizeProducts({ ODEResults: { Status: "Success", Count: "0" } }, "thermal"))
      .toEqual([]);
    const singleton = normalizeProducts(response(product), "thermal");
    expect(singleton).toHaveLength(1);
    expect(singleton[0]).toMatchObject({
      id: product.ode_id,
      pdsId: product.pdsid,
      instrument: "Diviner",
      labelVersion: "1.0",
    });
    expect(singleton).toEqual(normalizeProducts(response(), "thermal"));
  });

  it("não transforma registro de outro instrumento em evidência da camada", () => {
    for (const changed of [
      { ...product, iid: "LOLA" },
      { ...product, pt: "GDRPSR" },
      { ...product, ode_id: "inválido" },
      { ...product, pdsid: "" },
    ])
      expect(() => normalizeProducts(response(changed), "thermal"))
        .toThrow("não corresponde ao instrumento");
  });

  it("recusa páginas maiores que a quantidade solicitada", () => {
    expect(() => normalizeProducts(response(Array(PAGE_SIZE + 1).fill(product)), "thermal"))
      .toThrow("mais registros");
  });

  it("bloqueia links ativos, relativos, inseguros ou com credenciais", () => {
    for (const value of [undefined, 10, "/local", "javascript:alert(1)", "data:text/html,teste", "http://example.org", "https://user:secret@example.org"])
      expect(safeUrl(value)).toBe("");
    expect(safeUrl("https://pds-geosciences.wustl.edu/missions/lro/diviner.htm"))
      .toBe("https://pds-geosciences.wustl.edu/missions/lro/diviner.htm");
    const record = normalizeProducts(response({
      ...product,
      ProductURL: "javascript:alert(1)",
      LabelURL: "http://example.org/label",
      FilesURL: "data:text/html,teste",
    }), "thermal")[0];
    expect(new URL(record.productUrl).hostname).toBe("ode.rsl.wustl.edu");
    expect(record.labelUrl).toBe("");
    expect(new URL(record.filesUrl).hostname).toBe("ode.rsl.wustl.edu");
  });

  it("recupera notas e proveniência sem aceitar conteúdo inválido do armazenamento", () => {
    const valid = entry();
    expect(readNotebook(JSON.stringify([valid]))).toEqual([valid]);
    for (const text of [null, "{", "{}", "null", " ".repeat(200001), JSON.stringify(Array(13).fill(valid))])
      expect(readNotebook(text)).toEqual([]);
    const invalid = [
      { ...valid, layerId: "desconhecido" },
      { ...valid, fetchedAt: "ontem" },
      { ...valid, queryUrl: "https://example.org/?query=product" },
      { ...valid, product: { ...valid.product, id: "erro" } },
    ];
    expect(readNotebook(JSON.stringify([...invalid, valid]))).toEqual([valid]);
  });

  it("limita notas importadas e remove URLs inseguras dos registros salvos", () => {
    const saved = entry();
    const [restored] = readNotebook(JSON.stringify([{
      ...saved,
      note: "a".repeat(1300),
      product: { ...saved.product, labelUrl: "javascript:alert(1)" },
    }]));
    expect(restored.note).toHaveLength(1200);
    expect(restored.product.labelUrl).toBe("");
  });

  it("exporta consulta, interpretação e limites no relatório do caderno", () => {
    const saved = entry();
    const report = notebookReport([saved]);
    expect(report).toContain(saved.queryUrl);
    expect(report).toContain(saved.note);
    expect(report).toContain(saved.product.pdsId);
    expect(report).toContain("Metadados não confirmam água explorável");
    expect(report).toContain("não equivale a três evidências independentes");
  });
});
