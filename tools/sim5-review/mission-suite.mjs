import {spawnSync} from 'node:child_process';import fs from 'node:fs';import path from 'node:path';import {toolRoot} from './inspect.mjs';
const out=path.join(toolRoot,'artifacts/height-pack6');fs.mkdirSync(out,{recursive:true});
for(const script of ['mission-state-test.mjs','mission-browser-test.mjs','height-test.mjs','performance-test.mjs','navigation-test.mjs','test.mjs','pack-test.mjs','controls-test.mjs']){
 const result=spawnSync(process.execPath,[path.join(toolRoot,script)],{cwd:toolRoot,stdio:'inherit',env:{...process.env,SIM5_REVIEW_OUT:out}});
 if(result.error)throw result.error;if(result.status!==0)process.exit(result.status||1);
}
