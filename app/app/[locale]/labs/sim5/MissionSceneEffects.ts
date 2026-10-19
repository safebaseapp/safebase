/* eslint-disable @typescript-eslint/no-explicit-any -- pinned Three runtime */
import { controlOutcomes } from "./MissionConsequences";

/** Allocate once. Completion changes visibility/transforms only, not GLB geometry. */
export function createMissionSceneEffects(T:any,scene:any,tr:boolean,upper:{apply:(ids:Set<string>)=>void}) {
 const group=new T.Group();group.name='sim5-mission-controls';scene.add(group);
 const anchors:Record<string,number[]>={hotwork:[-20,2.3,-3],leak:[22,2.3,-20],access:[19.5,2.2,-5],lifting:[-18,3,47],droppedTool:[58.9,12.4,-25.1],materials:[46,12.4,-25.3]};
 const cards=new Map<string,any>();
 for(const [id,outcome] of Object.entries(controlOutcomes)){
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=192;const ctx=canvas.getContext('2d');
  if(ctx){ctx.fillStyle=outcome.kind==='applied'?'#163f37':'#4f3d13';ctx.fillRect(0,0,1024,192);ctx.strokeStyle=outcome.kind==='applied'?'#8fe3b4':'#f6cf68';ctx.lineWidth=8;ctx.strokeRect(4,4,1016,184);ctx.fillStyle='#ffffff';ctx.font='bold 39px sans-serif';ctx.textAlign='center';const lines=outcome.sign[tr?0:1].split(' · ');lines.forEach((text,i)=>ctx.fillText(text,512,74+i*65));}
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
  const card=new T.Sprite(new T.SpriteMaterial({map:texture,depthTest:true}));card.name='control-status-'+id;card.position.fromArray(anchors[id]);card.scale.set(3.5,.66,1);card.visible=false;card.userData.controlKind=outcome.kind;group.add(card);cards.set(id,card);
 }
 const perimeter=new T.Mesh(new T.RingGeometry(2.05,2.16,48),new T.MeshBasicMaterial({color:'#e9b43b',side:T.DoubleSide}));perimeter.rotation.x=-Math.PI/2;perimeter.position.set(22,.195,-20);perimeter.name='isolation-request-perimeter';perimeter.userData.inspectionId='leak';perimeter.visible=false;group.add(perimeter);
 let previous='';
 return { sync(ids:string[]){const signature=[...ids].sort().join('|');if(signature===previous)return;previous=signature;const completed=new Set(ids);upper.apply(completed);for(const [id,card]of cards)card.visible=completed.has(id);perimeter.visible=completed.has('leak');group.userData.completed=[...ids];} };
}
