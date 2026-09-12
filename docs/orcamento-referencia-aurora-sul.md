# Orçamento de referência da Aurora Sul

## Status do orçamento

Este é um modelo inicial de engenharia para organizar a decisão da equipe. O desafio não informa a massa máxima que pode chegar à superfície. Por isso, a equipe adota **2.700 kg de payload entregue à superfície** como referência de planejamento. Esse valor não é especificação de uma agência espacial, nem orçamento final de lançamento.

## Massa de payload

| Subsistema | Massa de referência | Finalidade |
| --- | ---: | --- |
| Energia solar, baterias e controle | 380 kg | Painéis, armazenamento, conversão e distribuição de energia. |
| Controle térmico, proteção contra radiação e poeira | 220 kg | Isolamento, aquecimento, radiadores, vedação e proteção de componentes. |
| Comunicações, navegação e computação | 120 kg | Antenas, controles, posicionamento, dados e operação remota. |
| Mobilidade e prospecção | 250 kg | Rover, sensores e amostragem antes de iniciar a extração. |
| Escavação e transporte de regolito | 320 kg | Escavador, ferramenta de coleta e transporte até o reator. |
| Reator térmico, captura e condensação | 430 kg | Aquecimento fechado, coleta de vapor e condensação. |
| Tanques, tubulação e tratamento | 170 kg | Armazenamento, transferência e qualificação da água. |
| Estruturas de implantação e cabos | 180 kg | Fixação de painéis, cabos e integração dos módulos. |
| Peças, ferramentas e margem operacional | 240 kg | Reparos, desgaste e intervenção durante 24 meses. |
| Contingência de massa | 390 kg | Margem para itens que ainda precisam de definição técnica. |
| **Total** | **2.700 kg** | Referência de massa a ser revisada pela equipe. |

## Energia de referência

| Item | Hipótese de planejamento | Como interpretar |
| --- | --- | --- |
| Painéis solares instalados | 8 kW de potência nominal | Potência de placa, sujeita a geometria, poeira, temperatura, radiação e perdas elétricas. |
| Potência média de planejamento | 4 kW | Margem conservadora para iluminação variável e perdas. Não é medição do local. |
| Energia diária disponível | 96 kWh por dia | Resultado de 4 kW médios por 24 h. Depende de o local realmente manter essa média. |
| Armazenamento utilizável | 120 kWh | Permite deslocar cargas e atravessar períodos curtos de baixa geração. Não cobre qualquer período de sombra. |
| Carga diária priorizada | até 90 kWh por dia | Limite de planejamento para manter margem de 6 kWh por dia. |

As cargas de prospecção, escavação e aquecimento não devem operar ao mesmo tempo sem um plano de potência. O sistema prioriza segurança, controle térmico, comunicações e armazenamento; as cargas de extração podem ser adiadas quando a geração cai.

## Referência espacial

- Área única: **cratera Shackleton, polo sul lunar**.
- Ponto de referência geográfico da cratera: **89,66° S, 130,20° E**.
- A coordenada identifica a área de estudo, não uma posição final de pouso ou de painéis solares.
- A posição final na borda precisa de uma captura no Moon Trek com iluminação, declividade e linha de visada.

No QuickMap, selecione **Stereographic (South Pole)** e pesquise `-89.66,130.2`. A ferramenta centraliza a área e permite começar a leitura em escala de aproximadamente 20 km.

## Capturas necessárias

1. **Contexto do local:** QuickMap em projeção do polo sul, coordenada pesquisada e escala visível.
2. **Energia e terreno:** Moon Trek com camada de iluminação e, em outra captura, declividade ou elevação da borda escolhida.
3. **Recurso:** produto Diviner PRP V2.0 e produto LEND vinculados à mesma área, sempre com o nome da camada, versão e limite anotados.

Uma captura serve como evidência quando mostra a área, a camada e a escala. A equipe deve escrever abaixo da imagem o que ela permite concluir e o que ela ainda não permite concluir.

## Critério para rever a escolha

A Aurora Sul deve rever o local ou o perfil de operação se as camadas indicarem baixa iluminação, terreno incompatível, rota sem acesso, ausência de evidência complementar para hidrogênio ou profundidade de permafrost incompatível com a capacidade de escavação e energia.
