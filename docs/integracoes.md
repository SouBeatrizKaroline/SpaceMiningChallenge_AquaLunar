# Integrações e dados externos

O AQUA Lunar integra um catálogo público de produtos lunares para aproximar o laboratório de uma investigação documentada. A consulta acrescenta metadados e caminhos para as fontes; os parâmetros de extração continuam sob controle do usuário.

## ODE REST

| Item | Referência |
| --- | --- |
| Serviço | Lunar Orbital Data Explorer, Washington University in St. Louis. |
| Portal lunar | [Lunar ODE](https://ode.rsl.wustl.edu/moon/) |
| Endpoint público | [ODE REST live2](https://oderest.rsl.wustl.edu/live2/) |
| Documentação | [ODE REST 2.1.6, PDF](https://oderest.rsl.wustl.edu/ODE_REST_V2.1.6.pdf) |
| Autenticação | As consultas utilizadas não exigem chave nem cadastro. |
| Processamento | Consulta no navegador, sem intermediário próprio. |
| Resultado utilizado | Metadados e links de produtos catalogados. |

O catálogo reúne dados planetários vinculados aos acervos científicos. A aplicação usa os registros para localizar produtos que podem sustentar perguntas sobre o terreno e o ambiente lunar. A identificação de um produto é uma etapa de pesquisa, sem comprovação automática de gelo ou de viabilidade de mineração.

### Categorias de pesquisa

| Categoria | Instrumento / tipo de produto | O que investigar |
| --- | --- | --- |
| Condições térmicas | Diviner, `DLRE` / `PRP` | Produtos polares derivados para temperatura e profundidade modelada de estabilidade do gelo. |
| Declividade | LOLA, `LOLA` / `GDRDSM` | Relevo e declividade para uma futura avaliação de acesso. |
| Sombra permanente | LOLA, `LOLA` / `GDRPSR` | Distribuição de áreas em sombra como contexto ambiental. |
| Sinal de nêutrons | LEND, `LEND` / `RDRALD4` | Contagens médias que exigem interpretação física antes de qualquer inferência sobre hidrogênio. |

Todas usam `query=product`, `target=moon`, `ihid=LRO` e `output=json`. A categoria determina `iid` e `pt`. A consulta usa `limit=6`, com `offset` a partir de zero. A URL completa acompanha os resultados para permitir a repetição da pesquisa. O número de registros devolvidos é o tamanho daquela página, sem promessa de contagem total do acervo.

O cliente verifica `ODEResults.Status` e normaliza a coleção `Products.Product`, que pode ser um objeto único ou uma lista. Um HTTP 200 sozinho não basta para considerar a consulta bem-sucedida. Os campos de metadados podem variar por produto; um campo ausente não deve ser preenchido com uma inferência.

### Cuidado com a versão do Diviner

O produto PRP combina dados e resultados derivados. A temperatura média anual do produto corresponde a dois centímetros abaixo da superfície; a temperatura máxima anual corresponde à superfície. A profundidade de estabilidade é modelada e não é uma medição da ocorrência de gelo.

No [rótulo PDS4 do PRP sul](https://pds-geosciences.wustl.edu/lro/urn-nasa-pds-lro_diviner_derived1/data_derived_prp/dlre_prp_south.xml), `version_id` identifica a versão do registro de arquivo, enquanto `lro:product_version_id` identifica a versão do produto derivado. O rótulo consultado registra, respectivamente, `1.0` e `2`. Esses números descrevem campos diferentes. A versão 1.0 do rótulo PDS4 não deve ser apresentada como confirmação de uso dos antigos PRP V1.0.

Para interpretar os produtos, leia também a [página do acervo Diviner no PDS](https://pds-geosciences.wustl.edu/missions/lro/diviner.htm). Os rótulos são oferecidos como links de consulta, sem dependência de leitura automática entre origens.

### Procedência

Cada investigação deve manter os critérios utilizados, o instante da consulta e os identificadores dos produtos selecionados. A data em que a consulta foi feita é diferente da data de aquisição de uma observação. Produtos publicados podem descrever observações antigas e continuar úteis para a pesquisa.

O caderno local permite registrar até 12 produtos selecionados e notas de até 1.200 caracteres. A exportação Markdown conserva esse raciocínio para revisão. Para sustentar uma afirmação científica, o usuário ainda precisa abrir o produto, identificar a variável, conferir versão e cobertura e documentar como chegou ao valor apresentado.

### Limites científicos

- Não há leitura de pixels, arquivos de instrumentos ou rasters científicos.
- Não há alteração automática das premissas do simulador.
- Metadados de cobertura não garantem que um produto resolva um ponto específico da área de interesse.
- Ausência de resultados não comprova ausência de água, terreno adequado ou observações em outros acervos.
- Uma consulta ao catálogo não é monitoramento em tempo real das condições da Lua.
- Os coeficientes de equipamento e energia permanecem ilustrativos, mesmo ao lado de um produto real.

### Falhas e disponibilidade

O serviço pode ficar indisponível, responder lentamente, modificar seu formato ou restringir acessos entre origens. A conexão do usuário também pode bloquear a consulta. A interface apresenta o erro e permite nova tentativa, sem substituir a resposta por produtos inventados ou resultados sem procedência.

Cada requisição tem limite de 20 segundos. Consultas idênticas podem aproveitar por cinco minutos um resultado em memória da sessão, preservando a data em que ele foi obtido. Esse cache não representa atualização contínua do catálogo.

Os cálculos, a comparação e os arquivos de cenário continuam locais. A lista carregada em uma sessão não constitui uma cópia completa do acervo. Uma exportação preserva o material selecionado, mas não garante que os links externos permaneçam disponíveis no futuro.

## Cenários em JSON

A importação e exportação de cenários não utiliza uma API. O arquivo é gerado ou lido no dispositivo. A estrutura é versionada com `schemaVersion: 1`, tem limite de 64 KiB e precisa passar pela validação das entradas do modelo antes de alterar os controles.

Um cenário importado continua sendo um conjunto de premissas. A existência de um arquivo ou o nome dado a ele não autentica sua origem nem transforma valores em medições.

## Privacidade

Ao consultar o catálogo, o navegador envia ao ODE os critérios da pesquisa. O serviço recebe os dados de conexão usuais, como endereço IP e informações técnicas da requisição. O AQUA Lunar não envia automaticamente o cenário de extração, os arquivos importados nem as notas do caderno.

Cenários e notas salvos ficam no armazenamento local do navegador. Limpar os dados do site os remove. Abrir um link externo estabelece uma conexão com o site de destino, sujeito às práticas daquele serviço. Não há backend próprio, cadastro, credenciais embutidas ou telemetria da aplicação.

## Por que não há dados de marés ou qualidade de rios

Fontes de água e operações marinhas podem ajudar a formular perguntas sobre caracterização, separação e controle de processo. Nesta versão, nenhuma série terrestre foi incorporada ao modelo lunar: não foi estabelecida uma relação física que permitisse usar marés, salinidade de oceanos ou qualidade de rios para calcular gelo lunar, energia de extração ou pureza do produto.

Uma integração adicional só deve entrar quando houver uma pergunta clara, uma variável aplicável e um método de interpretação documentado. A disponibilidade de uma API, por si só, não torna seus dados adequados ao problema.

## Código aberto e dados públicos

A licença MIT cobre o código deste repositório. O uso de uma API pública não significa que o software do provedor seja aberto, nem autoriza atribuir a seus produtos a licença deste projeto. As condições de uso, as citações e os créditos do acervo devem acompanhar qualquer reutilização.
