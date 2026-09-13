# Metodologia do laboratório

## Fronteira

O modelo dimensiona massas a partir de uma meta de água após separação e calcula energia parcial com coeficientes assumidos. Não calcula reservas, tempo de missão, potência instantânea, temperatura de operação, pureza ou custo financeiro.

Os três perfis são sintéticos. Nenhum está associado a uma concentração medida em Cabeus ou outra cratera.

## Massa

Sejam M a meta, c a fração de gelo, r a recuperação de captura e p a recuperação da etapa de separação. As três frações são adimensionais.

```text
alimentação = M / (c × r × p)
água contida = alimentação × c
água capturada = água contida × r
água não capturada = água contida - água capturada
perda de água na separação = água capturada - M
fração não aquosa de alimentação = alimentação - água contida
```

Uma diminuição na recuperação aumenta a alimentação necessária para manter a mesma meta. O modelo não informa quais contaminantes foram removidos. A fração não aquosa também não equivale a um inventário físico completo de rejeitos de todos os subsistemas.

## Cobertura

```text
cobertura = área de escavação × (espessura em cm / 100) × 1500 kg/m³
massa movimentada = cobertura + alimentação
```

A densidade de 1.500 kg/m³ é hipótese ilustrativa. A cobertura é uniforme e sem gelo; a massa da alimentação pertence a uma camada distinta. Não há espessura ou volume de reserva calculados para a camada com gelo. Área, profundidade e densidade não foram extraídas de um mapa real.

## Energia

| Parcela | Regra | Natureza |
| --- | --- | --- |
| Térmica | Alimentação × coeficiente ajustável | Hipótese por kg alimentado; valor inicial 0,25 kWh/kg. |
| Movimentação | Massa movimentada × 0,005 kWh/kg | Coeficiente ilustrativo. |
| Separação | Água capturada × 0,02 kWh/kg | Coeficiente ilustrativo; não simula remoção de espécies. |
| Eletrólise | Meta × 5,5 kWh/kg | Hipótese somente para os objetivos de gases. |

O orçamento é aplicado à soma dessas parcelas. Estar dentro dele significa somente atender ao modelo parcial. Não inclui perdas térmicas dimensionadas, energia de sobrevivência, comunicações, transporte espacial, fabricação de reagentes, compressão, liquefação e armazenamento.

O coeficiente térmico agregado não separa calor sensível, sublimação, perdas, recuperação de calor e eficiência. Sua substituição por um modelo físico é uma etapa futura.

## Destinação

Pesquisa e suporte à vida mantêm a meta como água separada, sem qualidade certificada. Nos objetivos de oxigênio e propelentes, a água é convertida integralmente em equivalentes ideais aproximados de 8/9 de O₂ e 1/9 de H₂, adotando massas molares inteiras didáticas. Não representa desempenho real, pureza ou capacidade de liquefação. O hidrogênio também aparece quando o objetivo principal é oxigênio, para preservar o balanço.

## Sensibilidade e comparação

A curva usa concentrações de 0,5%, 1%, 2%, 3%, 5%, 8%, 10%, 15% e 20%, mantendo as demais entradas. As alturas das barras usam raiz quadrada da massa para legibilidade; os rótulos mostram valores em kg e a escala está identificada.

Os perfis na comparação recebem a meta, finalidade, área, energia específica e orçamento do cenário atual. O cenário salvo conserva sua própria configuração, indicada no cartão. Não há ranking de jazidas, pois os valores não são medições.

## Materiais coextraídos

As opções de poeira e voláteis orientam perguntas. Não selecionar uma opção não comprova ausência. Como não há composição ou especificação de processo, o sistema não inventa penalidades energéticas ou eficiências por contaminante.

## Qualificação de uma futura evidência

Registrar fonte primária, instrumento, produto, versão, coordenadas, projeção, resolução, unidade, método de extração do valor, intervalo e incerteza. Evidência regional não deve ser apresentada como medição de um ponto de coleta.
