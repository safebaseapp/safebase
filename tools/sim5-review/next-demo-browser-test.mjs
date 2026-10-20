// Actual Next page and CDN runtime. No Three/GLB/auth interception.
import {chromium} from 'playwright';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import {toolRoot} from './inspect.mjs';
const proxy=process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined;
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',proxy,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const base=process.env.SIM5_NEXT_URL||'http://127.0.0.1:3100',checks=[],errors=[],failedRequests=[];
try{
 const page=await browser.newPage({viewport:{width:1280,height:1000}});page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>failedRequests.push({host:new URL(r.url()).hostname,error:r.failure()?.errorText}));
 // Do not send review traffic to the production analytics collector.
 await page.route('**/*googletagmanager.com/**',r=>r.abort());await page.route('**/*google-analytics.com/**',r=>r.abort());
 await page.goto(base+'/en/labs/sim5/demo',{waitUntil:'domcontentloaded'});
 try {await page.getByText('Industrial site ready · 2/2 models',{exact:true}).waitFor({timeout:45000});}
 catch(error){const status=await page.locator('[role="status"], [role="alert"]').allTextContents();fs.writeFileSync(path.join(toolRoot,'artifacts/pack7/next-demo-browser-failure.json'),JSON.stringify({status,errors,failedRequests,error:String(error)},null,2));console.log(JSON.stringify({status,errors,failedRequests},null,2));throw error;}
 await page.getByRole('button',{name:'Start inspection',exact:true}).waitFor();assert.ok(await page.getByRole('button',{name:'Start inspection',exact:true}).isEnabled());checks.push('actual Next page loads real industrial GLBs and CDN Three');
 await page.locator('canvas').screenshot({path:path.join(toolRoot,'artifacts/pack7/next-demo-overview.png')});
 await page.getByRole('button',{name:'Start inspection',exact:true}).click();await page.getByRole('button',{name:'Pause inspection',exact:true}).waitFor();await page.locator('.sim5-stage').scrollIntoViewIfNeeded();await page.keyboard.down('w');await page.waitForTimeout(250);await page.keyboard.up('w');
 assert.ok((await page.locator('.sim5-mission-hud').innerText()).includes('Found: 0/2'));checks.push('actual Next guest demo starts and keyboard input remains interactive');
 await page.locator('canvas').screenshot({path:path.join(toolRoot,'artifacts/pack7/next-demo-walk.png')});assert.deepEqual(errors,[]);checks.push('no uncaught actual-page browser errors');
 fs.writeFileSync(path.join(toolRoot,'artifacts/pack7/next-demo-browser-results.json'),JSON.stringify({checks,errors,liveSupabase:'NOT_RUN',analytics:'collector blocked; no live GA4 claim',runtime:'actual Next server + actual CDN Three, no scene substitution'},null,2));console.log('PASS',checks.length,'actual Next/CDN guest demo checks');
}finally{await browser.close()}
