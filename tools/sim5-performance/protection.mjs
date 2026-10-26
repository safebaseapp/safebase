import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const paths=execFileSync('git',['diff','--name-only','063a93d36c10262a7103c73a56fd6b2f7a98af79'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
assert.deepEqual(paths.filter(p=>p.startsWith('app/')&&!p.startsWith('app/public/downloads/')),['app/app/[locale]/labs/sim5/SiteNavigation.ts']);
assert.ok(!paths.some(p=>p.startsWith('app/public/downloads/')),'Restore build-generated PDFs before protection check');
fs.writeFileSync('docs/sim5-performance/protection.json',JSON.stringify({result:'PASS',base:'063a93d36c10262a7103c73a56fd6b2f7a98af79',changedTrackedPaths:paths,note:'RealModels, assets, all payment/Premium/auth/Supabase/XP/scoring/question code byte-identical to base. No live services tested.'},null,2));console.log('PASS protected paths');
