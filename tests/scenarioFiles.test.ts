import { describe, expect, it } from "vitest";
import { calculate, defaultScenario } from "../src/model";
import {
  parseScenarioFile,
  SCENARIO_FILE_MAX_BYTES,
  serializeScenario,
} from "../src/scenarioFiles";

const date = new Date("2026-09-12T12:30:00.000Z");
const validFile = () => JSON.parse(serializeScenario(defaultScenario, date));

describe("Arquivos portáteis de cenário", () => {
  it("preserva os parâmetros, a data e os resultados ao exportar e importar", () => {
    const scenario = {
      ...defaultScenario,
      name: "Investigação de voláteis",
      concentration: 3.75,
      use: "propellant" as const,
      dust: false,
    };
    const imported = parseScenarioFile(serializeScenario(scenario, date));
    expect(imported).toEqual({
      schemaVersion: 1,
      exportedAt: date.toISOString(),
      scenario,
    });
    expect(calculate(imported.scenario)).toEqual(calculate(scenario));
    expect(imported.scenario).not.toBe(scenario);
  });

  it("aceita um arquivo UTF-8 com marca inicial e espaços", () => {
    expect(
      parseScenarioFile("\uFEFF \n" + serializeScenario(defaultScenario, date)),
    ).toEqual(validFile());
  });

  it("distingue arquivo vazio de JSON malformado", () => {
    expect(() => parseScenarioFile(" \n ")).toThrow("arquivo está vazio");
    expect(() => parseScenarioFile('{"schemaVersion":')).toThrow("ler o JSON");
    expect(() => parseScenarioFile("<html>Erro</html>")).toThrow("ler o JSON");
  });

  it("rejeita conteúdo que não representa um documento de cenário", () => {
    for (const content of ["null", "[]", '"cenário"', "42"])
      expect(() => parseScenarioFile(content)).toThrow("não contém um cenário");
  });

  it("rejeita versão ausente, desconhecida ou escrita como texto", () => {
    for (const schemaVersion of [undefined, 0, 2, "1"])
      expect(() =>
        parseScenarioFile(JSON.stringify({ ...validFile(), schemaVersion })),
      ).toThrow("Versão do arquivo incompatível");
  });

  it("rejeita parâmetros incompletos, fora dos limites ou com tipos incorretos", () => {
    for (const scenario of [
      null,
      [],
      {},
      { ...defaultScenario, concentration: 0 },
      { ...defaultScenario, depth: 201 },
      { ...defaultScenario, target: "100" },
      { ...defaultScenario, budget: null },
      { ...defaultScenario, dust: "sim" },
      { ...defaultScenario, use: "__proto__" },
      { ...defaultScenario, name: "x".repeat(81) },
    ])
      expect(() =>
        parseScenarioFile(JSON.stringify({ ...validFile(), scenario })),
      ).toThrow("campos ausentes, tipos incorretos ou valores fora dos limites");
  });

  it("rejeita data ausente, inválida ou impossível no calendário", () => {
    for (const exportedAt of [
      undefined,
      123,
      "ontem",
      "2026-02-30T12:30:00.000Z",
    ])
      expect(() =>
        parseScenarioFile(JSON.stringify({ ...validFile(), exportedAt })),
      ).toThrow("data de exportação");
  });

  it("limita o tamanho real UTF-8 antes de interpretar o arquivo", () => {
    const text = JSON.stringify({
      ...validFile(),
      note: "água".repeat(14000),
    });
    expect(text.length).toBeLessThan(SCENARIO_FILE_MAX_BYTES);
    expect(new TextEncoder().encode(text).byteLength).toBeGreaterThan(
      SCENARIO_FILE_MAX_BYTES,
    );
    expect(() => parseScenarioFile(text)).toThrow("excede 64 KiB");
    expect(() => parseScenarioFile(" ".repeat(SCENARIO_FILE_MAX_BYTES + 1)))
      .toThrow("excede 64 KiB");
  });

  it("aceita um documento válido no limite de tamanho", () => {
    const text = serializeScenario(defaultScenario, date);
    const padding = SCENARIO_FILE_MAX_BYTES - new TextEncoder().encode(text).byteLength;
    expect(parseScenarioFile(text + " ".repeat(padding)).scenario).toEqual(
      defaultScenario,
    );
  });

  it("descarta campos desconhecidos sem propagação de propriedades especiais", () => {
    const additions = JSON.parse(
      '{"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}},"extra":"ignorar"}',
    );
    const imported = parseScenarioFile(JSON.stringify({
      ...validFile(),
      ...additions,
      scenario: { ...defaultScenario, ...additions },
    }));
    expect(imported).toEqual(validFile());
    expect(Object.getPrototypeOf(imported.scenario)).toBe(Object.prototype);
    expect(Object.hasOwn(imported.scenario, "__proto__")).toBe(false);
    expect(Object.hasOwn(imported, "constructor")).toBe(false);
  });

  it("também remove campos extras na exportação", () => {
    const scenario = { ...defaultScenario, extra: "ignorar" };
    expect(JSON.parse(serializeScenario(scenario, date))).toEqual(validFile());
  });

  it("impede exportar cenários e datas inválidos", () => {
    expect(() => serializeScenario({ ...defaultScenario, recovery: NaN }, date))
      .toThrow("cenário está fora dos limites");
    expect(() => serializeScenario(defaultScenario, new Date("inválida")))
      .toThrow("data de exportação é inválida");
  });
});
