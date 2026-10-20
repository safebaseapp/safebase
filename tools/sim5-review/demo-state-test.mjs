import assert from "node:assert/strict";
import {build} from "esbuild";
import path from "node:path";
import {repoRoot} from "./inspect.mjs";
const b=await build({entryPoints:[path.join(repoRoot,"app/app/[locale]/labs/sim5/MissionState.ts")],bundle:true,format:"esm",write:false});
const {createMission,reduceMission:r,missionSummary:s}=await import("data:text/javascript;base64,"+Buffer.from(b.outputFiles[0].contents).toString("base64"));
let m=r(createMission("demo"),{type:"start"});
assert.deepEqual(Object.keys(m.findings),["hotwork","lifting"]);
for(const id of ["leak","access","droppedTool","materials","__proto__","constructor"]){assert.equal(r(m,{type:"discover",id}),m);assert.equal(r(m,{type:"answer",id,answer:1}),m);}
for(const id of ["hotwork","lifting"]){m=r(m,{type:"discover",id});m=r(m,{type:"answer",id,answer:1});}
assert.equal(s(m).score,100);assert.equal(s(m).localXp,0);assert.equal(s(m).completed.length,2);assert.equal(s(m).missed.length,0);
m=r(m,{type:"finish"});assert.equal(r(m,{type:"discover",id:"leak"}),m);
for(let i=0;i<10;i++){m=r(m,{type:"restart"});assert.equal(m.mode,"demo");assert.equal(Object.keys(m.findings).length,2);assert.equal(s(m).localXp,0);}
console.log("PASS demo allowlist, forged IDs, 2-finding normalization, zero XP, unlimited replay");
