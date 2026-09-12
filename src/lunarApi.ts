export const ODE_ENDPOINT = 'https://oderest.rsl.wustl.edu/live2/';
export const ODE_MANUAL = 'https://oderest.rsl.wustl.edu/ODE_REST_V2.1.6.pdf';
export const PAGE_SIZE = 6;
export const dataLayers = [
  {id:'thermal',name:'Condições térmicas',instrument:'Diviner',iid:'DLRE',pt:'PRP',scope:'Produtos polares norte e sul',question:'Onde investigar a estabilidade do gelo?',note:'PRP reúne produtos derivados. Temperatura e profundidade de estabilidade são resultados de modelos; não confirmam gelo explorável.',doc:'https://pds-geosciences.wustl.edu/missions/lro/diviner.htm',metadata:true},
  {id:'terrain',name:'Declividade',instrument:'LOLA',iid:'LOLA',pt:'GDRDSM',scope:'Mapas de declividade do acervo',question:'Que terreno precisa ser avaliado para acesso?',note:'Um mapa de declividade orienta a análise. A lista de produtos não verifica uma rota nem a capacidade de um rover.',doc:'https://pds-geosciences.wustl.edu/missions/lro/lola.htm',metadata:false},
  {id:'shadow',name:'Sombra permanente',instrument:'LOLA',iid:'LOLA',pt:'GDRPSR',scope:'Produtos de regiões em sombra',question:'Onde investigar armadilhas frias?',note:'Sombra permanente é uma condição ambiental. Ela não mede a concentração de água.',doc:'https://pds-geosciences.wustl.edu/missions/lro/lola.htm',metadata:false},
  {id:'hydrogen',name:'Sinal de nêutrons',instrument:'LEND',iid:'LEND',pt:'RDRALD4',scope:'Produtos de contagens médias do acervo',question:'Que sinal pode orientar a investigação de hidrogênio?',note:'Contagens de nêutrons exigem calibração e interpretação. Não equivalem diretamente a gelo, pureza ou teor minerável.',doc:'https://pds-geosciences.wustl.edu/missions/lro/lend.htm',metadata:false},
] as const;
export type LayerId = typeof dataLayers[number]['id'];
export interface LunarProduct {id:string;pdsId:string;instrument:string;productType:string;dataset:string;title:string;description:string;labelVersion:string;createdAt:string;productUrl:string;labelUrl:string;filesUrl:string;lid:string}
export interface CatalogPage {products:LunarProduct[];queryUrl:string;fetchedAt:string;offset:number;layerId:LayerId}
export interface ResearchEntry {product:LunarProduct;queryUrl:string;fetchedAt:string;layerId:LayerId;note:string}
export function isLayerId(value:unknown):value is LayerId {return dataLayers.some(x=>x.id===value)}
export function safeUrl(value:unknown):string {if(typeof value!=='string')return '';try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:''}catch{return ''}}
function object(value:unknown):Record<string,unknown>{return value&&typeof value==='object'&&!Array.isArray(value)?value as Record<string,unknown>:{}}
function str(value:unknown,max=400):string{return typeof value==='string'?value.slice(0,max).trim():''}
export function buildQuery(layerId:LayerId,offset=0):string {
  const layer=dataLayers.find(x=>x.id===layerId);
  if(!layer||!Number.isInteger(offset)||offset<0||offset>600)throw new Error('Consulta fora dos limites do catálogo.');
  const params=new URLSearchParams({query:'product',target:'moon',odemetadb:'moon',ihid:'LRO',iid:layer.iid,pt:layer.pt,results:'copf',output:'json',limit:String(PAGE_SIZE),offset:String(offset)});
  return ODE_ENDPOINT+'?'+params.toString();
}
export function normalizeProducts(payload:unknown,layerId:LayerId):LunarProduct[]{
  const root=object(object(payload).ODEResults);
  if(str(root.Status).toLowerCase()!=='success')throw new Error('O catálogo ODE não confirmou esta consulta. Tente novamente.');
  const list=object(root.Products).Product;
  if(list===undefined||list===null){if(String(root.Count)==='0')return [];throw new Error('O catálogo retornou uma estrutura inesperada.');}
  const items=Array.isArray(list)?list:[list];
  if(items.length>PAGE_SIZE)throw new Error('O catálogo retornou mais registros que o solicitado.');
  const layer=dataLayers.find(x=>x.id===layerId)!;
  return items.map(item=>{
    const x=object(item),id=str(x.ode_id),pdsId=str(x.pdsid);
    if(!/^\d+$/.test(id)||!pdsId||str(x.iid).toUpperCase()!==layer.iid||str(x.pt).toUpperCase()!==layer.pt)throw new Error('Um registro recebido não corresponde ao instrumento solicitado.');
    const productUrl=new URL('https://ode.rsl.wustl.edu/moon/indexproductpage.aspx');productUrl.search=new URLSearchParams({product_id:pdsId,product_idGeo:id}).toString();
    const rawFiles=object(x.Product_files).Product_file;
    const files=(Array.isArray(rawFiles)?rawFiles:rawFiles?[rawFiles]:[]).map(object);
    const label=files.find(f=>str(f.Description).includes('PDS4 PRODUCT LABEL'))||files.find(f=>str(f.Description).includes('PRODUCT LABEL'));
    const filesUrl=new URL(productUrl.href);filesUrl.pathname='/moon/productfiles.aspx';
    return {id,pdsId,instrument:layer.instrument,productType:layer.pt,dataset:str(x.Data_Set_Id),title:str(x.Product_title)||pdsId,description:str(x.Description,1200),labelVersion:str(x.Product_version_id),createdAt:str(x.Product_creation_time),productUrl:safeUrl(x.ProductURL)||productUrl.href,labelUrl:safeUrl(x.LabelURL)||safeUrl(label?.URL),filesUrl:safeUrl(x.FilesURL)||filesUrl.href,lid:str(x.Product_lid)};
  });
}
const cache=new Map<string,CatalogPage>();
export async function fetchCatalog(layerId:LayerId,offset=0,signal?:AbortSignal,refresh=false):Promise<CatalogPage>{
  const queryUrl=buildQuery(layerId,offset),cached=cache.get(queryUrl);
  if(!refresh&&cached&&Date.now()-Date.parse(cached.fetchedAt)<300000)return cached;
  const timeout=AbortSignal.timeout(20000);
  const response=await fetch(queryUrl,{signal:signal?AbortSignal.any([signal,timeout]):timeout,credentials:'omit',headers:{Accept:'application/json'}});
  if(!response.ok)throw new Error(`O catálogo está indisponível (HTTP ${response.status}). Tente novamente.`);
  const text=await response.text();
  if(text.length>2000000)throw new Error('Resposta muito grande para esta consulta. Abra o catálogo original.');
  let payload:unknown;try{payload=JSON.parse(text)}catch{throw new Error('O serviço não retornou dados legíveis. Tente novamente mais tarde.');}
  const result={products:normalizeProducts(payload,layerId),queryUrl,fetchedAt:new Date().toISOString(),offset,layerId};
  cache.set(queryUrl,result);return result;
}
export function readNotebook(text:string|null):ResearchEntry[]{
  try{
    if(!text||text.length>200000)return [];
    const data:unknown=JSON.parse(text);if(!Array.isArray(data)||data.length>12)return [];
    return data.flatMap(raw=>{
      const x=object(raw),p=object(x.product);
      if(!isLayerId(x.layerId)||!/^\d+$/.test(str(p.id))||!str(p.pdsId)||!safeUrl(x.queryUrl).startsWith(ODE_ENDPOINT+'?')||!Number.isFinite(Date.parse(str(x.fetchedAt))))return [];
      const product={id:str(p.id),pdsId:str(p.pdsId),instrument:str(p.instrument),productType:str(p.productType),dataset:str(p.dataset),title:str(p.title),description:str(p.description,1200),labelVersion:str(p.labelVersion),createdAt:str(p.createdAt),productUrl:safeUrl(p.productUrl),labelUrl:safeUrl(p.labelUrl),filesUrl:safeUrl(p.filesUrl),lid:str(p.lid)};
      return [{product,layerId:x.layerId,queryUrl:safeUrl(x.queryUrl),fetchedAt:str(x.fetchedAt),note:str(x.note,1200)}];
    });
  }catch{return []}
}
export function notebookReport(entries:ResearchEntry[]):string{
  return `# AQUA Lunar: caderno de pesquisa\n\nExportado em ${new Date().toISOString()}.\n\nRegistros consultados no ODE. Metadados não confirmam água explorável e não alteram os parâmetros do simulador. As notas são interpretações de quem usa o laboratório.\n\n${entries.map((x,i)=>`## ${i+1}. ${x.product.pdsId}\n\n- Instrumento: ${x.product.instrument}\n- Tipo: ${x.product.productType}\n- Conjunto: ${x.product.dataset}\n- LID: ${x.product.lid||'não informado na listagem'}\n- Consulta: [resposta ODE](${x.queryUrl})\n- Consultado em: ${x.fetchedAt}\n- Registro: [abrir no ODE](${x.product.productUrl})\n${x.product.labelUrl?`- Rótulo: [metadados originais](${x.product.labelUrl})\n`:''}\n### Interpretação e limites\n\n${x.note||'Ainda não registrada. Ler o produto e seus metadados antes de concluir.'}\n`).join('\n')}\n## Documentação da integração\n\n[Manual ODE REST](${ODE_MANUAL}).\n\nA seleção de três registros não equivale a três evidências independentes. É necessário interpretar as medições, considerar versões, escala e incertezas.\n`;
}
