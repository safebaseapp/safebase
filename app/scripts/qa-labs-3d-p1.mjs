// Package-1 source guard. Does not claim browser-level game play was tested.
import { readFileSync } from "node:fs";
const read=(p)=>readFileSync(new URL(`../${p}`,import.meta.url),"utf8");
const route=read("app/[locale]/labs/3d-safety-inspector/page.tsx");
const client=read("app/[locale]/labs/3d-safety-inspector/Inspector3D.tsx");
const world=read("app/[locale]/labs/3d-safety-inspector/world.ts");
const catalog=read("app/[locale]/labs/page.tsx");
const tests=[
 ["localized and noindex beta route", route.includes("Inspector3D")&&route.includes("index: false")&&route.includes("locale")],
 ["WebGL2 field renderer",world.includes('getContext("webgl2"')&&world.includes("gl.drawArrays(")],
 ["3D objects and boundaries",world.includes("constructSite()")&&world.includes("m.cylinder(")&&world.includes("m.solid(")],
 ["FPS movement and physical collision",world.includes("walk(forward:")&&world.includes("canMove(")&&world.includes("look(dx:")],
 ["keyboard & pointer controls",client.includes('"KeyW"')&&client.includes("requestPointerLock")&&client.includes("pointerlockchange")],
 ["pause reset and return to Labs",client.includes("const pause =")&&client.includes("const reset =")&&client.includes("/labs\`}")],
 ["beta is visible in Labs catalog",catalog.includes('href: "3d-safety-inspector"')&&catalog.includes('beta: true')],
 ["no historical Spot the Hazard images reused",!world.includes("/labs/spot-the-hazard/")&&!client.includes("/labs/spot-the-hazard/")],
 ["no changes to XP/Premium/learning outcomes",!client.includes("total_xp")&&!client.includes("Premium")&&!world.includes("xp")],
];
let bad=0;
for(const [name,pass] of tests){console.log(`${pass?"PASS":"FAIL"} ${name}`);if(!pass)bad++;}
if(bad)process.exit(1);
console.log("SERNEM Labs P1 static checks: all passed.");
