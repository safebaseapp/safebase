import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as THREE from 'three';
import {createHash} from 'node:crypto';
export const toolRoot=path.dirname(fileURLToPath(import.meta.url));
export const repoRoot=path.resolve(toolRoot,'../..');
export const assetPath=path.join(repoRoot,'app/public/sim5/SERNEM_Welder_06_under25MB.glb');
export function inspectAsset(){
 const bytes=fs.readFileSync(assetPath);
 if(bytes.readUInt32LE(0)!==0x46546c67||bytes.readUInt32LE(4)!==2||bytes.readUInt32LE(8)!==bytes.length)throw Error('Invalid GLB container');
 const jsonSize=bytes.readUInt32LE(12),g=JSON.parse(bytes.subarray(20,20+jsonSize));
 const bin=bytes.subarray(28+jsonSize),view=new DataView(bin.buffer,bin.byteOffset,bin.byteLength),meshes=[];
 function walk(i,parent){
  const n=g.nodes[i],local=n.matrix?new THREE.Matrix4().fromArray(n.matrix):new THREE.Matrix4().compose(new THREE.Vector3(...(n.translation||[0,0,0])),new THREE.Quaternion(...(n.rotation||[0,0,0,1])),new THREE.Vector3(...(n.scale||[1,1,1])));
  const world=parent.clone().multiply(local);
  if(n.mesh!==undefined)for(const p of g.meshes[n.mesh].primitives){
   const a=g.accessors[p.attributes.POSITION],bv=g.bufferViews[a.bufferView],box=new THREE.Box3();
   if(a.componentType!==5126||a.type!=='VEC3')throw Error('Inspector requires uncompressed float positions');
   for(let k=0;k<a.count;k++){const offset=(bv.byteOffset||0)+(a.byteOffset||0)+k*(bv.byteStride||12);box.expandByPoint(new THREE.Vector3(view.getFloat32(offset,true),view.getFloat32(offset+4,true),view.getFloat32(offset+8,true)).applyMatrix4(world));}
   meshes.push({node:i,name:n.name,mesh:n.mesh,material:p.material,materialName:g.materials[p.material]?.name,vertices:a.count,triangles:p.indices!==undefined?g.accessors[p.indices].count/3:a.count/3,min:box.min.toArray(),max:box.max.toArray(),localMatrix:local.toArray(),worldMatrix:world.toArray()});
  }
  for(const c of n.children||[])walk(c,world);
 }
 for(const root of g.scenes[g.scene||0].nodes)walk(root,new THREE.Matrix4());
 return {sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,asset:g.asset,nodes:g.nodes,materials:g.materials,meshCount:g.meshes.length,skins:g.skins?.length||0,animations:g.animations?.length||0,meshes};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const report=inspectAsset();fs.mkdirSync(path.join(toolRoot,'artifacts'),{recursive:true});fs.writeFileSync(path.join(toolRoot,'artifacts/asset-inspection.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify({sha256:report.sha256,nodes:report.nodes.length,meshes:report.meshCount,materials:report.materials.length,skins:report.skins,animations:report.animations,asset:report.asset},null,2));
 for(const name of ['Object_6','Object_8','Object_10','Object_709','Object_711','Object_771','Object_225'])console.log(report.meshes.find(m=>m.name===name));
}
