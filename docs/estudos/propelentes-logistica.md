# Propelentes, oxigênio e logística

[Voltar aos estudos](README.md) · [Orçamento preliminar](../missao/orcamento-referencia-aurora-sul.md)

## Por que a equipe escolheu essa finalidade?

A prioridade é estudar água lunar como insumo para **hidrogênio e oxigênio**. O benefício pretendido é abastecer missões com menor dependência de material enviado da Terra. Trata-se de hipótese de valor: depende de demanda, custo de implantação, produção, perdas e transporte até o cliente.

Reciclagem e mineração têm funções diferentes. A NASA demonstrou recuperação de 98% de água no sistema da ISS, nas condições descritas em 2023. Reciclar reduz reposição em um circuito de uso; não cria um estoque ilimitado para propulsão. Na queima propulsiva, a massa é expelida e não retorna ao circuito de água. Portanto, esse resultado não estabelece que propelentes sejam mais viáveis economicamente que outros usos. [NASA: recuperação na ISS](https://www.nasa.gov/missions/station/iss-research/nasa-achieves-water-recovery-milestone-on-international-space-station/).

## Como H₂ e O₂ movimentam uma nave?

A eletrólise consome energia para realizar **2 H₂O → 2 H₂ + O₂**. Em um motor compatível, hidrogênio e oxigênio reagem, gerando gases quentes que saem pelo bocal e produzem empuxo. O oxigênio é levado a bordo porque não há ar disponível no espaço para sustentar a reação.

**LH₂** significa hidrogênio líquido; **LOX/LO₂**, oxigênio líquido. A combinação é usada nos motores RS-25. Isso prova o uso da combinação química, não a maturidade de uma cadeia lunar de produção. [NASA: motor RS-25](https://www.nasa.gov/reference/space-launch-system-rs-25-core-stage-engine/).

Na aproximação didática usada no aplicativo, 9 kg de água integralmente convertidos correspondem a 1 kg de H₂ e 8 kg de O₂ antes de perdas. Não são 9 kg de água disponíveis **mais** os gases. A proporção produzida pela eletrólise também não determina automaticamente a proporção utilizada por um motor específico.

## Da água ao abastecimento

**Purificar água → eletrolisar → separar e qualificar gases → comprimir ou liquefazer conforme o destino → armazenar separadamente → transferir ao veículo compatível.**

Eletrólise não faz liquefação. Produzir LH₂/LOX exige equipamentos criogênicos, isolamento, controle de perdas por evaporação, gestão térmica, instrumentação e interfaces de abastecimento. Um ambiente lunar frio não resolve sozinho esses requisitos. Gases também podem atender sistemas de propulsão adequados sem liquefação; a arquitetura precisa começar pelo consumidor. [NASA: tecnologias de propulsão de pequenos satélites](https://www.nasa.gov/smallsat-institute/sst-soa/in-space_propulsion/).

## Por que essa combinação em vez de outras?

| Alternativa | Relação com água lunar | Questão para a comparação |
| --- | --- | --- |
| H₂/O₂ | Ambos podem vir da água | Energia, armazenamento de H₂, perdas e motor compatível |
| Oxigênio como produto prioritário | Também pode ser obtido da água, com H₂ coproduzido | Destino do H₂ e pureza para o uso de O₂ |
| Metano/O₂ | Água pode fornecer H e O, mas metano exige carbono e síntese adicional | Origem do carbono e complexidade da cadeia |
| Água usada diretamente como propelente | Pode evitar eletrólise em arquiteturas compatíveis | Desempenho e missão atendida |
| Propelentes trazidos da Terra | Evitam mineração inicial | Massa e custo logístico versus implantar uma planta lunar |

Essa tabela organiza alternativas de engenharia; não apresenta um vencedor quantitativo. H₂/O₂ é a escolha de estudo da equipe por sua relação direta com a água. A missão deve comparar massa entregue, energia por kg de produto utilizável, disponibilidade e custo total antes de alegar superioridade.

## E peróxido de hidrogênio?

**H₂O₂ é outra substância**, diferente de água (H₂O), hidrogênio (H₂) e oxigênio (O₂). É utilizado em certas tecnologias de propulsão, mas não é o par LH₂/LOX e não é o produto automático da eletrólise convencional da água. Produzi-lo abriria outra cadeia química, fora da proposta atual. [NASA: opções de propulsão](https://www.nasa.gov/smallsat-institute/sst-soa/in-space_propulsion/).

## Refinar na Lua ou levar para outro lugar?

| Arquitetura | Vantagem a investigar | Desvantagem a contabilizar |
| --- | --- | --- |
| Transportar regolito até unidade próxima com energia | Centraliza equipamentos | Move grande massa sem água e pode perder voláteis no caminho |
| Capturar água junto à extração e levar água/gelo à unidade | Reduz sólidos transportados | Exige captura e controle térmico no local frio |
| Produzir H₂/O₂ na superfície | Aproxima produto de consumidores lunares | Leva eletrólise e armazenamento de gases para a superfície |
| Levar água purificada à órbita e processar lá | Pode atender um depósito orbital | Exige veículo de subida, energia, transferência e planta orbital |

**Hipótese de referência:** capturar e purificar água na superfície, comparando o transporte curto de regolito com captura junto à extração. Estudar eletrólise próxima à infraestrutura energética. Transporte orbital é expansão a avaliar; não é uma etapa já dimensionada. O destino imediato do produto e o cliente ainda não estão definidos.

## A ideia magnetohidrodinâmica serve para a superfície?

A proposta NIAC de 2024 aborda eletrólise e separação de gases em **microgravidade**, com motivação em viagens a Marte. É um conceito em estudo, não uma mineradora nem um motor pronto. Na superfície lunar há gravidade reduzida, aproximadamente um sexto da terrestre; isso difere da condição orbital de queda livre. O conceito não fica automaticamente inviável, mas precisa de avaliação específica antes de ser adotado na superfície. Ele não é requisito da rota de referência. [NASA: Magnetohydrodynamic Drive](https://www.nasa.gov/general/magnetohydrodynamic-drive-for-hydrogen-and-oxygen-production/).

## Como isso pode ajudar a ir mais longe?

Uma infraestrutura confiável de abastecimento poderia alterar a massa que parte da Terra, apoiar reabastecimento e ampliar opções de missão. O ganho depende de trajetória, veículo, local de entrega e infraestrutura. O AQUA Lunar não calcula alcance, economia ou retorno financeiro. Demonstrar isso exige comparar missões completas com e sem produção lunar, incluindo lançamento, pouso, operação, reposição e perdas.
