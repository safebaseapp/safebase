// Actual production components and jsPDF, sandboxed auth/API/activity only. No live data.
import {chromium} from '../sim5-review/node_modules/playwright/index.mjs';
import {build} from '../sim5-review/node_modules/esbuild/lib/main.js';
import fs from 'node:fs';import assert from 'node:assert/strict';
const base=process.env.BASE||'http://127.0.0.1:4250',out='/tmp/signs-exports';fs.mkdirSync(out,{recursive:true});
const previous=(process.env.ONLY_SLUG||process.env.REBUILD_STANDARD)?JSON.parse(fs.readFileSync('docs/safety-signs-pack/evidence/exports.json')).results.filter(r=>r.slug&&(process.env.REBUILD_STANDARD?(r.mode==='premium'&&r.slug!=='no-unauthorized-entry'):r.slug!==process.env.ONLY_SLUG)):[];const result=[...previous],errors=[];
const db=`export function createClient(){return {auth:{getUser:async()=>({data:{user:window.qa.role==='anonymous'?null:{id:'synthetic'}}})},from:table=>({insert:async value=>{window.qa.writes.push({table,value});return{error:null}}})}}`;
const bundle=await build({stdin:{contents:`import React from 'react';import{createRoot}from'react-dom/client';import{flushSync}from'react-dom';import Renderer from './app/components/safety-signs/SignRenderer';import Buttons from './app/components/safety-signs/SignDownloadButtons';import{captureSafetySign}from'./app/lib/safety-signs/export';import{ safetySigns }from'./app/lib/safety-signs/data';const root=createRoot(document.getElementById('fixture'));window.qa={role:'free',writes:[]};window.signs=safetySigns;window.show=(i,locale)=>{document.documentElement.lang=locale;flushSync(()=>root.render(<div style={{width:650,height:920}}><Renderer sign={safetySigns[i]} locale={locale}/><Buttons signSlug={safetySigns[i].slug} signCode={safetySigns[i].code} signTitle={safetySigns[i].title[locale]} locale={locale}/></div>))};window.capture=captureSafetySign;`,resolveDir:process.cwd(),loader:'tsx'},bundle:true,format:'iife',write:false,jsx:'automatic',tsconfig:'app/tsconfig.json',nodePaths:['app/node_modules'],plugins:[{name:'local-auth-only',setup(b){b.onResolve({filter:/^@\/utils\/supabase\/client$/},()=>({path:'db',namespace:'qa'}));b.onLoad({filter:/.*/,namespace:'qa'},()=>({contents:db,loader:'js'}))}}]});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
try{const c=await browser.newContext({acceptDownloads:true,viewport:{width:1440,height:1200}});const p=await c.newPage();p.on('pageerror',e=>errors.push(String(e)));let role='free';
 await p.route('**/*',r=>{const u=new URL(r.request().url());if(u.pathname==='/api/safety-signs/download-access')return r.fulfill({json:{authenticated:role!=='anonymous',isPremium:['premium','expired'].includes(role)}});if(r.request().isNavigationRequest()){const css=['chunks','css'].flatMap(d=>fs.existsSync(`app/.next/static/${d}`)?fs.readdirSync(`app/.next/static/${d}`).filter(f=>f.endsWith('.css')).map(f=>`<link rel="stylesheet" href="/_next/static/${d}/${f}">`):[]).join('');return r.fulfill({contentType:'text/html',body:`<!doctype html><html><head>${css}</head><body><div id="fixture"></div></body></html>`})}return u.hostname==='127.0.0.1'&&r.request().method()==='GET'?r.continue():r.abort()});
 await p.goto(base+'/tr/safety-signs/no-smoking');await p.addScriptTag({content:bundle.outputFiles[0].text});
 for(const mode of ['free','premium'])for(const locale of ['tr','en'])for(let i=0;i<36;i++){
  if(process.env.ONLY_SLUG){const wanted=await p.evaluate(i=>window.signs[i].slug,i);if(wanted!==process.env.ONLY_SLUG)continue}
  if(process.env.REBUILD_STANDARD&&mode==='premium'){const slug=await p.evaluate(i=>window.signs[i].slug,i);if(slug!=='no-unauthorized-entry')continue}
  role=mode;await p.evaluate(({i,locale,mode})=>{window.qa.role=mode;window.qa.writes=[];window.show(i,locale)},{i,locale,mode});
  await p.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode()));await document.fonts.ready});
  const slug=await p.evaluate(i=>window.signs[i].slug,i);
  for(const format of ['a4','a3','png']){try{
   const downloadPromise=p.waitForEvent('download');const button=p.getByRole('button',{name:format==='png'?'PNG':`${format.toUpperCase()} PDF`,exact:true});
   // Two synchronous clicks must still produce one file/activity, including before auth resolves.
   await button.evaluate(e=>{e.click();e.click()});const d=await downloadPromise;const file=`${out}/${mode}-${locale}-${slug}-${format}.${format==='png'?'png':'pdf'}`;await d.saveAs(file);
   await p.waitForFunction(()=>!document.querySelector('button:disabled'));await p.waitForFunction(n=>window.qa.writes.length===n,['a4','a3','png'].indexOf(format)+1);
   const w=await p.evaluate(()=>window.qa.writes.at(-1));assert.equal(w.table,'user_activity_events');assert.equal(w.value.metadata.download_variant,mode==='premium'?'clean':'sernem_branded');assert.equal(w.value.metadata.format,format);
   result.push({mode,locale,slug,format,file,bytes:fs.statSync(file).size,result:'PASS'});
  }catch(e){result.push({mode,locale,slug,format,result:'FAIL',error:String(e)});throw e}}
  console.log(mode,locale,i,slug,'PASS');
 }
 await c.close();
}finally{await browser.close();fs.writeFileSync('docs/safety-signs-pack/evidence/exports.json',JSON.stringify({results:result,errors,method:'Actual SignDownloadButtons + Renderer + capture module + jsPDF. Auth and entitlement GET mocked, activity in memory; real Supabase/payment NOT TESTED. Two synchronous clicks for every generated format.'},null,2)+'\n')}
assert.equal(result.length,432);assert.equal(errors.length,0);assert.ok(result.every(r=>r.result==='PASS'));
