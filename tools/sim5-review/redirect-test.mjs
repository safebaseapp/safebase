// Real page components with authorization dependency fixtures; no live sessions.
import {build} from 'esbuild';import assert from 'node:assert/strict';import path from 'node:path';import {repoRoot} from './inspect.mjs';
globalThis.sim5RedirectFixture={};
const stubs={'@/lib/sim5/server-access':'export async function getSim5Access(){return globalThis.sim5RedirectFixture}', 'next/link':'export default function Link(){return null}', 'next/navigation':'export function notFound(){throw Error("NOT_FOUND")}', './RealModels':'export default function Scene(){}','../RealModels':'export default function Scene(){}','./Sim5History':'export default function History(){}','./Sim5Actions':'export function Sim5GateEvent(){};export function Sim5UnlockLink(){}'};
function nodes(n){return !n||typeof n!=='object'?[]:Array.isArray(n)?n.flatMap(nodes):[n,...nodes(n.props?.children)]}
let count=0;
for(const file of ['page.tsx','demo/page.tsx']){
 const b=await build({entryPoints:[path.join(repoRoot,'app/app/[locale]/labs/sim5',file)],bundle:true,format:'esm',write:false,jsx:'automatic',nodePaths:[path.join(repoRoot,'app/node_modules')],plugins:[{name:'fixtures',setup(b){b.onResolve({filter:/.*/},a=>Object.hasOwn(stubs,a.path)?{path:a.path,namespace:'fixture'}:null);b.onLoad({filter:/.*/,namespace:'fixture'},a=>({contents:stubs[a.path]}))}}]});
 const {default:Page}=await import('data:text/javascript;base64,'+Buffer.from(b.outputFiles[0].contents).toString('base64'));
 for(const locale of ['tr','en'])for(const [reason,userId,allowed]of [['guest',null,false],['unavailable',null,false],['free','a',false],['inactive','a',false],['premium','a',true]]){
  globalThis.sim5RedirectFixture={reason,userId,allowed};const all=nodes(await Page({params:Promise.resolve({locale})}));const full=`/${locale}/labs/sim5`;
  const expected=allowed?full:reason==='inactive'?`/${locale}/account-suspended`:userId?`/${locale}/upgrade?next=${encodeURIComponent(full)}`:`/${locale}/login?next=${encodeURIComponent(full)}`;
  if(file.startsWith('demo'))assert.ok(all.some(n=>n.props?.unlockHref===expected));else if(!allowed)assert.ok(all.some(n=>n.props?.href===expected));
  count++;console.log('CHECK',file,locale,reason,expected);
 }
}
delete globalThis.sim5RedirectFixture;console.log('PASS',count,'redirect fixtures; LIVE login NOT RUN');
