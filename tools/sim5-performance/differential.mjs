import * as T from '../sim5-review/node_modules/three/build/three.module.js';
import {build} from '../sim5-review/node_modules/esbuild/lib/main.js';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const path='app/app/[locale]/labs/sim5/SiteNavigation.ts';
async function compile(source){const r=await build({stdin:{contents:source,loader:'ts'},write:false,format:'esm'});return (await import('data:text/javascript;base64,'+Buffer.from(r.outputFiles[0].contents).toString('base64'))).createSiteNavigation}
const old=await compile(execFileSync('git',['show',`063a93d36c10262a7103c73a56fd6b2f7a98af79:${path}`],{encoding:'utf8'})),next=await compile(fs.readFileSync(path,'utf8'));
const scene=new T.Scene(),colliders=[],boxes=[];
function box(x,y,z,w,h,d,solid=true){const m=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshBasicMaterial());m.position.set(x,y,z);scene.add(m);m.updateMatrixWorld(true);if(solid){colliders.push(m);boxes.push(new T.Box3().setFromObject(m))}return m}
box(0,-.05,0,100,.1,100,false);box(2,1,0,.2,2,5);box(-2,1.6,0,2,.1,2);for(let i=0;i<12;i++)box(5+i*.3,.1+i*.1,0,.3,.2,2);const moving=box(0,.15,5,2,.3,2,false);
const a=old(T,scene,colliders,boxes,[]),b=next(T,scene,colliders,boxes,[]);let checks=0;
let seed=121;function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}
for(let route=0;route<120;route++){
 a.reset();b.reset();const p=new T.Vector3(random()*18-9,1.8,random()*12-6);
 for(let i=0;i<100;i++){
  if(i===50){moving.position.x=random()*8-4;moving.updateMatrixWorld(true)}
  const n=p.clone().add(new T.Vector3((random()-.5)*.5,0,(random()-.5)*.5));
  const x=a.step(n,p),y=b.step(n,p);assert.equal(y,x);assert.equal(b.feet,a.feet);if(x)p.copy(n);checks++;
 }
}
const before=JSON.parse(fs.readFileSync('docs/sim5-performance/before.json')),after=JSON.parse(fs.readFileSync('docs/sim5-performance/after.json'));assert.deepEqual(after.passes.map(p=>p.decisions),before.passes.map(p=>p.decisions));
fs.writeFileSync('docs/sim5-performance/differential.json',JSON.stringify({syntheticSteps:checks,actualGeometrySteps:before.passes.reduce((n,p)=>n+p.samples*2,0),result:'PASS: identical accept/reject, feet and positions; randomized floors/walls/steps/ceilings and moving support'},null,2));console.log('PASS',checks,'synthetic + actual geometry route decisions');
