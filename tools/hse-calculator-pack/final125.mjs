import {chromium} from '../sim5-review/node_modules/playwright/index.mjs';
import {build} from '../sim5-review/node_modules/esbuild/lib/main.js';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const dir='docs/hse-calculator-pack/final125',results=[],writes=[],errors=[],base=process.env.HSE_HUB_URL||'http://127.0.0.1:4188';
const browserExecutable = process.env.HSE_CHROMIUM_EXECUTABLE || (fs.existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
const b=await chromium.launch({...(browserExecutable ? {executablePath:browserExecutable} : {}),args:['--no-sandbox']});
async function check(name,fn){try{await fn();results.push({name,result:'PASS'})}catch(e){results.push({name,result:'FAIL',error:String(e).split('\n')[0]})}console.log(results.at(-1))}
const ids=['risk-matrix','trir','ltifr','severity-rate','dart','noise-exposure','sling-tension','man-hours','heat-stress'];
try{
for(const [locale,width]of [['tr',390],['en',1440]]){
 const c=await b.newContext({viewport:{width,height:1000}});await c.route('**/*',r=>{if(r.request().method()!=='GET'){writes.push(r.request().method());return r.abort()}return new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort()});const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));
 for(const id of ids)await check(`${locale} ${id} studio identity, input focus and print isolation`,async()=>{
  await p.goto(`${base}/${locale}/tools/${id}`);const shell=p.locator('[data-calculator-experience]');await shell.waitFor();assert.equal(await shell.getAttribute('data-calculator-experience'),id);assert.equal(await shell.locator('h1').count(),1);assert.ok(await shell.getByText(locale==='tr'?'MODEL / BAZ':'MODEL / BASIS',{exact:true}).isVisible());
  const input=shell.locator('input').first();await input.focus();assert.equal(await input.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  if(['dart','trir','risk-matrix'].includes(id))await p.screenshot({path:`${dir}/after-${locale}-${id}.png`,fullPage:true});
  await p.emulateMedia({media:'print'});assert.equal(await shell.getByText(locale==='tr'?'MODEL / BAZ':'MODEL / BASIS',{exact:true}).isVisible(),false);await p.emulateMedia({media:'screen'});
 });
 await c.close();
}
// Field interpretation must be meaningful, not just a number: localhost only, no Supabase writes.
for(const locale of ['tr','en']){
 const c=await b.newContext({viewport:{width:390,height:960}});
 await c.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'&&r.request().method()==='GET'?r.continue():r.abort());
 const p=await c.newPage();
 await check(`${locale} sling angle-accurate diagram, WLL over/under and invalid angle`,async()=>{
  await p.goto(`${base}/${locale}/tools/sling-tension`);
  const a=p.locator('[data-calculator="sling-tension"]');
  await a.locator('[data-field="load"]').fill('1000');
  await a.locator('[data-field="angle"]').fill('30');
  assert.match(await a.locator('[data-result]').innerText(),/9[.,]81/);
  const g=a.locator('[data-sling-assessment]');await g.waitFor();
  assert.match(await g.innerText(),locale==='tr'?/KAPASİTE KARŞILAŞTIRMASI YAPILMADI/:/CAPACITY NOT VERIFIED/);
  const oldPath=await a.locator('[data-sling-geometry]').getAttribute('d');
  await a.locator('[data-field="angle"]').fill('60');
  const newPath=await a.locator('[data-sling-geometry]').getAttribute('d');
  assert.notEqual(oldPath,newPath);
  await a.locator('[data-field="angle"]').fill('30');
  await a.locator('[data-field="assemblyWll"]').fill('8');
  assert.match(await g.innerText(),locale==='tr'?/KAPASİTE AŞILIYOR/:/CAPACITY EXCEEDED/);
  await a.locator('[data-field="assemblyWll"]').fill('12');
  assert.match(await g.innerText(),locale==='tr'?/KALDIRMA ONAYI DEĞİL/:/NOT LIFT APPROVAL/);
  await a.locator('[data-field="assemblyWll"]').fill('bad');
  assert.match(await g.innerText(),locale==='tr'?/WLL GİRDİSİ GEÇERSİZ/:/INVALID WLL INPUT/);
  await a.locator('[data-field="angle"]').fill('20');
  assert.match(await g.innerText(),locale==='tr'?/30° altı/:/below 30°/i);
  await a.locator('[data-field="angle"]').fill('0');
  await a.locator('[data-validation]').waitFor();
  assert.equal(await a.locator('[data-sling-geometry]').count(),0);
 });
 await check(`${locale} WBGT heavy/unacclimatized compares OSHA Table 2, never grants clearance`,async()=>{
  await p.goto(`${base}/${locale}/tools/heat-stress`);
  const a=p.locator('[data-calculator="heat-stress"]');
  await a.locator('[data-field="wbgt"]').fill('28');
  await a.locator('select').nth(0).selectOption('3');
  await a.locator('select').nth(1).selectOption('heavy');
  await a.locator('select').nth(2).selectOption('no');
  const g=a.locator('[data-heat-screening]');
  await g.waitFor();
  assert.match(await g.innerText(),locale==='tr'?/23,00 °C/:/23.00 °C/);
  assert.match(await g.innerText(),locale==='tr'?/8,00 °C/:/8.00 °C/);
  assert.match(await g.innerText(),locale==='tr'?/AKSİYON GEREKLİ/:/ACTION REQUIRED/);
 });
 await c.close();
}

// Mount the actual draft consumer in a separate synthetic DOM, never bypass application auth.
for(const locale of ['tr','en']){
 const p=await b.newPage({viewport:{width:320,height:900}});await p.route('**/*',r=>{if(r.request().method()!=='GET'){writes.push(r.request().method());return r.abort()}return new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort()});await p.goto(base+'/'+locale+'/tools');
 const bundle=await build({tsconfig:'app/tsconfig.json',stdin:{contents:`import React from'react';import{createRoot}from'react-dom/client';import{CalculatorDraftPanel,storeCalculationDraft}from'./app/app/[locale]/tools/_shared/CalculatorHandoff';window.qaStore=storeCalculationDraft;const el=document.createElement('div');el.id='qa-final-draft';document.body.replaceChildren(el);createRoot(el).render(<CalculatorDraftPanel locale="${locale}"/>);`,loader:'tsx',resolveDir:process.cwd()},bundle:true,format:'iife',write:false,nodePaths:['app/node_modules'],plugins:[{name:'plain-link',setup(b){b.onResolve({filter:/^@\/utils\/supabase\/client$/},()=>({path:'db',namespace:'qa'}));b.onResolve({filter:/^next\/link$/},()=>({path:'link',namespace:'qa'}));b.onLoad({filter:/.*/,namespace:'qa'},args=>({contents:args.path==='db'?`window.qaKpi={user:'qa-user',row:null,writes:[]};export function createClient(){return {auth:{getUser:async()=>({data:{user:window.qaKpi.user?{id:window.qaKpi.user}:null},error:null})},from:()=>{let op='read',payload,filters=[];const q={eq(k,v){filters.push([k,v]);return q},is(k,v){filters.push([k,v]);return q},select(){return q},update(p){op='update';payload=p;return q},insert(p){op='insert';payload=p;return q},maybeSingle(){return run()},then(a,b){return run().then(a,b)}};async function run(){const state=window.qaKpi;if(op==='read')return {data:state.row,error:null};if(op==='update'&&!filters.every(([k,v])=>state.row?.[k]===v))return {data:null,error:null};state.writes.push(payload);state.row={...state.row,...payload,id:'qa-id'};return {data:{id:'qa-id'},error:null}}return q}}}`:"import React from'react';export default function Link(p){return React.createElement('a',p)}",loader:'js',resolveDir:process.cwd()+'/app'}))}}]});
 await p.addScriptTag({content:bundle.outputFiles[0].text});await p.locator('#qa-final-draft').waitFor();
 await p.evaluate(()=>{window.qaKpi.refreshEvents=0;window.addEventListener('sernem:monthly-kpi-saved',()=>{window.qaKpi.refreshEvents++})});
 for(const [source,field]of Object.entries({trir:'recordable_cases',ltifr:'lti','severity-rate':'lost_days',dart:'dart_cases'}))await check(`${locale} ${source} separate draft and confirmed monthly save`,async()=>{
  await p.evaluate(({source,field})=>{window.qaKpi.writes=[];window.qaKpi.refreshEvents=0;window.qaKpi.row={id:'qa-id',user_id:'qa-user',period_month:'2026-09-01',project_name:'QA non-customer',worked_hours:100000,recordable_cases:4,lti:1,lost_days:8,dart_cases:2,updated_at:null};window.qaStore({source,kind:'lagging',result:'2.00',unit:'rate',method:'test fixture',basis:'actual',inputs:{[field]:5,worked_hours:200000,period_month:'2026-09',project_name:'QA non-customer'}})},{source,field});
  const panel=p.locator('#qa-final-draft');await panel.getByRole('button',{name:locale==='tr'?'Dönem/proje kaydını kontrol et':'Check period/project record',exact:true}).waitFor();assert.equal(await p.evaluate(()=>window.qaKpi.writes.length),0);
  const draftBefore=await p.evaluate(()=>sessionStorage.getItem('sernem.calculator-draft.v1'));
  await panel.getByRole('button',{name:locale==='tr'?'Dönem/proje kaydını kontrol et':'Check period/project record',exact:true}).click();await panel.locator('[data-monthly-review]').waitFor();
  const save=panel.getByRole('button',{name:locale==='tr'?'Onayla ve aylık KPI kaydını kaydet':'Confirm and save monthly KPI record',exact:true});assert.ok(await save.isDisabled());assert.equal(await p.evaluate(()=>window.qaKpi.writes.length),0);
  assert.equal(await p.evaluate(()=>window.qaKpi.refreshEvents),0);await panel.getByRole('checkbox').check();await save.click();await panel.getByRole('status').filter({hasText:locale==='tr'?'başarıyla':'successfully'}).waitFor();assert.equal(await p.evaluate(()=>window.qaKpi.writes.length),1);assert.equal(await p.evaluate(()=>window.qaKpi.refreshEvents),1);assert.equal(await p.evaluate(f=>window.qaKpi.row[f],field),5);assert.equal(await p.evaluate(()=>window.qaKpi.row.worked_hours),200000);assert.equal(await p.evaluate(()=>sessionStorage.getItem('sernem.calculator-draft.v1')),draftBefore);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await panel.getByRole('button',{name:locale==='tr'?'Taslağı temizle':'Clear draft',exact:true}).click();assert.equal(await p.evaluate(()=>sessionStorage.getItem('sernem.calculator-draft.v1')),null);
 });
 await check(`${locale} period/project edit invalidates review; guest cannot save`,async()=>{
  await p.evaluate(()=>window.qaStore({source:'dart',kind:'lagging',result:'1',unit:'rate',method:'fixture',basis:'actual',inputs:{dart_cases:1,worked_hours:200000,period_month:'2026-09',project_name:'QA'}}));
  const panel=p.locator('#qa-final-draft'),check=panel.getByRole('button',{name:locale==='tr'?'Dönem/proje kaydını kontrol et':'Check period/project record',exact:true});await check.click();await panel.locator('[data-monthly-review]').waitFor();await panel.getByRole('textbox',{name:locale==='tr'?'KPI projesi (zorunlu)':'KPI project (required)',exact:true}).fill('QA changed');assert.equal(await panel.locator('[data-monthly-review]').count(),0);await p.evaluate(()=>{window.qaKpi.user=null;window.qaKpi.writes=[];window.qaKpi.refreshEvents=0});await check.click();await panel.getByRole('status').filter({hasText:locale==='tr'?'oturum':'Sign in'}).waitFor();assert.equal(await p.evaluate(()=>window.qaKpi.writes.length),0);assert.equal(await p.evaluate(()=>window.qaKpi.refreshEvents),0);
 });
 await check(`${locale} operational result has no KPI persistence option`,async()=>{await p.evaluate(()=>window.qaStore({source:'man-hours',kind:'operational',result:'420',unit:'h',method:'fixture',basis:'estimated',inputs:{rows:'QA'}}));await p.waitForFunction(()=>document.querySelector('#qa-final-draft')?.textContent.includes('420'));assert.equal(await p.locator('[data-monthly-kpi-save]').count(),0);});await p.close();
}
for(const locale of ['tr','en']){
 const context=await b.newContext({viewport:{width:390,height:900},permissions:['clipboard-read','clipboard-write']});await context.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'&&r.request().method()==='GET'?r.continue():r.abort());const p=await context.newPage();
 await check(`${locale} existing Risk Matrix PDF export`,async()=>{await p.goto(`${base}/${locale}/tools/risk-matrix`);const [download]=await Promise.all([p.waitForEvent('download'),p.getByRole('button',{name:locale==='tr'?/PROFESYONEL RİSK RAPORU/:/PROFESSIONAL RISK REPORT/}).click()]);await download.saveAs(`/tmp/hse-hub-legacy-${locale}-risk-matrix.pdf`)});
 await check(`${locale} Severity Rate report copy and browser print`,async()=>{await p.goto(`${base}/${locale}/tools/severity-rate`);const inputs=p.locator('input[type=number]');await inputs.nth(0).fill('12');await inputs.nth(1).fill('200000');await p.getByRole('button',{name:locale==='tr'?'Sonucu Kopyala':'Copy Result',exact:true}).click();assert.match(await p.evaluate(()=>navigator.clipboard.readText()),/12\.00/);await p.emulateMedia({media:'print'});await p.pdf({path:`/tmp/hse-hub-${locale}-severity-print.pdf`,format:'A4',printBackground:true});await p.emulateMedia({media:'screen'});});await context.close();
}
await check('zero write requests',()=>assert.deepEqual(writes,[]));await check('no browser errors',()=>assert.deepEqual(errors,[]));
}finally{await b.close();fs.writeFileSync(dir+'/final-results.json',JSON.stringify({results,writes,errors,note:'Separate draft and explicit monthly persistence contracts using a synthetic in-memory client. Real Supabase/auth/RLS saves NOT VERIFIED. No live customer data or individual incident writes.'},null,2)+'\n')}
if(results.some(r=>r.result!=='PASS'))process.exitCode=1;
