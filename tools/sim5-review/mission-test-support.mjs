import {build} from 'esbuild';import path from 'node:path';import {repoRoot} from './inspect.mjs';
const compiled=await build({entryPoints:[path.join(repoRoot,'app/app/[locale]/labs/sim5/SiteInspections.ts')],format:'esm',write:false});
export const {siteInspections}=await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].contents).toString('base64'));
export async function startMission(page,lang='en'){
 const label=lang==='tr'?'Denetime başla':'Start inspection';const button=page.getByRole('button',{name:label,exact:true});await button.waitFor({timeout:120000});await page.waitForFunction(label=>[...document.querySelectorAll('button')].some(b=>b.textContent===label&&!b.disabled),label,{timeout:120000});await button.click();await page.waitForTimeout(80);
}
export async function resumeMission(page){const b=page.getByRole('button',{name:/^(Resume inspection|Denetime devam et)$/});if(await b.count())await b.click();}
export async function lookAtPoint(page,point){
 await page.locator('.sim5-stage').scrollIntoViewIfNeeded();
 for(let i=0;i<14;i++){
  const d=await page.evaluate(point=>{const c=window.siteCamera,v=c.getWorldDirection(c.position.clone()),dx=point[0]-c.position.x,dy=point[1]-c.position.y,dz=point[2]-c.position.z;let yaw=Math.atan2(dx,dz)-Math.atan2(v.x,v.z);yaw=Math.atan2(Math.sin(yaw),Math.cos(yaw));return {yaw,pitch:Math.max(-1.15,Math.min(1.15,Math.atan2(dy,Math.hypot(dx,dz))))-Math.asin(v.y)}},point);
  if(Math.abs(d.yaw)<.003&&Math.abs(d.pitch)<.003){await page.waitForTimeout(80);return;}
  const b=await page.locator('canvas').boundingBox(),x=b.x+b.width*.5,y=b.y+b.height*.4,dx=Math.max(-b.width*.35,Math.min(b.width*.35,-d.yaw/.004)),dy=Math.max(-b.height*.3,Math.min(b.height*.3,-d.pitch/.003));
  await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+dx,y+dy,{steps:3});await page.mouse.up();await page.waitForTimeout(35);
 }
 throw Error('Could not face evidence '+point);
}
export const lookAtInspection=(page,id)=>lookAtPoint(page,siteInspections[id].location);
