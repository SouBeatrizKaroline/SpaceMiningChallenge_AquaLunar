# AQUA Lunar

**A mesma molécula. Outra missão.**

Um laboratório interativo para entender como o material encontrado muda uma missão de extração de água lunar. Concentração de gelo, cobertura, recuperação e finalidade aparecem em um mesmo cenário, com balanço de massa, energia parcial e perguntas para a próxima investigação.

[Abrir laboratório](https://soubeatrizkaroline.github.io/aqua-lunar/) · [Método](./docs/metodologia.md) · [Fontes](./docs/fontes.md) · [Contribuir](./CONTRIBUTING.md)

**MVP funcional v0.1.0.** [Validação e limites](./docs/validacao.md) · [Aplicação ao desafio](./docs/desafio.md)

![Qualidade](https://github.com/SouBeatrizKaroline/aqua-lunar/actions/workflows/ci.yml/badge.svg)

![Interface do AQUA Lunar com corte conceitual e controles de material](./docs/preview.png)

## A pergunta que orienta o projeto

Dois locais podem conter gelo e exigir operações completamente diferentes. Quanto material precisa ser processado? O que deve ser removido antes? Quanto da água é recuperado? Quais espécies vêm junto? O que muda quando o destino é pesquisa, suporte à vida ou produção de gases?

O AQUA Lunar permite explorar essas relações sem apresentar um cenário hipotético como uma jazida medida.

## O que funciona

| Experiência | O que permite fazer |
| --- | --- |
| Corte conceitual interativo | Visualizar mudanças na cobertura, presença de gelo e captura. |
| Três perfis de material | Explorar gelo disperso, depósito enterrado e mistura complexa. |
| Premissas ajustáveis | Alterar concentração, cobertura, recuperação, meta, área e energia. |
| Finalidades diferentes | Investigar pesquisa, água para suporte à vida, oxigênio ou hidrogênio e oxigênio. |
| Balanço de massa | Acompanhar água contida, não capturada, perdida na separação e recuperada. |
| Energia parcial | Comparar com um orçamento e abrir o consumo estimado de cada etapa. |
| Sensibilidade | Mudar a concentração e observar a alimentação necessária para a mesma meta. |
| Etapas de processo | Investigar caracterização, acesso, captura, separação e destinação. |
| Comparação | Comparar o cenário atual, três perfis e um cenário salvo. |
| Persistência local | Salvar e recuperar um cenário no mesmo navegador. |
| Exportação | Baixar um relatório Markdown com entradas, cálculos, limites e fontes. |
| Evidências | Buscar e consultar dez fontes primárias. |

**Todos os parâmetros numéricos de entrada são hipóteses.** Não foram extraídos de rasters lunares nem calibrados com equipamentos. A interface é um laboratório de cenários, sem certificação de potabilidade, previsão operacional ou reserva mineral estimada.

## Experimente em três minutos

1. Mantenha a meta em **100 kg** e selecione **gelo disperso**.
2. Observe a massa com gelo que precisa entrar no processo.
3. Selecione **depósito enterrado** e compare a alimentação com a cobertura a remover.
4. Reduza a recuperação na separação e observe o balanço de água.
5. Troque a finalidade para produção de gases. A energia de eletrólise entra no modelo e a água é convertida em equivalentes ideais de H₂ e O₂.
6. Abra a comparação e exporte o raciocínio.

## Executar localmente

Requisitos: Node.js 22.12 ou superior e npm.

```bash
git clone https://github.com/SouBeatrizKaroline/aqua-lunar.git
cd aqua-lunar
npm ci
npm run dev
```

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Desenvolvimento local. |
| `npm run check` | Verificação TypeScript e testes do modelo. |
| `npm test` | Testes do balanço e das regras. |
| `npm run build` | Distribuição estática em `dist/`. |
| `npm run preview` | Prévia local da distribuição. |

Não exige cadastro, backend ou chave de API. As fontes tipográficas são servidas com a aplicação. O cenário salvo usa o armazenamento local do navegador; limpar os dados do site também remove esse cenário.

## Como interpretar os números

Para uma meta de água **antes de eventual eletrólise**:

```text
material com gelo = meta / (fração de gelo × recuperação na captura × recuperação na separação)
cobertura a remover = área × espessura sem gelo × densidade assumida
```

Um exemplo com 100 kg, 5% de gelo, captura de 70% e recuperação na separação de 90% resulta em aproximadamente **3.175 kg de material alimentado**. Isso é uma consequência das premissas, não uma medição lunar.

A recuperação na separação mede a fração de água que atravessa a etapa. **Não mede pureza nem remoção de contaminantes.** As opções de poeira e voláteis geram perguntas de caracterização, sem atribuir um tratamento ou consumo energético que ainda não conhecemos.

Nos objetivos com eletrólise, o modelo converte toda a meta em equivalentes químicos aproximados: 8/9 de oxigênio e 1/9 de hidrogênio em massa. Não soma esses gases à água como produtos simultâneos. A conversão real, a pureza e o armazenamento precisam de avaliação adicional.

Consulte [equações, coeficientes e limites](./docs/metodologia.md).

## Fontes utilizadas

As referências abaixo orientam o contexto e as perguntas. **Nenhuma delas fornece automaticamente os coeficientes ilustrativos do simulador.**

| Fonte | Papel no projeto |
| --- | --- |
| [NASA Science: Moon Water and Ices](https://science.nasa.gov/moon/moon-water-and-ices/) | Contexto sobre formas e evidências de água lunar. |
| [NASA: How Will We Extract Water on the Moon?](https://www.nasa.gov/general/how-will-we-extract-water-on-the-moon-we-asked-a-nasa-technologist-episode-47/) | Introdução à extração e recuperação de água. |
| [NASA Science: LCROSS](https://science.nasa.gov/mission/lcross/) | Evidência regional em Cabeus, sem extrapolação para uma jazida inteira. |
| [NASA: What is LCROSS?](https://www.nasa.gov/general/what-is-lcross-the-lunar-crater-observation-and-sensing-satellite/) | Contexto dos materiais identificados pela missão e da necessidade de caracterização. |
| [NASA NTRS: Technology Assessment for Producing Propellant From Lunar Water](https://ntrs.nasa.gov/citations/20230010039) | Referência de cadeia com extração, captura, purificação e eletrólise. |
| [NASA NIAC: Aqua Factorem](https://www.nasa.gov/general/aqua-factorem-ultra-low-energy-lunar-water-extraction/) | Conceito de separação de gelo e regolito para discussão de rotas alternativas. |
| [NASA/JPL: Moon Trek](https://trek.nasa.gov/moon/) | Ponto de partida para uma futura seleção de área com camadas verificáveis. |
| [NASA PDS: Diviner](https://pds-geosciences.wustl.edu/missions/lro/diviner.htm) | Dados térmicos e produtos derivados. O briefing do desafio pede PRP V2.0. |
| [NASA PDS: LOLA](https://pds-geosciences.wustl.edu/missions/lro/lola.htm) | Altimetria e topografia para investigar acesso. |
| [Lunar Orbital Data Explorer](https://ode.rsl.wustl.edu/moon/) | Busca e acesso a produtos e metadados. |

O corte do material é uma ilustração vetorial construída para esta interface, sem escala ou localização real. Não é imagem orbital, mapa de gelo ou desenho de equipamento validado.

## Estrutura

```text
src/
  App.tsx          Interface, diagrama e navegação
  model.ts         Catálogo, balanços, perguntas e relatório
  styles.css       Identidade visual e responsividade
tests/
  model.test.ts    Conservação de massa, limites e comportamento
docs/
  metodologia.md  Equações e fronteiras do modelo
  fontes.md       Proveniência e interpretação
  arquitetura.md  Estrutura e evolução
  desafio.md      Uso no Space Mining Challenge
  validacao.md    Testes realizados e limites da verificação
```

## Qualidade e privacidade

O modelo possui **17 testes automatizados**. Os fluxos principais foram exercitados em Chromium, incluindo exportação, recuperação do cenário salvo, comparação e navegação em telas de 390 e 320 pixels. Consulte o [registro de validação](./docs/validacao.md).

O botão de salvar mantém um único cenário local e substitui o anterior. Alterações posteriores só são persistidas ao salvar novamente. Restaurar as premissas iniciais mantém o cenário salvo disponível na comparação.

Não há cadastro, telemetria ou envio de cenários a um servidor. A exportação é produzida no próprio navegador. Links externos abrem as instituições responsáveis pelas referências.

## Publicar uma cópia

1. Faça um fork e ative o GitHub Actions.
2. Em **Settings → Pages**, selecione **GitHub Actions** como origem.
3. Execute o workflow **Publicar demonstração** ou envie uma alteração para `main`.
4. Atualize os links deste README e de `src/App.tsx` para sua conta.

O workflow valida e compila antes da publicação. Uma falha nos testes impede a atualização do site.

## Dúvidas frequentes

**Os valores vêm diretamente da NASA?** As fontes orientam o contexto científico. Os números ajustáveis são hipóteses didáticas, sem integração automática com os acervos.

**O resultado permite escolher onde minerar?** Ele ajuda a comparar premissas de processamento. Escolher uma região exige evidências espaciais, condições operacionais e caracterização do material.

**90% de recuperação significa água 90% pura?** Não. Significa que 90% da massa de água que entra nessa etapa é recuperada. O modelo não calcula pureza.

**Por que há hidrogênio quando escolho produzir oxigênio?** A eletrólise produz ambos. O modelo apresenta os dois equivalentes químicos para manter o balanço de massa.

## Próximas etapas

- Selecionar uma área real e registrar pelo menos três evidências espaciais.
- Substituir premissas por medições, com unidade, resolução, versão e incerteza.
- Incorporar propriedades térmicas e requisitos de equipamentos.
- Estimar tratamentos somente após caracterizar os materiais coextraídos.
- Incluir compressão, armazenamento e demais subsistemas no balanço energético.
- Confrontar o modelo com ensaios e revisão técnica independente.

## Publicação e licença

GitHub Actions verifica a aplicação e publica a demonstração no GitHub Pages. O código usa a [licença MIT](./LICENSE). DM Sans e Space Grotesk mantêm suas [licenças SIL OFL](./public/font-licenses.txt).

Projeto independente, sem endosso das instituições citadas. O AQUA Lunar é um repositório separado da [SENTINELA Lunar](https://github.com/SouBeatrizKaroline/sentinela-lunar), com foco no material, no processamento e no uso da água.
