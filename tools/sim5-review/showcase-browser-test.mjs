import {chromium} from 'playwright';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import {toolRoot} from './inspect.mjs';
const base=process.env.SIM5_NEXT_URL||'http://127.0.0.1:3108',out=path.join(toolRoot,'artifacts/pack8');fs.mkdirSync(out,{recursive:true});const checks=[],errors=[];const check=(n,b)=>{assert.ok(b,n);checks.push(n);console.log('CHECK',n)};
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
try{
for(const locale of ['tr','en'])for(const [name,width,height]of [['desktop',1600,1000],['laptop',1440,1000],['tablet',820,1180],['mobile',390,844],['small',320,568],['landscape',844,390]]){
 const p=await browser.newPage({viewport:{width,height},hasTouch:width<1000});p.on('pageerror',e=>errors.push(e.message));await p.goto(`${base}/${locale}`,{waitUntil:'domcontentloaded'});const section=p.locator('[data-sim5-home-showcase]');await section.scrollIntoViewIfNeeded();await p.waitForFunction(()=>document.querySelector("[data-sim5-home-showcase] img")?.complete);await p.waitForTimeout(300);
 check(`${locale}/${name} showcase directly follows hero`,await section.evaluate(el=>!!el.previousElementSibling?.querySelector('#home-title')));
 check(`${locale}/${name} real image loaded`,await section.locator('img').evaluate(el=>el.complete&&el.naturalWidth>0&&el.getAttribute('alt').length>25));
 check(`${locale}/${name} no horizontal overflow`,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 for(const [kind,suffix]of [['demo','/demo'],['premium','']])check(`${locale}/${name} ${kind} CTA`,await section.locator(`a[href="/${locale}/labs/sim5${suffix}"]`).count()===1);
 if(['desktop','mobile'].includes(name))await section.screenshot({path:path.join(out,`homepage-${locale}-${name}.png`)});
 const platform=p.getByRole('button',{name:/Platform/});const trigger=await platform.isVisible()?platform:p.getByRole('button',{name:locale==='tr'?'Ana menü':'Main menu',exact:true});await trigger.click();await p.getByRole('button',{name:/^HSE Labs/}).click();const sim=p.locator('[data-sim5-menu-entry]');await sim.waitFor();await sim.scrollIntoViewIfNeeded();
 check(`${locale}/${name} menu preserves Labs links`,await p.locator(`a[href="/${locale}/labs/spot-the-hazard"]`).count()>0&&await p.locator(`a[href="/${locale}/labs/incident-simulator"]`).count()>0);
 await sim.locator('a').first().focus();await p.keyboard.press('Tab');check(`${locale}/${name} keyboard reaches Premium`,await sim.locator('a').nth(1).evaluate(el=>el===document.activeElement));
 if(['desktop','mobile'].includes(name))await p.screenshot({path:path.join(out,`menu-${locale}-${name}.png`)});
 await p.keyboard.press('Escape');check(`${locale}/${name} escape closes and restores trigger`,await trigger.getAttribute('aria-expanded')==='false'&&await trigger.evaluate(el=>el===document.activeElement));
 await p.goto(`${base}/${locale}/labs`,{waitUntil:'domcontentloaded'});const labs=p.locator('section[aria-labelledby="sim5-feature-title"]');await labs.scrollIntoViewIfNeeded();check(`${locale}/${name} Labs image loaded`,await labs.locator('img').evaluate(el=>el.complete&&el.naturalWidth>0));check(`${locale}/${name} Labs no overflow`,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));if(['desktop','mobile'].includes(name))await labs.screenshot({path:path.join(out,`labs-${locale}-${name}.png`)});await p.close();
}
for(const locale of ['tr','en']){
 const p=await browser.newPage();await p.goto(`${base}/${locale}`);await p.locator('[data-sim5-home-showcase] a').first().click();await p.waitForURL(`**/${locale}/labs/sim5/demo`);check(locale+' DEMO CTA navigates to public two-finding page',(await p.locator('main').innerText()).includes(locale==='tr'?'İki HSE bulgusu':'Two HSE findings'));
 await p.goto(`${base}/${locale}`);await p.locator('[data-sim5-home-showcase] a').nth(1).click();await p.waitForURL(`**/${locale}/labs/sim5`);check(locale+' Premium CTA navigates to fail-closed server gate',await p.locator('.sim5-canvas').count()===0&&(await p.locator('main').innerText()).includes(locale==='tr'?'doğrulanamıyor':'cannot currently be verified'));await p.close();
}
check('no browser exceptions',errors.length===0);fs.writeFileSync(path.join(out,'showcase-results.json'),JSON.stringify({timestamp:new Date().toISOString(),base,checks,errors},null,2));console.log('PASS',checks.length);
}finally{await browser.close()}
