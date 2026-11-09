import {chromium} from '../sim5-review/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const proxy=process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined;
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',proxy,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const cases=[];
try{for(const lang of ['tr','en']){
const p=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route('**/*',r=>{const u=new URL(r.request().url());return ['127.0.0.1','esm.sh'].includes(u.hostname)||['data:','blob:'].includes(u.protocol)?r.continue():r.abort()});
try{const response=await p.goto(`http://127.0.0.1:4183/${lang}/labs/sim5/demo`);if(response.status()>=400)throw Error('HTTP '+response.status()+' — local Next startup requires missing sandbox configuration');await p.getByRole('button',{name:lang==='tr'?'Denetime başla':'Start inspection',exact:true}).waitFor({timeout:60000});const b=p.getByRole('button',{name:lang==='tr'?'Denetime başla':'Start inspection',exact:true});await p.waitForFunction(()=>!!document.querySelector('[data-testid="sim5-start-overlay"] button:not(:disabled)'),null,{timeout:60000});await b.click();await p.getByRole('button',{name:lang==='tr'?'Duraklat':'Pause inspection',exact:true}).waitFor({timeout:10000});cases.push({lang,status:response.status(),result:'PASS',errors});}
catch(e){cases.push({lang,result:'NOT VERIFIED',error:String(e),alerts:await p.locator('[role="alert"], [role="status"]').allTextContents(),errors})}await p.close();
}}finally{await browser.close();fs.writeFileSync('docs/sim5-performance/next-smoke.json',JSON.stringify({cases,network:'Only localhost and esm.sh allowed; analytics and all live customer services blocked. Software WebGL; not hardware FPS.'},null,2));console.log(cases)}
