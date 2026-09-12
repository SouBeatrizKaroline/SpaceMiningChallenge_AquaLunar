import { describe, it, expect } from "vitest";
import {
  calculate,
  defaultScenario as s,
  isScenario,
  report,
  sensitivity,
  questions,
} from "../src/model";
describe("Balanço de água", () => {
  it("conserva água entre captura, perdas e separação", () => {
    const r = calculate(s);
    expect(r.contained).toBeCloseTo(s.target + r.uncaptured + r.separationLoss);
    expect(r.feed).toBeCloseTo(r.residue + r.contained);
  });
  it("reduzir teor pela metade dobra a alimentação", () =>
    expect(calculate({ ...s, concentration: 2.5 }).feed).toBeCloseTo(
      calculate(s).feed * 2,
    ));
  it("reduzir recuperação aumenta alimentação", () =>
    expect(calculate({ ...s, recovery: 35 }).feed).toBeCloseTo(
      calculate(s).feed * 2,
    ));
  it("recuperação na separação não representa pureza", () =>
    expect(report(s)).toContain("não é pureza"));
  it("profundidade altera remoção sem inventar concentração", () => {
    const a = calculate(s),
      b = calculate({ ...s, depth: 60 });
    expect(b.overburden).toBeCloseTo(a.overburden * 2);
    expect(b.feed).toBe(a.feed);
    expect(b.energy).toBeGreaterThan(a.energy);
  });
  it("área altera somente geometria da cobertura", () =>
    expect(calculate({ ...s, area: 20 }).overburden).toBe(
      calculate(s).overburden * 2,
    ));
  it("cobertura nula implica zero remoção superior", () =>
    expect(calculate({ ...s, depth: 0 }).overburden).toBe(0));
  it("recuperação total implica zero perdas de água", () => {
    const r = calculate({ ...s, recovery: 100, separation: 100 });
    expect(r.uncaptured).toBe(0);
    expect(r.separationLoss).toBe(0);
  });
  it("eletrólise conserva a massa ideal", () => {
    const r = calculate({ ...s, use: "propellant" });
    expect(r.oxygen + r.hydrogen).toBeCloseTo(s.target);
    expect(r.waterRemaining).toBe(0);
  });
  it("objetivo água mantém produto e não gera gases", () => {
    const r = calculate({ ...s, use: "water" });
    expect(r.oxygen).toBe(0);
    expect(r.hydrogen).toBe(0);
    expect(r.waterRemaining).toBe(s.target);
  });
  it("não soma água e gases como produtos simultâneos", () =>
    expect(calculate({ ...s, use: "oxygen" }).waterRemaining).toBe(0));
  it("orçamento insuficiente é explicitado", () =>
    expect(calculate({ ...s, budget: 100 }).withinBudget).toBe(false));
  it("coextraídos geram perguntas sem alterar energia arbitrariamente", () => {
    const r = calculate(s),
      x = calculate({ ...s, dust: false, volatiles: false });
    expect(x.energy).toBe(r.energy);
    expect(questions(s).length).toBeGreaterThan(
      questions({ ...s, dust: false, volatiles: false }).length,
    );
  });
  it("análise de sensibilidade reduz alimentação ao aumentar teor", () => {
    const r = sensitivity(s);
    for (let i = 1; i < r.length; i++)
      expect(r[i].feed).toBeLessThan(r[i - 1].feed);
  });
  it("rejeita dados nulos, tipos inválidos e campos inexistentes", () => {
    for (const x of [
      null,
      {},
      { ...s, concentration: 0 },
      { ...s, target: Infinity },
      { ...s, recovery: NaN },
      { ...s, use: "__proto__" },
      { ...s, depth: -1 },
      { ...s, area: "10" },
    ])
      expect(isScenario(x)).toBe(false);
  });
  it("lança erro para cenário inválido", () =>
    expect(() => calculate({ ...s, concentration: 0 })).toThrow());
  it("relatório inclui fontes e custos omitidos", () => {
    const t = report(s);
    expect(t).toContain("https://science.nasa.gov/mission/lcross/");
    expect(t).toContain("liquefação");
    expect(t).toContain("sem medição local");
  });
});
