# AQUA Lunar

**A mesma molécula. Outra missão.**

**Missão Aurora Sul: investigar e extrair gelo de água na região de Shackleton, no polo sul da Lua, para produzir hidrogênio e oxigênio destinados a uma futura cadeia de propelentes.**

[Abrir laboratório](https://soubeatrizkaroline.github.io/SpaceMiningChallenge_AquaLunar/) · [Apresentação da equipe](https://canva.link/doiqov0r8o01ntk) · [Documentação completa](docs/README.md) · [Referências](docs/referencias/referencias-tecnicas.md)

> **Estágio do projeto:** proposta conceitual com laboratório de simulação. Shackleton é a área de estudo; a jazida, o ponto de operação e a viabilidade econômica ainda precisam ser confirmados. Os números do laboratório são hipóteses, não medições da NASA.

## 1. O que minerar, onde e por quê?

Escolhemos estudar **água congelada misturada ao regolito**, o material que cobre a superfície lunar. A água pode fornecer hidrogênio e oxigênio por eletrólise, processo que usa eletricidade para separar suas moléculas.

A região de **Shackleton** combina áreas permanentemente sombreadas, de interesse para procurar gelo, e trechos da borda com alta iluminação, candidatos à geração solar. Isso orienta a pesquisa, mas não garante gelo acessível nem energia contínua no local escolhido. [Contexto NASA](https://science.nasa.gov/resource/shackleton-craters-illuminated-rim-shadowed-interior/).

A hipótese de valor é reduzir o envio de insumos da Terra e apoiar futuras missões. A equipe prioriza a cadeia de propelentes; uso potável e suporte à vida exigiriam qualificação própria e ficam como possibilidades posteriores. Reciclagem de água já existe no contexto espacial, mas **não prova que produzir propelentes na Lua será mais barato**. [Uso, alternativas e logística](docs/estudos/propelentes-logistica.md).

## 2. Quais evidências sustentam a investigação?

| Evidência | O que ajuda a decidir | O que ainda não demonstra |
| --- | --- | --- |
| **Diviner, produtos polares V2.0:** condições térmicas e estimativas de estabilidade de gelo | Onde investigar preservação de voláteis | Quantidade de gelo recuperável; falta leitura do produto na área operacional |
| **LEND:** fluxo de nêutrons relacionado a hidrogênio | Onde priorizar prospecção junto a outras evidências | Água extraível em um ponto; a assinatura na vizinhança de Shackleton exige cautela |
| **LOLA:** elevação e declividade | Onde investigar pouso, rotas e implantação | Rota segura ou disponibilidade solar durante toda a missão |

Os [três registros da missão](docs/missao/missao-aurora-sul.md), o [dossiê de Shackleton](docs/pesquisa/dados-reais-shackleton.md) e a [comparação de regiões](docs/pesquisa/comparacao-regioes-polares.md) explicam as fontes e seus limites. O [Moon Trek](https://trek.nasa.gov/moon/) é o ponto de partida para relacionar as evidências à mesma área.

## 3. Como seria a extração?

**Confirmar gelo → coletar regolito → aquecer em sistema fechado → capturar vapor → separar contaminantes → armazenar água qualificada → produzir H₂ e O₂.**

O aquecimento pode fazer o gelo passar diretamente a vapor, por **sublimação**. É necessário capturar esse vapor para evitar perdas. A proposta estuda processamento próximo à extração e uma unidade com acesso à energia; rota, distância e transporte ainda dependem do terreno. [Extração e tratamento](docs/estudos/extracao-tratamento.md).

<img src="https://www.nasa.gov/wp-content/uploads/2020/07/prime-1_web_photo_2.jpg?w=921" alt="Engenheiro da Honeybee Robotics preparando a broca TRIDENT para ensaio em câmara de vácuo térmico na Terra" width="430">

*TRIDENT em preparação para ensaio terrestre. Imagem publicada pela NASA na [página PRIME-1](https://www.nasa.gov/mission/polar-resources-ice-mining-experiment-1-prime-1/). A broca é uma referência tecnológica; não é equipamento desenvolvido pelo AQUA Lunar.*

A TRIDENT combina rotação e percussão. A PRIME-1 demonstrou movimentos da broca e operação do espectrômetro MSolo, com limitações após o pouso da IM-2. **Isso não equivale a uma mineração de gelo concluída.** [Resultados da missão e leitura do artigo de abril de 2026](docs/estudos/prime-1-trident.md).

## 4. Para que serviria o produto?

O **hidrogênio é combustível** e o **oxigênio é oxidante**, que permite a reação mesmo sem ar. Motores como o RS-25 utilizam os dois em estado líquido. Produzi-los a partir de água lunar exigiria purificação, eletrólise, condicionamento, armazenamento e transferência compatíveis com o veículo. [Referência NASA: RS-25](https://www.nasa.gov/reference/space-launch-system-rs-25-core-stage-engine/).

O laboratório calcula equivalentes químicos; **não entrega propelente pronto**. Oxigênio para respiração teria outra especificação. Água recuperada não é automaticamente potável. [Cadeia de utilização](docs/estudos/propelentes-logistica.md).

## 5. Como operar e justificar a decisão?

A arquitetura precisa considerar energia solar e períodos de sombra, baterias, controle térmico, poeira abrasiva, prospecção, processamento, comunicações e reposição de peças para **24 meses sem reabastecimento**, conforme o briefing registrado no projeto.

O [orçamento de referência](docs/missao/orcamento-referencia-aurora-sul.md) é preliminar e ainda não fecha a cadeia completa de propelentes. [Energia e monitoramento dos painéis](docs/estudos/energia-paineis.md).

IA apoiou a organização das perguntas, pesquisa e redação. Fontes consultadas, hipóteses e correções estão no [registro de decisões](docs/estudos/decisoes-e-validacao.md). A equipe precisa conferir as evidências antes da submissão.

**Antes da entrega:** delimitar a área e a rota; completar três evidências espaciais; fechar massa, energia e uso do produto; revisar a apresentação em até **14 slides** e o pitch de **5 minutos**, segundo o briefing preservado em [Aplicação ao desafio](docs/missao/desafio.md). [Pendências detalhadas](docs/missao/status-desafio.md).

## Para saber mais

| Quero entender… | Onde ler |
| --- | --- |
| Broca, gelo, poeira, energia e propelentes | [Estudos técnicos](docs/estudos/README.md) |
| Como usar e executar o aplicativo | [Guia do laboratório](docs/desenvolvimento/guia-laboratorio.md) |
| Cálculos, código e verificações | [Método](docs/desenvolvimento/metodologia.md) · [Arquitetura](docs/desenvolvimento/arquitetura.md) · [Validação](docs/desenvolvimento/validacao.md) |
| Fontes, imagens e apresentação | [Referências comentadas](docs/referencias/referencias-tecnicas.md) · [Créditos das imagens](docs/imagens/README.md) · [Links da equipe](docs/referencias/links-compartilhados.md) |

Projeto independente, sem endosso da NASA. Código sob [licença MIT](LICENSE); imagens e fontes de terceiros mantêm seus créditos e condições de uso.
