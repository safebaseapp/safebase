/* eslint-disable @typescript-eslint/no-explicit-any -- pinned Three runtime */
/** Original project geometry. GLB assets are never rewritten. */
export function addUpperEvidence(T:any,scene:any,markers:any[]) {
 const evidence:Record<string,any[]>={droppedTool:[],materials:[]};
 const steel=new T.MeshStandardMaterial({color:'#8e9ba2',metalness:.75,roughness:.35}),red=new T.MeshStandardMaterial({color:'#b44330',roughness:.8});
 const add=(id:string,g:any,m:any,x:number,y:number,z:number)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.name='evidence-'+id;o.userData.inspectionId=id;o.castShadow=true;o.receiveShadow=true;scene.add(o);markers.push(o);evidence[id].push(o);return o;};
 add('droppedTool',new T.BoxGeometry(.32,.025,.055),steel,57.8,11.235,-24.1);
 for(const x of [57.62,57.98]){const ring=add('droppedTool',new T.TorusGeometry(.048,.014,8,16),steel,x,11.235,-24.1);ring.rotation.x=Math.PI/2;}
 add('materials',new T.BoxGeometry(.38,.035,.27),red,51.5,11.235,-26.55);
 for(const z of [-26.685,-26.415])add('materials',new T.BoxGeometry(.38,.06,.025),red,51.5,11.28,z);
 for(const x of [51.31,51.69])add('materials',new T.BoxGeometry(.025,.06,.27),red,x,11.28,-26.55);
 for(let i=0;i<5;i++){const nut=add('materials',new T.TorusGeometry(.027,.012,6,6),steel,51.38+i*.055,11.275,-26.55+(i%2)*.07);nut.rotation.x=Math.PI/2;}
 const base=new Map<any,any>();for(const meshes of Object.values(evidence))for(const mesh of meshes)base.set(mesh,mesh.position.clone());
 const box=(name:string,x:number,y:number,z:number,w:number,h:number,d:number,color:string,id:string)=>{
  const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshStandardMaterial({color,roughness:.75,metalness:.25}));mesh.name=name;mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;mesh.visible=false;mesh.userData.inspectionId=id;scene.add(mesh);return mesh;
 };
 const toolBox=box('secured-tool-box',58.9,11.27,-25.1,.52,.12,.32,'#345e69','droppedTool');
 const toolLid=box('secured-tool-lid',58.9,11.345,-25.1,.54,.03,.34,'#527d86','droppedTool');
 const latch=box('secured-tool-latch',58.9,11.32,-25.28,.06,.05,.025,'#c6d1d5','droppedTool');
 const lid=box('closed-fittings-lid',46,11.325,-25.3,.40,.025,.29,'#b44330','materials');
 return { apply(completed:Set<string>){
  const toolDone=completed.has('droppedTool'),materialsDone=completed.has('materials');
  for(const mesh of evidence.droppedTool)mesh.position.copy(base.get(mesh)).add(new T.Vector3(toolDone?1.1:0,0,toolDone?-1:0));
  for(const mesh of evidence.materials)mesh.position.copy(base.get(mesh)).add(new T.Vector3(materialsDone?-5.5:0,0,materialsDone?1.25:0));
  toolBox.visible=toolLid.visible=latch.visible=toolDone;lid.visible=materialsDone;
  toolBox.userData.controlState=toolDone?'tool-stowed':'pending';lid.userData.controlState=materialsDone?'closed-and-relocated':'pending';
 }};

}
/** Shared, detailed CC BY human geometry from the already loaded source asset.
 * Retain its standing pose and PPE; omit apron, torch, shield and welding equipment.
 */
export function createSignaller(T:any,source:any){
 const group=new T.Group();group.name='sim5-signaller';source.updateMatrixWorld(true);
 const names=new Set(['Object_6','Object_8','Object_10','Object_12','Object_14','Object_15','Object_17','Object_18','Object_19','Object_20','Object_22','Object_24','Object_25']);
 const human=new T.Box3(),glove=new T.Box3();
 source.traverse((o:any)=>{if(!o.isMesh||!names.has(o.name))return;
  const g=o.geometry.clone().applyMatrix4(o.matrixWorld);g.setAttribute('normal',new T.BufferAttribute(new Float32Array(g.attributes.position.count*3),3));g.computeVertexNormals();
  const materials=(Array.isArray(o.material)?o.material:[o.material]).map((m:any)=>{const n=m.clone();
   if(n.map)n.map.colorSpace=T.SRGBColorSpace;
   const finish=n.name.includes('MC-BodySuit')?['#a8bfdc','#245d91',.91]:n.name.includes('materialMaterial')?['#ccb49c','#765136',.86]:n.name.includes('riding_helmet')?['#e9e3d0','#e9e3d0',.68]:null;
   if(finish){n.color.set(n.map?finish[0]:finish[1]);n.roughness=finish[2];n.metalness=0;}
   return n;});
  const mesh=new T.Mesh(g,Array.isArray(o.material)?materials:materials[0]);mesh.name='signaller-'+o.name;mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);human.union(new T.Box3().setFromObject(mesh));if(o.name==='Object_10')glove.copy(new T.Box3().setFromObject(mesh));
 });
 // A fitted high-visibility vest follows the existing torso triangles.
 const orange=new T.MeshStandardMaterial({color:'#f18729',roughness:.95,side:T.DoubleSide}),silver=new T.MeshStandardMaterial({color:'#d5ddd9',roughness:.65,side:T.DoubleSide});
 for(const mesh of [...group.children]){
  if(!/Object_(17|18|19|20)$/.test(mesh.name))continue;
  const original=mesh.geometry,a=original.attributes.position,index=original.index,normal=original.attributes.normal,geometry=original.clone(),keep:number[]=[],reflective:number[]=[];
  for(let i=0;i<(index?.count||a.count);i+=3){const ids=[0,1,2].map(j=>index?index.getX(i+j):i+j),c=new T.Vector3();for(const id of ids)c.add(new T.Vector3().fromBufferAttribute(a,id));c.divideScalar(3);if(c.y<1.02||c.y>1.43||Math.abs(c.x)>.20)continue;if(Math.abs(Math.abs(c.x)-.10)<.025||c.y<1.07)reflective.push(...ids);else keep.push(...ids);}
  const p=geometry.attributes.position;for(let i=0;i<p.count;i++){const v=new T.Vector3().fromBufferAttribute(p,i).addScaledVector(new T.Vector3().fromBufferAttribute(normal,i),.008);p.setXYZ(i,v.x,v.y,v.z);}geometry.setIndex([...keep,...reflective]);geometry.clearGroups();geometry.addGroup(0,keep.length,0);geometry.addGroup(keep.length,reflective.length,1);const vest=new T.Mesh(geometry,[orange,silver]);vest.name='signaller-fitted-vest';vest.castShadow=true;group.add(vest);
 }
 const radio=new T.Mesh(new T.BoxGeometry(.055,.12,.035),new T.MeshStandardMaterial({color:'#20272c',roughness:.8}));const gloveMesh=group.getObjectByName('signaller-Object_10'),hand=new T.Box3(),a=gloveMesh.geometry.attributes.position;for(let i=0;i<a.count;i++){const p=new T.Vector3().fromBufferAttribute(a,i);if(p.x>glove.getCenter(new T.Vector3()).x)hand.expandByPoint(p);}radio.position.copy(hand.getCenter(new T.Vector3()));group.add(radio);
 group.position.set(-17,.06-human.min.y,56);group.rotation.y=.57;group.userData.role='designated-signaller';return group;
}

/** An intentionally unstaffed fire-watch position: absence matches the question. */
export function addFireWatchStation(T:any,scene:any,tr:boolean){
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=160;const ctx=canvas.getContext('2d');if(!ctx)return;
 ctx.fillStyle='#e9c54a';ctx.fillRect(0,0,512,160);ctx.fillStyle='#162933';ctx.font='bold 35px sans-serif';ctx.textAlign='center';ctx.fillText(tr?'YANGIN GÖZCÜSÜ':'FIRE WATCH',256,68);ctx.font='26px sans-serif';ctx.fillText(tr?'Görevli bulunmuyor':'Station unstaffed',256,119);
 const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;
 const board=new T.Mesh(new T.PlaneGeometry(.95,.30),new T.MeshStandardMaterial({map,roughness:1,side:T.DoubleSide}));board.position.set(-19.5,1.3,-2.7);board.rotation.y=.5;scene.add(board);
 const post=new T.Mesh(new T.CylinderGeometry(.025,.025,1.15,8),new T.MeshStandardMaterial({color:'#53616a'}));post.position.set(-19.5,.58,-2.7);scene.add(post);
 const base=new T.Mesh(new T.BoxGeometry(.35,.05,.35),new T.MeshStandardMaterial({color:'#394b56'}));base.position.set(-19.5,.08,-2.7);scene.add(base);
}
