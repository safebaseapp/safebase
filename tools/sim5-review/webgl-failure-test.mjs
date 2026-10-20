import {startServer} from './server.mjs';import {chromium} from 'playwright';import fs from 'node:fs';import path from 'node:path';import {toolRoot} from './inspect.mjs';import assert from 'node:assert/strict';
const {server,url}=await startServer(0),browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const checks=[];function check(n,b){assert.ok(b,n);checks.push(n);console.log('CHECK',n)}
try{
 for(const mode of ['unavailable','asset-failure','context-loss']){
  const p=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  if(mode==='unavailable')await p.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/i.test(type)?null:get.call(this,type,...args)}});
  if(mode==='asset-failure')await p.route('**/*.glb',r=>r.abort('failed'));
  await p.goto(url+'/site.html?mode=demo&lang=tr');
  if(mode==='context-loss'){
   await p.waitForFunction(()=>window.siteRenderer&&document.querySelector('[data-testid="sim5-start-overlay"] button')?.disabled===false,null,{timeout:120000});
   await p.evaluate(()=>window.siteRenderer.getContext().getExtension('WEBGL_lose_context').loseContext());
  }
  await p.getByRole('alert').waitFor({timeout:120000});check(mode+' has localized accessible fallback',(await p.getByRole('alert').innerText()).includes('Simülasyon yüklenmedi'));
  check(mode+' cannot start a broken mission',await p.getByRole('button',{name:'Denetime başla',exact:true}).isDisabled());
  await p.getByRole('alert').screenshot({path:path.join(toolRoot,`artifacts/pack7/${mode}.png`)});await p.close();
 }
 fs.writeFileSync(path.join(toolRoot,'artifacts/pack7/webgl-failure-results.json'),JSON.stringify({checks},null,2));console.log('PASS',checks.length);
}finally{await browser.close();server.closeAllConnections();server.close()}
