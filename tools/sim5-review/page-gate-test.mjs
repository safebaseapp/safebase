import {build} from 'esbuild';import path from 'node:path';import assert from 'node:assert/strict';import {repoRoot} from './inspect.mjs';
globalThis.pageFixture={allowed:false,userId:null,reason:'guest'};
const stub={
 '@/lib/sim5/server-access':'export async function getSim5Access(){return globalThis.pageFixture}',
 'next/link':'export default function Link(){return null}',
 'next/navigation':'export function notFound(){throw Error("NOT_FOUND")}',
 './RealModels':'function Scene(){return null};Scene.sim5Scene=true;export default Scene',
 './Sim5History':'export default function History(){return null}',
 './Sim5Actions':'export function Sim5GateEvent(){return null};export function Sim5UnlockLink(){return null}'
};
const b=await build({entryPoints:[path.join(repoRoot,'app/app/[locale]/labs/sim5/page.tsx')],bundle:true,format:'esm',write:false,jsx:'automatic',nodePaths:[path.join(repoRoot,'app/node_modules')],plugins:[{name:'fixtures',setup(b){b.onResolve({filter:/.*/},a=>Object.hasOwn(stub,a.path)?{path:a.path,namespace:'fixture'}:null);b.onLoad({filter:/.*/,namespace:'fixture'},a=>({contents:stub[a.path]}))}}]});
const {default:Page}=await import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].contents).toString('base64'));
function scenes(node){if(!node||typeof node!=='object')return [];if(Array.isArray(node))return node.flatMap(scenes);return [...(node.type?.sim5Scene?[node]:[]),...scenes(node.props?.children)]}
for(const locale of ['tr','en'])for(const [reason,allowed,userId]of [['guest',false,null],['free',false,'a'],['inactive',false,'a'],['expired',false,'a'],['unconfigured',false,null],['premium',true,'a'],['admin',true,'a'],['reward',true,'a']]){
 globalThis.pageFixture={reason,allowed,userId};const tree=await Page({params:Promise.resolve({locale}),searchParams:Promise.resolve({premium:'true',mode:'full',admin:'1'})});const rendered=scenes(tree);assert.equal(rendered.length,allowed?1:0,locale+' '+reason);if(allowed)assert.equal(rendered[0].props.persist,true);console.log('CHECK server page',locale,reason,allowed?'full mission':'no operable scene');
}
await assert.rejects(()=>Page({params:Promise.resolve({locale:'xx'})}),/NOT_FOUND/);console.log('PASS 17 server page fixtures; LIVE sessions NOT RUN');delete globalThis.pageFixture;
