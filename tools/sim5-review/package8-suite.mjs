// Run against an already-built local Next server with no Supabase environment.
// Local DB test is intentionally separate and targets only the disposable Docker container.
import {spawnSync} from 'node:child_process';import path from 'node:path';import {toolRoot} from './inspect.mjs';
for(const script of ['redirect-test.mjs','showcase-analytics-test.mjs','completion-webgl-test.mjs','showcase-browser-test.mjs']){
 const result=spawnSync(process.execPath,[path.join(toolRoot,script)],{cwd:toolRoot,stdio:'inherit',env:process.env});if(result.error)throw result.error;if(result.status!==0)process.exit(result.status||1);
}
console.log('PASS Package 8 code/browser checks; LIVE Supabase/GA4 and physical devices NOT RUN');
