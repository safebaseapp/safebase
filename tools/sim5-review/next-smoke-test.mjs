import assert from 'node:assert/strict';import {chromium} from 'playwright';import fs from 'node:fs';import path from 'node:path';import {toolRoot} from './inspect.mjs';
// Real Next server, intentionally without Supabase. No mocked auth or API.
const base=process.env.SIM5_NEXT_URL||'http://127.0.0.1:3100';const checks=[];const check=(n,b)=>{assert.ok(b,n);checks.push(n);console.log('CHECK',n)};
for(const locale of ['tr','en']){
 const demo=await fetch(`${base}/${locale}/labs/sim5/demo?mode=full&premium=true`),html=await demo.text();check(locale+' real Next DEMO renders two-finding client entry',demo.status===200&&html.includes('missionMode')&&html.includes('demo')&&html.includes('0/2'));
 for(const rsc of [false,true]){const gate=await fetch(`${base}/${locale}/labs/sim5?premium=true&admin=1&mode=full`,{headers:rsc?{RSC:'1'}:{}}),text=await gate.text();check(`${locale} ${rsc?'RSC':'SSR'} forged flags cannot render full scene`,gate.status===200&&!text.includes('sim5-canvas')&&(text.includes('Premium access cannot currently be verified')||text.includes('Premium erişimi şu anda doğrulanamıyor')));}
}
const api=await fetch(base+'/api/labs/sim5/runs');check('real unauthenticated API fails closed',api.status===403);
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
try{const p=await browser.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));for(const locale of ['tr','en']){await p.goto(`${base}/${locale}/labs/sim5`);await p.getByRole('link',{name:locale==='tr'?'Ücretsiz Demo Oyna':'Play Free Demo',exact:true}).waitFor();await p.screenshot({path:path.join(toolRoot,`artifacts/pack7/next-gate-${locale}.png`),fullPage:true});}check('real gate hydration has no uncaught browser exceptions',errors.length===0);}finally{await browser.close()}
fs.writeFileSync(path.join(toolRoot,'artifacts/pack7/next-smoke-results.json'),JSON.stringify({checks,liveSupabase:'NOT_RUN'},null,2));console.log('PASS',checks.length,'real Next checks without Supabase');
