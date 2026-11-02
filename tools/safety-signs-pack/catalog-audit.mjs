import fs from 'node:fs';import cp from 'node:child_process';import crypto from 'node:crypto';import assert from 'node:assert/strict';import ts from '../../app/node_modules/typescript/lib/typescript.js';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const load=p=>{const e={};new Function('exports',ts.transpile(fs.readFileSync(p,'utf8'),{module:ts.ModuleKind.CommonJS}))(e);return e};
const {safetySigns}=load('app/lib/safety-signs/data.ts'),{resolveIsoCode}=load('app/lib/safety-signs/symbols.ts');
const baseline=JSON.parse(fs.readFileSync('docs/safety-signs-pack/evidence/baseline.json'));
assert.deepEqual(safetySigns.map(s=>s.slug),baseline.slugs);
for(const sign of safetySigns){const old=baseline.signs.find(s=>s.slug===sign.slug);if(sign.slug!=="no-unauthorized-entry")assert.deepEqual(sign,old);else{assert.equal(sign.icon,old.icon);assert.equal(sign.title.en,"No Thoroughfare");assert.equal(sign.title.tr,"Geçiş Yasaktır")}}
assert.equal(safetySigns.length,36);
for(const prop of ['slug','code'])assert.equal(new Set(safetySigns.map(s=>s[prop])).size,36);
assert.equal(new Set(safetySigns.map(s=>resolveIsoCode(s.icon))).size,36);assert.equal(resolveIsoCode('unknown'),null);assert.equal(resolveIsoCode('W999'),null);
const assets=safetySigns.map(s=>{const code=resolveIsoCode(s.icon),file=`app/public/safety-signs/iso/${code}.svg`,svg=fs.readFileSync(file);assert.ok(svg.toString().includes('<svg'));assert.ok(!/<script|<foreignObject|(?:href|src)=["']https?:/i.test(svg.toString()));assert.equal(sha(svg),sha(cp.execFileSync('git',['show',`${baseline.main}:${file}`])));return{slug:s.slug,productCode:s.code,symbolFile:code,category:s.category,sha256:sha(svg),source:'@iso-safety-signs/assets@1.0.1 (existing asset)',licenseStatus:'LEGACY INDIVIDUAL ARTWORK LICENSE NOT VERIFIED',standardStatus:'ISO 7010 code mapping from existing package; official ISO/3864 conformity NOT VERIFIED'};});
for(const [f,h]of Object.entries(baseline.protected))assert.equal(sha(fs.readFileSync(f)),h,f+' changed outside scope');
const current=fs.readFileSync('app/components/safety-signs/SignDownloadButtons.tsx','utf8'),old=cp.execFileSync('git',['show',`${baseline.main}:app/components/safety-signs/SignDownloadButtons.tsx`],{encoding:'utf8'});
const boundary=s=>s.slice(s.indexOf('  async function resolvePremiumDownloadAccess()'),s.indexOf('  async function captureSign('));assert.equal(boundary(current),boundary(old));
fs.writeFileSync('docs/safety-signs-pack/evidence/catalog-audit.json',JSON.stringify({result:'PASS',count:36,localeRoutes:72,protectedFiles:Object.keys(baseline.protected).length,eligibilityApi:'byte-identical',premiumResolver:'byte-identical',assets},null,2)+'\n');console.log('PASS 36 unique symbols, unchanged geometry, protected sources and eligibility');
