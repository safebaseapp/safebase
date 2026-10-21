import assert from 'node:assert/strict';import {execFileSync} from 'node:child_process';import fs from 'node:fs';import crypto from 'node:crypto';import {root} from './module.mjs';
const base='a6b06a3542465d50e981d9d52b300d584289ce02';const before=f=>execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8'});const now=f=>fs.readFileSync(root+'/'+f,'utf8');
const poster='app/app/[locale]/posters/[slug]/page.tsx',matrix='app/app/components/RiskMatrix.tsx';
const printBlock=s=>s.slice(s.indexOf('            @page {'),s.indexOf('          `,',s.indexOf('            @page {')));
assert.equal(printBlock(now(poster)),printBlock(before(poster)),'Poster @page/A4/A3/print CSS unchanged');
const withoutClasses=s=>s.replace(/className="[^"]*"/g,'className="<presentation>"');
assert.equal(withoutClasses(now(matrix)),withoutClasses(before(matrix)),'Risk state/math/recommendations/export identical; only static display classes changed');
const printHash=crypto.createHash('sha256').update(printBlock(now(poster))).digest('hex');fs.writeFileSync(root+'/docs/p12-review/results/mobile-followup/preservation.json',JSON.stringify({base,posterPrintCssUnchanged:true,posterPrintCssSha256:printHash,riskNonPresentationSourceUnchanged:true},null,2)+'\n');console.log('PASS exact poster print CSS preserved; calculator source identical after removing presentation class strings');
