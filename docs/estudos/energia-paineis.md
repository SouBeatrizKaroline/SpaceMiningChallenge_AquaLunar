# Energia solar, sombra e monitoramento

[Voltar aos estudos](README.md) · [Orçamento preliminar](../missao/orcamento-referencia-aurora-sul.md)

## Quanto tempo o painel ficará iluminado?

**Ainda não há uma duração calculada para o painel da Aurora Sul.** Faltam coordenadas de instalação, altura, orientação, horizonte local e período de operação. A NASA descreve três pontos da borda de Shackleton que, considerados em conjunto, recebem luz em mais de 90% do ano. Isso não significa 90% para qualquer painel individual, nem informa a maior sequência de sombra. [NASA: borda iluminada e interior sombreado](https://science.nasa.gov/resource/shackleton-craters-illuminated-rim-shadowed-interior/).

PSR significa *Permanently Shadowed Region*, região permanentemente sombreada. Um painel dentro de uma PSR não recebe Sol direto. Estar perto da borda iluminada exige uma solução de distribuição de energia: por exemplo, cabos ou deslocamento com baterias. A distância no mapa não basta para provar uma rota viável.

## Método proposto para responder

1. Marcar o ponto dos painéis e a área de prospecção no Moon Trek.
2. Registrar relevo, horizonte, altura de instalação e linha de visada do Sol ao longo dos 24 meses propostos.
3. Extrair uma série temporal de iluminação, com passo de tempo e versão do modelo; evitar usar uma única imagem como previsão anual.
4. Calcular energia por intervalo e identificar o maior período sem geração útil.
5. Comparar geração com consumo, picos, aquecimento de sobrevivência, perdas e estado de carga das baterias.

Modelo simplificado de planejamento: **P(t) ≈ A × G(t) × η(t) × max(0, cos θ(t)) × f_visibilidade(t) × f_perdas(t)**. A é área, G é irradiância solar antes da correção angular, η é eficiência, θ é o ângulo entre a normal do painel e os raios, e os fatores representam sombra e perdas adicionais, incluindo poeira. A energia é a soma de P × duração de cada intervalo. Trata-se de proposta de cálculo, ainda não implementada nem calibrada no aplicativo.

## Fixo ou móvel?

| Opção | Benefício potencial | Custo ou limitação |
| --- | --- | --- |
| Painel fixo | Menos mecanismos e manutenção | Orientação pode limitar captação quando o Sol muda de direção |
| Base fixa com rastreamento angular | Ajusta a orientação para captar mais luz | Motores, cabos móveis, consumo, desgaste e risco de travamento |
| Painel levado por rover | Pode mudar de local ou apoiar reconhecimento | Transporte, estabilidade, massa e recarga; não resolve uma PSR sem iluminação |

**Hipótese para comparar:** base energética fixa na borda, avaliando painel fixo contra rastreamento angular. Não está selecionado um mecanismo de voo. Escolher por energia líquida recuperada e confiabilidade durante a missão, além de massa e facilidade de reparo.

## Painel mais escuro significa menos energia?

A aparência na câmera é apenas um indício. Exposição, ângulo, contraste, sombra e poeira podem alterar a imagem. A proposta é monitorar **tensão, corrente, potência, temperatura do painel, irradiância de referência, orientação e estado da bateria**. Comparar a potência medida com a esperada ajuda a distinguir sombra, sujeira e falha elétrica. Um sensor de luminosidade de bancada não substitui uma célula de referência calibrada.

## Poeira e controle térmico

A NASA documenta riscos do regolito para equipamentos e a demonstração do Electrodynamic Dust Shield (EDS), que removeu poeira de superfícies de vidro e de radiador na Lua em 2025. Isso é referência para pesquisa, não garantia de limpeza ou vida útil dos painéis desta proposta. [Riscos do regolito](https://science.nasa.gov/biological-physical/what-hazards-are-caused-by-lunar-regolith/) · [Resultado EDS](https://www.nasa.gov/blogs/missions/2025/03/14/nasa-science-data-received-blue-ghost-captures-eclipse-from-moon/).

Medidas candidatas: afastamento de escavação e plumas, proteção de juntas, monitoramento de degradação e comparação entre limpeza mecânica e eletrodinâmica em ensaios. Escovas podem desgastar superfícies; limpeza também consome recursos.

O orçamento existente cita 120 kWh utilizáveis. A 4 kW constantes, isso equivale a **30 horas teóricas** sem geração; não a 24 meses de autonomia. Recarga, envelhecimento, reserva, temperatura e potência de pico precisam entrar no dimensionamento. A massa de baterias, painéis e controle ainda precisa ser conciliada com esse armazenamento.
