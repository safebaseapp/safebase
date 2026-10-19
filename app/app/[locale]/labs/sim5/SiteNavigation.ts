/* eslint-disable @typescript-eslint/no-explicit-any -- pinned Three runtime */
/** Feet and camera are separate: camera smoothing must not change step eligibility. */
export function createSiteNavigation(T:any,scene:any,colliders:any[],boxes:any[],physical:any[]) {
 const down=new T.Raycaster(),body=new T.Raycaster();
 const ground:any[]=[];
 scene.updateMatrixWorld(true);
 scene.traverse((o:any)=>{if(o.isMesh&&o.visible&&!o.userData.inspectionId)ground.push(o)});
 let feet=.1;
 const eyeHeight=1.7, radius=.22, maxStep=.32;
 const normal=new T.Vector3();
 function floor(x:number,z:number,from:number){
  down.set(new T.Vector3(x,from+maxStep+.015,z),new T.Vector3(0,-1,0));down.near=0;down.far=maxStep*2+.04;
  for(const hit of down.intersectObjects(ground,false)){
   if(!hit.face)continue;
   normal.copy(hit.face.normal).transformDirection(hit.object.matrixWorld);
   if(normal.y>.72&&hit.point.y>=from-maxStep-.01)return hit.point.y;
  }
  return null;
 }
 function step(next:any,previous:any){
  const y=floor(next.x,next.z,feet);if(y===null)return false;
  const delta=next.clone().sub(previous).setY(0),distance=delta.length();if(distance<1e-6)return true;
  const capsule=new T.Box3(new T.Vector3(next.x-radius,y+.33,next.z-radius),new T.Vector3(next.x+radius,y+1.85,next.z+radius));
  if(physical.some((b:any)=>b.intersectsBox(capsule)))return false;
  const near=colliders.filter((_:any,i:number)=>{const b=boxes[i];return b.max.y>y+.35&&b.min.y<y+1.86&&b.max.x>Math.min(next.x,previous.x)-.5&&b.min.x<Math.max(next.x,previous.x)+.5&&b.max.z>Math.min(next.z,previous.z)-.5&&b.min.z<Math.max(next.z,previous.z)+.5});
  delta.normalize();const lateral=new T.Vector3(-delta.z,0,delta.x);
  for(const h of [.38,1,1.8])for(const side of [-radius,0,radius]){
   body.set(new T.Vector3(previous.x,Math.max(feet,y)+h,previous.z).addScaledVector(lateral,side),delta);body.near=0;body.far=distance+radius;
   if(body.intersectObjects(near,false).length)return false;
  }
  // A rising step must not lift the head through a low deck/pipe. Cast both
  // ways: imported floors may expose only one side of their material.
  body.near=0;body.far=1.5;
  body.set(new T.Vector3(next.x,y+.36,next.z),new T.Vector3(0,1,0));
  if(body.intersectObjects(near,false).length)return false;
  body.set(new T.Vector3(next.x,y+1.86,next.z),new T.Vector3(0,-1,0));
  if(body.intersectObjects(near,false).length)return false;
  feet=y;return true;
 }
 return {step,get feet(){return feet},get eyeHeight(){return eyeHeight},reset(){feet=.1},update(camera:any,dt:number){camera.position.y+=(feet+eyeHeight-camera.position.y)*(1-Math.exp(-18*dt));}};
}
