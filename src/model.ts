export type Use = "research" | "water" | "oxygen" | "propellant";
export interface Scenario {
  name: string;
  concentration: number;
  depth: number;
  recovery: number;
  separation: number;
  target: number;
  area: number;
  thermal: number;
  budget: number;
  use: Use;
  dust: boolean;
  volatiles: boolean;
}
export const assumptions = {
  density: 1500,
  excavation: 0.005,
  separationEnergy: 0.02,
  electrolysis: 5.5,
};
export const uses: Record<
  Use,
  { name: string; short: string; description: string; qualification: string }
> = {
  research: {
    name: "Pesquisa e caracterização",
    short: "Pesquisa",
    description:
      "Investigar composição, distribuição do gelo e materiais coextraídos.",
    qualification:
      "Identificar a composição, preservar amostras e medir o balanço de recuperação.",
  },
  water: {
    name: "Água para suporte à vida",
    short: "Suporte à vida",
    description:
      "Preparar uma rota de processamento para uma futura operação habitada.",
    qualification:
      "Validar identidade, contaminantes, qualidade e armazenamento antes de qualquer uso humano. O modelo não atesta potabilidade.",
  },
  oxygen: {
    name: "Produção de oxigênio",
    short: "Oxigênio",
    description:
      "Estudar a separação da água por eletrólise e o aproveitamento do oxigênio.",
    qualification:
      "Qualificar a água de alimentação e a pureza dos gases conforme o equipamento e o uso. Secagem e armazenamento não estão dimensionados.",
  },
  propellant: {
    name: "Hidrogênio e oxigênio",
    short: "Propelentes",
    description:
      "Estimar o equivalente químico dos gases para estudar uma cadeia de propelentes.",
    qualification:
      "Validar eletrólise, pureza, liquefação, perdas e armazenamento criogênico. O resultado não é propelente pronto para abastecer.",
  },
};
export const defaultScenario: Scenario = {
  name: "Minha investigação",
  concentration: 5,
  depth: 30,
  recovery: 70,
  separation: 90,
  target: 100,
  area: 10,
  thermal: 0.25,
  budget: 800,
  use: "research",
  dust: true,
  volatiles: true,
};
export const presets: Scenario[] = [
  {
    ...defaultScenario,
    name: "Gelo disperso",
    concentration: 2,
    depth: 10,
    recovery: 60,
    separation: 90,
  },
  {
    ...defaultScenario,
    name: "Depósito enterrado",
    concentration: 8,
    depth: 100,
    recovery: 75,
    separation: 90,
  },
  {
    ...defaultScenario,
    name: "Mistura complexa",
    concentration: 5,
    depth: 30,
    recovery: 65,
    separation: 70,
  },
];
export const sources = [
  {
    id: "water",
    agency: "NASA Science",
    title: "Água e gelo na Lua",
    url: "https://science.nasa.gov/moon/moon-water-and-ices/",
    description:
      "Contexto sobre formas, distribuição e evidências de água lunar.",
    kind: "Contexto científico",
  },
  {
    id: "extract",
    agency: "NASA",
    title: "Como extrair água na Lua",
    url: "https://www.nasa.gov/general/how-will-we-extract-water-on-the-moon-we-asked-a-nasa-technologist-episode-47/",
    description:
      "Introdução às necessidades de acesso e recuperação do gelo lunar.",
    kind: "Extração",
  },
  {
    id: "lcross",
    agency: "NASA Science",
    title: "LCROSS e a investigação de Cabeus",
    url: "https://science.nasa.gov/mission/lcross/",
    description:
      "Evidência regional de água e outros materiais. Não é um inventário de toda a cratera.",
    kind: "Missão",
  },
  {
    id: "lcross-material",
    agency: "NASA",
    title: "Materiais identificados pela LCROSS",
    url: "https://www.nasa.gov/general/what-is-lcross-the-lunar-crater-observation-and-sensing-satellite/",
    description:
      "Contexto da observação de água e outras espécies. Motiva caracterização e separação, sem atribuir concentrações ao simulador.",
    kind: "Composição",
  },
  {
    id: "chain",
    agency: "NASA NTRS",
    title: "Do gelo aos gases: cadeia de processamento",
    url: "https://ntrs.nasa.gov/citations/20230010039",
    description:
      "Estudo de extração, captura, purificação e eletrólise em uma cadeia integrada de pesquisa.",
    kind: "Processamento",
  },
  {
    id: "aqua",
    agency: "NASA NIAC",
    title: "Aqua Factorem",
    url: "https://www.nasa.gov/general/aqua-factorem-ultra-low-energy-lunar-water-extraction/",
    description:
      "Conceito de separação de gelo e regolito. Referência para comparar rotas, não tecnologia validada neste MVP.",
    kind: "Conceito tecnológico",
  },
  {
    id: "trek",
    agency: "NASA / JPL",
    title: "Moon Trek",
    url: "https://trek.nasa.gov/moon/",
    description:
      "Ponto de partida para cruzar camadas e selecionar uma área real de investigação.",
    kind: "Dados abertos",
  },
  {
    id: "diviner",
    agency: "NASA PDS",
    title: "Diviner: condições térmicas",
    url: "https://pds-geosciences.wustl.edu/missions/lro/diviner.htm",
    description:
      "Acervo térmico. Para produtos de recursos polares, o briefing pede PRP V2.0.",
    kind: "Dados abertos",
  },
  {
    id: "lola",
    agency: "NASA PDS",
    title: "LOLA: relevo e topografia",
    url: "https://pds-geosciences.wustl.edu/missions/lro/lola.htm",
    description: "Altimetria para uma futura avaliação de acesso e terreno.",
    kind: "Dados abertos",
  },
  {
    id: "ode",
    agency: "NASA PDS / Washington University",
    title: "Lunar Orbital Data Explorer",
    url: "https://ode.rsl.wustl.edu/moon/",
    description:
      "Busca de produtos e metadados lunares. Os parâmetros deste laboratório não foram extraídos desses arquivos.",
    kind: "Dados abertos",
  },
];
const bounds: Record<string, [number, number]> = {
  concentration: [0.5, 20],
  depth: [0, 200],
  recovery: [10, 100],
  separation: [10, 100],
  target: [10, 500],
  area: [1, 50],
  thermal: [0.05, 1],
  budget: [100, 10000],
};
export function isScenario(value: unknown): value is Scenario {
  if (!value || typeof value !== "object") return false;
  const x = value as Record<string, unknown>;
  return (
    typeof x.name === "string" &&
    x.name.length <= 80 &&
    typeof x.use === "string" &&
    Object.hasOwn(uses, x.use) &&
    typeof x.dust === "boolean" &&
    typeof x.volatiles === "boolean" &&
    Object.entries(bounds).every(
      ([key, [min, max]]) =>
        typeof x[key] === "number" &&
        Number.isFinite(x[key]) &&
        (x[key] as number) >= min &&
        (x[key] as number) <= max,
    )
  );
}
export function calculate(s: Scenario) {
  if (!isScenario(s))
    throw new Error("Cenário fora dos limites do laboratório.");
  const iceFraction = s.concentration / 100,
    capture = s.recovery / 100,
    separation = s.separation / 100;
  const feed = s.target / (iceFraction * capture * separation);
  const contained = feed * iceFraction;
  const recovered = contained * capture;
  const uncaptured = contained - recovered;
  const separationLoss = recovered - s.target;
  const overburden = s.area * (s.depth / 100) * assumptions.density;
  const moved = feed + overburden;
  const heat = feed * s.thermal,
    dig = moved * assumptions.excavation,
    clean = recovered * assumptions.separationEnergy;
  const split = s.use === "oxygen" || s.use === "propellant";
  const electrolysis = split ? s.target * assumptions.electrolysis : 0;
  const energy = heat + dig + clean + electrolysis;
  return {
    feed,
    contained,
    recovered,
    uncaptured,
    separationLoss,
    overburden,
    moved,
    heat,
    dig,
    clean,
    electrolysis,
    energy,
    perKg: energy / s.target,
    oxygen: split ? (s.target * 8) / 9 : 0,
    hydrogen: split ? s.target / 9 : 0,
    waterRemaining: split ? 0 : s.target,
    residue: feed - contained,
    withinBudget: energy <= s.budget,
    margin: s.budget - energy,
  };
}
export function sensitivity(s: Scenario) {
  return [0.5, 1, 2, 3, 5, 8, 10, 15, 20].map((concentration) => ({
    concentration,
    ...calculate({ ...s, concentration }),
  }));
}
export function questions(s: Scenario): string[] {
  const q = [
    "Qual é a concentração de gelo medida na área e como ela varia com a profundidade?",
    `Há uma camada sem gelo de ${s.depth} cm? A geometria adotada precisa ser verificada.`,
    uses[s.use].qualification,
  ];
  if (s.dust)
    q.push(
      "Como caracterizar e conter a poeira fina durante coleta, transporte e captura?",
    );
  if (s.volatiles)
    q.push(
      "Quais espécies são coextraídas e qual sequência de separação é compatível com elas?",
    );
  return q;
}
export function report(s: Scenario): string {
  const r = calculate(s),
    n = (x: number) => x.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
  return `# AQUA Lunar: ${s.name}\n\nCenário exploratório v0.1.0. Todos os parâmetros numéricos são hipóteses ajustáveis, sem medição local ou certificação.\n\n## Objetivo\n${uses[s.use].name}\n\n## Entradas\n- Meta de água após separação: ${n(s.target)} kg\n- Gelo no material alimentado: ${n(s.concentration)}% em massa\n- Camada superior sem gelo: ${n(s.depth)} cm\n- Área de escavação: ${n(s.area)} m²\n- Recuperação na captura: ${n(s.recovery)}%\n- Recuperação de água na separação: ${n(s.separation)}% (não é pureza)\n- Energia térmica específica assumida: ${n(s.thermal)} kWh/kg de alimentação\n- Orçamento energético parcial: ${n(s.budget)} kWh\n- Investigar poeira: ${s.dust ? "sim" : "não selecionado"}\n- Investigar voláteis coextraídos: ${s.volatiles ? "sim" : "não selecionado"}\n\n## Balanço calculado\n- Material com gelo a processar: ${n(r.feed)} kg\n- Material superior a remover: ${n(r.overburden)} kg\n- Massa total movimentada: ${n(r.moved)} kg\n- Água contida na alimentação: ${n(r.contained)} kg\n- Água capturada: ${n(r.recovered)} kg\n- Água não capturada: ${n(r.uncaptured)} kg\n- Perda de água na separação: ${n(r.separationLoss)} kg\n- Água após separação, antes de eventual eletrólise: ${n(s.target)} kg\n- Energia parcial: ${n(r.energy)} kWh\n- Aquecimento: ${n(r.heat)} kWh\n- Movimentação: ${n(r.dig)} kWh\n- Separação: ${n(r.clean)} kWh\n- Eletrólise: ${n(r.electrolysis)} kWh\n- Energia por kg de água separada: ${n(r.perKg)} kWh/kg\n- Orçamento: ${r.withinBudget ? "atendido apenas no modelo parcial" : "excedido no modelo parcial"}\n${r.electrolysis ? `- Equivalente ideal de O₂: ${n(r.oxygen)} kg\n- Equivalente ideal de H₂: ${n(r.hydrogen)} kg\n- Água remanescente após conversão ideal total: 0 kg\n` : ""}\n## Coeficientes ilustrativos fixos\n- Densidade: ${assumptions.density} kg/m³\n- Movimentação: ${assumptions.excavation} kWh/kg\n- Separação: ${assumptions.separationEnergy} kWh/kg capturado\n- Eletrólise, quando selecionada: ${assumptions.electrolysis} kWh/kg de água alimentada\n\n## Próximas perguntas\n${questions(
    s,
  )
    .map((q) => "- " + q)
    .join(
      "\n",
    )}\n\n## Limites\nNão inclui transporte espacial, energia de sobrevivência, comunicações, balanço térmico completo, reagentes, tratamento por contaminante, compressão, liquefação ou armazenamento. Profundidade representa uma cobertura uniforme sem gelo; não calcula reservas. A massa após separação não atesta qualidade. Gases são equivalentes estequiométricos aproximados (8/9 e 1/9), não rendimento real. Não selecionar um contaminante não prova sua ausência.\n\n## Fontes\n${sources.map((x) => `- [${x.title}](${x.url}): ${x.description}`).join("\n")}\n`;
}
