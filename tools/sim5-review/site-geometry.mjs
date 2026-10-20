import {inspectAsset,repoRoot} from './inspect.mjs';
import fs from 'node:fs';
const reports=['SERNEM_SIM4_Factory_optimized.glb','large_industrial_storage_tanks (1).glb'].map(file=>({file,...inspectAsset(`${repoRoot}/app/public/sim5/${file}`)}));
fs.mkdirSync(`${repoRoot}/docs/sim5-height-review`,{recursive:true});
fs.writeFileSync(`${repoRoot}/docs/sim5-height-review/source-geometry.json`,JSON.stringify(reports,null,2));
console.log(reports.map(r=>({file:r.file,sha256:r.sha256,nodes:r.nodes.length,meshes:r.meshCount,asset:r.asset})));
// Runtime fit uses GLTFLoader/Three bounds. render-site.mjs records the authoritative
// final world matrices, bounds and horizontal stair triangles after that fit.
