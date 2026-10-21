// Opt-in owner utility; default is OFFLINE validation. Never used to submit in P12.
import fs from 'node:fs/promises';import path from 'node:path';import {pathToFileURL} from 'node:url';import {load} from './module.mjs';
const origin='https://www.sernem.com';
export function validateChanges(changes,publicUrls,previousPublicUrls=new Set()){
 if(!Array.isArray(changes)||!changes.length||changes.length>100)throw Error('Expected 1–100 genuine changes');
 const urls=new Set();
 for(const c of changes){
  if(!c||!['created','updated','deleted'].includes(c.change)||!c.evidence?.trim()||!Number.isFinite(Date.parse(c.changedAt)))throw Error('Missing change evidence');
  const u=new URL(c.url);
  if(u.origin!==origin||u.search||u.hash||u.username||u.password||!/^\/(tr|en)(\/|$)/.test(u.pathname)||/\/(api|auth|admin|dashboard|account[^/]*|login|register|premium[^/]*|hse-performance)(\/|$)/.test(u.pathname)||!(c.change==='deleted'?previousPublicUrls:publicUrls).has(u.href))throw Error('Not an approved canonical public URL');
  urls.add(u.href);
 }return [...urls];
}
export async function submitBatch({urls,key,enabled,approved,fetchImpl=fetch,stateDir=import.meta.dirname}){
 if(!enabled||!approved)throw Error('Disabled');
 if(!/^[a-zA-Z0-9-]{8,128}$/.test(key||'')||!urls.length||urls.length>100)throw Error('Invalid configuration');
 const lock=path.join(stateDir,'.indexnow-lock'),stateFile=path.join(stateDir,'.indexnow-state.json');const handle=await fs.open(lock,'wx');
 try{
  let state=null;try{state=JSON.parse(await fs.readFile(stateFile,'utf8'))}catch(e){if(e.code!=='ENOENT')throw e}
  if(state&&Date.now()-state.lastAttemptAt<86400000)throw Error('Local 24h rate limit');
  const keyLocation=`${origin}/${key}.txt`,proof=await fetchImpl(keyLocation,{redirect:'error',signal:AbortSignal.timeout(5000)});
  if(!proof.ok||(await proof.text()).trim()!==key)throw Error('Domain ownership not verified');
  await fs.writeFile(stateFile,JSON.stringify({lastAttemptAt:Date.now(),count:urls.length})+'\n',{mode:0o600});
  for(let attempt=0;attempt<3;attempt++){
   try{
    const r=await fetchImpl('https://api.indexnow.org/indexnow',{method:'POST',redirect:'error',signal:AbortSignal.timeout(5000),headers:{'Content-Type':'application/json'},body:JSON.stringify({host:'www.sernem.com',key,keyLocation,urlList:urls})});
    if([200,202].includes(r.status))return {count:urls.length,status:r.status};
    if(r.status!==429&&r.status<500)throw Error('Rejected');
   }catch(e){if(e.message==='Rejected'||attempt===2)throw e}
   if(attempt<2)await new Promise(r=>setTimeout(r,250*(attempt+1)));
  }throw Error('Retry limit');
 }finally{await handle.close();await fs.unlink(lock)}
}
async function main(){
 const args=process.argv.slice(2),file=args.find(s=>!s.startsWith('--'));if(!file)throw Error('Manifest required');
 const inventory=(await load('app/app/sitemap.ts')).default();
 const previousPath=args.includes('--previous-sitemap')?args[args.indexOf('--previous-sitemap')+1]:null;
 const previous=previousPath?JSON.parse(await fs.readFile(previousPath,'utf8')):[];
 const urls=validateChanges(JSON.parse(await fs.readFile(file,'utf8')),new Set(inventory.map(e=>e.url)),new Set(previous));
 if(!args.includes('--submit')){console.log(`DRY RUN: ${urls.length} unique public URLs; nothing sent`);return}
 const r=await submitBatch({urls,key:process.env.INDEXNOW_KEY,enabled:process.env.INDEXNOW_ENABLED==='true',approved:args.includes('--owner-approved')});console.log(`Accepted ${r.count} URLs (HTTP ${r.status}); indexing not guaranteed`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main().catch(()=>{console.error('IndexNow failed: review manifest, configuration, ownership and local rate limit. No key, URL list or response body logged.');process.exitCode=1});
