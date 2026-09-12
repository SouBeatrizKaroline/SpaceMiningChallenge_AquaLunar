import { isScenario, type Scenario } from "./model";

export const SCENARIO_FILE_MAX_BYTES = 64 * 1024;

export interface ScenarioFile {
  schemaVersion: 1;
  scenario: Scenario;
  exportedAt: string;
}

function copyScenario(value: Scenario): Scenario {
  return {
    name: value.name,
    concentration: value.concentration,
    depth: value.depth,
    recovery: value.recovery,
    separation: value.separation,
    target: value.target,
    area: value.area,
    thermal: value.thermal,
    budget: value.budget,
    use: value.use,
    dust: value.dust,
    volatiles: value.volatiles,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function serializeScenario(
  scenario: Scenario,
  exportedAt: Date = new Date(),
): string {
  if (!isScenario(scenario))
    throw new Error("Não foi possível exportar: o cenário está fora dos limites do laboratório.");
  if (!Number.isFinite(exportedAt.getTime()))
    throw new Error("Não foi possível exportar: a data de exportação é inválida.");
  const file: ScenarioFile = {
    schemaVersion: 1,
    scenario: copyScenario(scenario),
    exportedAt: exportedAt.toISOString(),
  };
  return JSON.stringify(file, null, 2) + "\n";
}

export function parseScenarioFile(text: string): ScenarioFile {
  if (
    text.length > SCENARIO_FILE_MAX_BYTES ||
    new TextEncoder().encode(text).byteLength > SCENARIO_FILE_MAX_BYTES
  )
    throw new Error("O arquivo excede 64 KiB. Escolha um cenário exportado pelo AQUA Lunar.");
  const content = text.replace(/^\uFEFF/, "").trim();
  if (!content)
    throw new Error("O arquivo está vazio. Escolha um cenário em formato JSON.");

  let value: unknown;
  try {
    value = JSON.parse(content);
  } catch {
    throw new Error("Não foi possível ler o JSON. O arquivo pode estar incompleto ou em outro formato.");
  }
  if (!isRecord(value))
    throw new Error("O arquivo não contém um cenário do AQUA Lunar.");
  if (value.schemaVersion !== 1)
    throw new Error("Versão do arquivo incompatível. Este laboratório aceita a versão 1.");
  if (!isRecord(value.scenario) || !isScenario(value.scenario))
    throw new Error("O cenário contém campos ausentes, tipos incorretos ou valores fora dos limites do laboratório.");
  if (
    typeof value.exportedAt !== "string" ||
    !Number.isFinite(Date.parse(value.exportedAt)) ||
    new Date(value.exportedAt).toISOString() !== value.exportedAt
  )
    throw new Error("A data de exportação está ausente ou inválida. Use um arquivo exportado pelo laboratório.");

  return {
    schemaVersion: 1,
    scenario: copyScenario(value.scenario),
    exportedAt: value.exportedAt,
  };
}
