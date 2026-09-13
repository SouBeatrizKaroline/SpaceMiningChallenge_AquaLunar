# Guia do laboratório AQUA Lunar

[Voltar ao índice](../README.md) · [Método](metodologia.md) · [Arquitetura](arquitetura.md)

O aplicativo compara hipóteses de processamento; não representa uma planta lunar construída. Este guia preserva as instruções operacionais do README anterior.

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
| Evidências | Consultar fontes primárias e caminhos de pesquisa para dados lunares. |
| Consulta ao ODE | Módulos para consultar metadados públicos do acervo lunar da NASA PDS e preservar a procedência da consulta. |
| Cenários portáteis | Funções validadas para exportar e importar premissas em JSON versionado. |
| Payload e autonomia | Registrar a carga enviada à Lua e checar se a proposta respeita massa limitada e 24 meses sem reabastecimento. |

**Todos os parâmetros numéricos de entrada são hipóteses.** Não foram extraídos automaticamente de rasters lunares nem calibrados com equipamentos. A interface é um laboratório de cenários, sem certificação de potabilidade, previsão operacional ou reserva mineral estimada.

## Como utilizar para construir a missão

1. Abra **Laboratório** e escolha a finalidade. Ajuste somente premissas que a equipe consegue explicar. Salve e exporte o cenário quando quiser comparar uma versão.
2. Abra **Recursos** antes de assumir que água é a melhor escolha. Compare água, ilmenita, piroclásticos, PKT e hélio-3 com critérios que a equipe possa sustentar. Leia o guia de [comparação de recursos](../pesquisa/recursos.md).
3. Em **Dados lunares**, consulte uma camada no catálogo ODE. Abra o produto original, leia o rótulo e guarde apenas os registros que ajudam a responder uma pergunta da missão. O catálogo lista metadados, não mede gelo automaticamente.
4. Em **Missão**, selecione água como recurso, dê um nome à missão e informe a região. Registre ao menos três evidências, cada uma com instrumento ou camada, produto, interpretação, limite e link primário.
5. Liste o payload completo: energia, prospecção, mobilidade, extração, processamento, comunicação, peças e contingência. O desafio exige massa limitada e 24 meses sem reabastecimento.
6. Descreva a operação de acesso, captura e separação. O painel incorpora as premissas atuais do laboratório para o cenário de água.
7. Explique a utilização do produto e preencha o registro de verificação: fontes abertas, ferramentas usadas, hipóteses mantidas e informações descartadas.
8. Exporte a comparação e o rascunho de missão em Markdown. Use-os como base para a documentação da equipe, revisando cada afirmação contra a fonte original.

### Antes de entregar

- A decisão tem recurso, região e finalidade em uma frase.
- Há pelo menos três evidências complementares, com limites explícitos.
- O payload cobre operação, energia, segurança e 24 meses sem reabastecimento, dentro da massa disponível.
- A extração corresponde ao terreno e ao material descritos.
- A utilização não trata água separada como água certificada para consumo ou propelente pronto.
- O processo de decisão identifica as fontes verificadas e o uso de ferramentas.
- O documento final respeita o limite de 14 slides e o pitch de 5 minutos indicado no briefing.

## Experimente em três minutos

1. Mantenha a meta em **100 kg** e selecione **gelo disperso**.
2. Observe a massa com gelo que precisa entrar no processo.
3. Selecione **depósito enterrado** e compare a alimentação com a cobertura a remover.
4. Reduza a recuperação na separação e observe o balanço de água.
5. Troque a finalidade para produção de gases. A energia de eletrólise entra no modelo e a água é convertida em equivalentes ideais de H₂ e O₂.
6. Abra a comparação e exporte o raciocínio.

Para um fluxo completo, comece pelos dados, avance para a missão e documente a decisão com as fontes verificadas.

## Executar localmente

Requisitos: Node.js 22.12 ou superior e npm.

```bash
git clone https://github.com/SouBeatrizKaroline/SpaceMiningChallenge_AquaLunar.git
cd SpaceMiningChallenge_AquaLunar
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

Consulte [equações, coeficientes e limites](metodologia.md).
