import {chromium} from '../sim5-review/node_modules/playwright/index.mjs';import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {root} from './module.mjs';
const base=process.env.P12_URL||'http://127.0.0.1:3130',rows=[];const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const paths=['knowledge-base/working-at-height','knowledge-base/scaffolding','knowledge-base/confined-space','knowledge-base/hot-work','knowledge-base/loto','knowledge-base/crane-safety','knowledge-base/electrical-safety','knowledge-base/excavation','knowledge-base/ppe','risk-assessment','tools/risk-matrix','posters/working-at-height-rules','labs','labs/sim5'];
const dir=path.join(root,'tools/p12-review/artifacts');fs.mkdirSync(dir,{recursive:true});
try{for(const locale of ['tr','en'])for(const width of [360,390,1440]){
 const c=await browser.newContext({viewport:{width,height:900},javaScriptEnabled:false,userAgent:"bingbot"});await c.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'||r.request().url().startsWith('data:')?r.continue():r.abort());const p=await c.newPage();p.setDefaultTimeout(3000);
 for(const route of paths){const errors=[];try{
  const response=await p.goto(`${base}/${locale}/${route}`,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200);assert.equal(await p.locator('html').getAttribute('lang'),locale);assert.ok((await p.locator('h1').first().textContent()).trim());
  assert.equal(await p.locator('link[rel=canonical]').getAttribute('href'),`https://www.sernem.com/${locale}/${route}`);
  for(const lang of ['en','tr','x-default']){const target=lang==='x-default'?'en':lang;assert.equal(await p.locator(`link[rel=alternate][hreflang="${lang}"]`).getAttribute('href'),`https://www.sernem.com/${target}/${route}`)}
  assert.ok(!(await p.locator('meta[name=robots]').evaluateAll(es=>es.map(e=>e.content).join(','))).includes('noindex'));
  for(const text of await p.locator('script[type="application/ld+json"]').allTextContents()){const data=JSON.parse(text);assert.ok(data);assert.ok(!/MedicalCondition|OccupationalHealth|SafetyProcedure|aggregateRating/.test(text))}
  const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,'horizontal overflow');
  if(route.startsWith('knowledge-base/')){const structured=await p.locator('script[type="application/ld+json"]').allTextContents();assert.equal(structured.filter(x=>x.includes('TechArticle')).length,1,'exactly one guide schema');assert.ok(await p.locator('aside').count());assert.ok(await p.locator('a[href^="https://www.osha.gov/"]').count());}
  if(width===390&&['knowledge-base/excavation','posters/working-at-height-rules'].includes(route))await p.screenshot({path:path.join(dir,`${locale}-${route.replaceAll('/','-')}.png`)});
 }catch(e){errors.push(e.message.split('\n')[0]);if(width===390)await p.screenshot({path:path.join(dir,`failure-${locale}-${route.replaceAll('/','-')}.png`)}).catch(()=>{})}rows.push({locale,width,route,result:errors.length?'FAIL':'PASS',errors});console.log(rows.at(-1).result,locale,width,route,errors.join('; '));}
 await c.close();
}}finally{await browser.close();fs.writeFileSync(path.join(root,'docs/p12-review/results/public-browser.json'),JSON.stringify(rows,null,2)+'\n')}
console.log('TOTAL',rows.length,'FAIL',rows.filter(r=>r.result==='FAIL').length);if(rows.some(r=>r.result==='FAIL'))process.exitCode=1;
