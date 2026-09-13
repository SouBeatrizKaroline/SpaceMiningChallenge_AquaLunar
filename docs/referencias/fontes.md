# Fontes e rastreabilidade

As referências de contexto estão em [src/model.ts](../../src/model.ts). As referências anteriores estão preservadas abaixo; as novas fontes estão nas [referências comentadas dos estudos](referencias-tecnicas.md). A consulta externa tem seu próprio [registro de integração](../desenvolvimento/integracoes.md).

## Separar cinco categorias

| Categoria | Exemplo | Como aparece |
| --- | --- | --- |
| Evidência publicada | Observações da LCROSS | Contexto e link para missão. |
| Registro de catálogo | Metadados de um produto encontrado no ODE | Identificação, origem e acesso ao produto. |
| Pergunta técnica | Que espécies vêm junto com a água? | Etapas e próximas investigações. |
| Premissa ilustrativa | Gelo a 5% ou captura a 70% | Controles e perfis hipotéticos. |
| Cálculo | Alimentação para uma meta | Resultado das equações documentadas. |

Os dados da LCROSS sustentam investigação sobre água e outros materiais na região estudada. Não fornecem os números dos perfis do aplicativo. O contexto publicado de uma missão não deve ser extrapolado para um depósito inteiro ou para outra região.

Os acervos Diviner e LOLA e o portal Moon Trek apoiam a investigação espacial. A integração ODE consulta registros de produtos, com links para que o usuário examine a fonte. Não lê rasters, não extrai temperatura ou elevação de um pixel e não identifica concentração de gelo.

Aqua Factorem é uma referência de conceito tecnológico. Sua presença na biblioteca não significa que o processo esteja implementado ou validado pelo AQUA Lunar.

## O que a consulta ao ODE acrescenta

O [Lunar Orbital Data Explorer](https://ode.rsl.wustl.edu/moon/) permite localizar produtos de missões lunares. A aplicação consulta o [serviço REST público](https://oderest.rsl.wustl.edu/live2/) e apresenta os metadados devolvidos, preservando o vínculo com o produto. O [manual ODE REST 2.1.6](https://oderest.rsl.wustl.edu/ODE_REST_V2.1.6.pdf) documenta os parâmetros e formatos do serviço.

Um registro encontrado significa que existe um produto catalogado que atende aos critérios da busca. Ele não confirma gelo, potabilidade, viabilidade de extração ou uma reserva mineral na área. A abrangência espacial de um produto também pode ser maior que a área investigada.

O caderno mantém a procedência da consulta junto dos produtos selecionados e das notas. A data da consulta informa quando o catálogo foi consultado; não deve ser confundida com a data de observação do instrumento, a atualização do produto ou uma previsão das condições lunares.

As notas são interpretação do usuário. Anexar uma nota a um produto não transforma a hipótese anotada em uma medição publicada.

## Perguntas para pesquisa

- A observação corresponde a uma área, a uma amostra ou a um modelo?
- O produto contém a variável desejada ou somente ajuda a localizar outra fonte?
- Qual é o instrumento, o identificador do produto e a versão utilizada?
- A água está identificada como gelo, moléculas superficiais ou outra forma de associação?
- Qual a concentração e sua incerteza na escala da operação proposta?
- A camada de cobertura realmente não contém água?
- Que outras espécies podem ser liberadas no processo?
- Quais medições permitiriam validar recuperação e demanda energética?

As ilustrações, os perfis e a lista de produtos não substituem respostas documentadas a essas perguntas. Em especial, um catálogo de topografia ou temperatura não fornece, por si só, uma medida de água recuperável.

## Licenças e atribuição

O código do AQUA Lunar tem licença MIT. Isso não altera a licença nem as condições de uso de dados, imagens e documentação de terceiros. API pública, acesso aberto a dados e código aberto são características distintas. O projeto não atribui uma licença de código aberto ao serviço ODE.

Antes de redistribuir um produto, consulte os metadados, os créditos e as condições do acervo responsável. Os links desta aplicação não representam parceria ou endosso das instituições citadas.

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
| [LROC QuickMap](https://quickmap.lroc.im-ldi.com/) | Análise de terreno e camadas regionais depois que a equipe delimita a área. |
| [NASA PDS: Diviner](https://pds-geosciences.wustl.edu/missions/lro/diviner.htm) | Dados térmicos e produtos derivados. O briefing do desafio pede PRP V2.0. |
| [NASA PDS: LOLA](https://pds-geosciences.wustl.edu/missions/lro/lola.htm) | Altimetria e topografia para investigar acesso. |
| [NASA PDS: LEND](https://pds-geosciences.wustl.edu/missions/lro/lend.htm) | Contexto para leitura de produtos de nêutrons e investigação de hidrogênio. |
| [Lunar Orbital Data Explorer](https://ode.rsl.wustl.edu/moon/) | Busca e acesso a produtos e metadados. |
| [ODE REST Interface Manual](https://oderest.rsl.wustl.edu/ODE_REST_V2.1.6.pdf) | Referência da consulta pública de metadados usada pelos módulos de integração. |
| [Diviner PRP, rótulo do polo sul](https://pds-geosciences.wustl.edu/lro/urn-nasa-pds-lro_diviner_derived1/data_derived_prp/dlre_prp_south.xml) | Verificação de campos de versão e do significado dos produtos polares derivados. |

O corte do material é uma ilustração vetorial construída para esta interface, sem escala ou localização real. Não é imagem orbital, mapa de gelo ou desenho de equipamento validado.
