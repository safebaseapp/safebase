// No persistence, provider traffic, or account writes: exercise filter and row identity.
import assert from 'node:assert/strict';
import {chromium} from '../sim5-review/node_modules/playwright/index.mjs';
import {cookie} from './fixture-server.mjs';
const browser = await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const base = process.env.P11_URL || 'http://127.0.0.1:3128';
try {
  for (const locale of ['tr','en']) {
    const context = await browser.newContext({bypassCSP:true,viewport:{width:390,height:844}});
    await context.addCookies([cookie('free')]);
    await context.route('**/*',route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
    const page = await context.newPage();
    const errors=[];page.on('pageerror',()=>errors.push('browser exception'));
    await page.goto(`${base}/${locale}/tools/quick-risk-assessment`);
    const search = page.getByPlaceholder(locale === 'tr' ? 'Faaliyet, kategori veya tehlike ara...' : 'Search activity, category or hazard...');
    const activity = page.locator('label').filter({has:page.getByText(locale === 'tr' ? 'Hazır Faaliyet Seç' : 'Select Ready Activity',{exact:true})}).locator('select');
    assert.ok(await activity.inputValue(),'initial activity selected');
    await search.fill('p11-no-such-activity-xyz');
    await page.waitForFunction(() => Array.from(document.querySelectorAll('select')).some(s=>s.options.length===1 && s.value===''));
    assert.equal(await activity.inputValue(),'','empty filter clears selection');
    await search.fill('');
    await page.waitForFunction(() => Array.from(document.querySelectorAll('select')).some(s=>s.options.length>2 && s.value && s.value!=='all'));
    assert.ok(await activity.inputValue(),'filter reset restores valid activity');
    const rows = page.getByPlaceholder(locale === 'tr' ? 'Örn. İskele kurulumu' : 'Example: Scaffold erection');
    assert.equal(await rows.count(),1);
    await rows.first().fill('P11 original row');
    await page.getByRole('button',{name:locale==='tr'?'+ Yeni Risk Ekle':'+ Add Risk',exact:true}).first().click();
    assert.equal(await rows.count(),2);
    await rows.nth(1).fill('P11 added row');
    assert.equal(await rows.first().inputValue(),'P11 original row');
    assert.equal(await rows.nth(1).inputValue(),'P11 added row');
    await page.getByRole('button',{name:locale==='tr'?'🗑 Sil':'🗑 Delete',exact:true}).last().click();
    assert.equal(await rows.count(),1);
    assert.equal(await rows.first().inputValue(),'P11 original row');
    assert.equal(errors.length,0);
    console.log('PASS',locale,'mobile empty/reset filter, independent added row edits and deletion; no saved data writes');
    await context.close();
  }
} finally { await browser.close(); }
