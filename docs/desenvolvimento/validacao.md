# Validação do MVP

## Modelo

17 testes automatizados verificam conservação de massa, perdas, concentração, cobertura, energia, eletrólise, orçamento, validação de cenários salvos e presença de fontes no relatório.

## Interface

Verificação em Chromium com viewport de 1.440 × 1.100 e versões móveis de 390 e 320 pixels de largura:

- Alteração de concentração e cobertura com atualização dos resultados.
- Conversão ideal em oxigênio e hidrogênio.
- Salvamento e recuperação após recarregar a página.
- Comparação entre cenário atual, três perfis e cenário salvo.
- Seleção de perfis, gráfico de sensibilidade e etapas de processo.
- Perguntas sobre coextraídos sem inventar alterações de energia.
- Exportação do relatório com fontes.
- Busca nas dez referências, estado vazio e limpeza da busca.
- Navegação, documentação de método e guia fechado pela tecla Escape.
- Ausência de transbordamento horizontal da página nas duas larguras móveis.

Nenhum erro de execução foi observado nesses fluxos. Essa verificação não equivale a uma auditoria completa de acessibilidade ou compatibilidade com todos os navegadores.

## Limite científico

Testes confirmam o comportamento do modelo implementado. Não validam os coeficientes, uma jazida lunar ou o desempenho de equipamentos reais. A calibração depende de dados e ensaios futuros.
