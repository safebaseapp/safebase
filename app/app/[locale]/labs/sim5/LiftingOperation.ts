/* eslint-disable @typescript-eslint/no-explicit-any -- The site supplies its pinned Three runtime. */
/** Original procedural mobile crane and static balanced basket-sling lift.
 * All dimensions are metres. This is an HSE visual scenario, not a load chart
 * or a rated rigging design. No external model or vendor marks are embedded.
 */
export function createLiftingOperation(T: any, tr: boolean) {
  const group = new T.Group();group.name = "sim5-lifting-operation";
  const v = (x: number, y: number, z: number) => new T.Vector3(x,y,z);
  const mat = (color: string, metalness = .25, roughness = .65) => new T.MeshStandardMaterial({color,metalness,roughness});
  const yellow=mat("#dba82e",.35,.48),steel=mat("#394651",.7,.52),chrome=mat("#c0c7ca",.8,.25),black=mat("#19242c",.1,.8),rubber=mat("#1d2227",0,.95),white=mat("#e5e5d8",.15,.6),orange=mat("#ed7631",0,.9);
  const glass=new T.MeshPhysicalMaterial({color:"#1f5263",metalness:.15,roughness:.25,transparent:true,opacity:.86});
  const add=(name: string,geometry: any,material: any,p: any)=>{
    const mesh=new T.Mesh(geometry,material);mesh.name=name;mesh.position.copy(p);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;
  };
  const box=(name: string,p: any,w: number,h: number,d: number,m=yellow)=>add(name,new T.BoxGeometry(w,h,d),m,p);
  const beam=(name: string,a: any,b: any,w: number,d: number,m=yellow)=>{
    const mesh=box(name,a.clone().add(b).multiplyScalar(.5),w,a.distanceTo(b),d,m);
    mesh.quaternion.setFromUnitVectors(v(0,1,0),b.clone().sub(a).normalize());return mesh;
  };
  const cylinder=(name: string,a: any,b: any,r: number,m=steel)=>{
    const mesh=add(name,new T.CylinderGeometry(r,r,a.distanceTo(b),20),m,a.clone().add(b).multiplyScalar(.5));
    mesh.quaternion.setFromUnitVectors(v(0,1,0),b.clone().sub(a).normalize());return mesh;
  };
  const line=(name: string,points: any[],r: number,m=black)=>add(name,new T.TubeGeometry(new T.CatmullRomCurve3(points),64,r,10,false),m,v(0,0,0));
  const label=(name: string,texts: string[],p: any,w: number,h: number,rotation=0,bg="#e8b32e",fg="#18232c")=>{
    const canvas=document.createElement("canvas");canvas.width=768;canvas.height=256;
    const ctx=canvas.getContext("2d");
    if(ctx){ctx.fillStyle=bg;ctx.fillRect(0,0,768,256);ctx.fillStyle=fg;ctx.textAlign="center";ctx.font="bold 54px Arial";texts.forEach((text,i)=>ctx.fillText(text,384,78+i*76));}
    const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
    const mesh=add(name,new T.PlaneGeometry(w,h),new T.MeshStandardMaterial({map:texture,roughness:.9,side:T.DoubleSide}),p);mesh.rotation.y=rotation;return mesh;
  };
  // Dedicated pad in the open front yard, separate from the service road.
  box("lifting-pad",v(2.6,-.11,0),20.5,.22,16,mat("#8d9694",0,.95));
  box("crane-chassis",v(0,1.0,0),2.6,.48,9.6,steel);
  box("crane-deck",v(0,1.33,.1),2.9,.19,9.8,yellow);
  for(const x of [-1.36,1.36]){
    for(const z of [-3.45,-1.25,1.25,3.45]){
      const wheel=add("crane-tire",new T.CylinderGeometry(.57,.57,.34,32),rubber,v(x,.65,z));wheel.rotation.z=Math.PI/2;
      const hub=add("wheel-hub",new T.CylinderGeometry(.29,.29,.36,24),steel,v(x,.65,z));hub.rotation.z=Math.PI/2;
      for(let i=0;i<8;i++){
        const a=i*Math.PI/4;const bolt=add("wheel-lug",new T.SphereGeometry(.025,6,4),chrome,v(x+Math.sign(x)*.185,.65+Math.sin(a)*.21,z+Math.cos(a)*.21));bolt.scale.x=.45;
      }
    }
    box("side-step",v(x,1.0,-4.25),.24,.10,.7,black);
    box("deck-rail",v(x,1.68,2.1),.055,.055,3.3,steel);
    for(const z of [.5,3.6])box("deck-stanchion",v(x,1.50,z),.045,.35,.045,steel);
  }
  // Driver cabin, glazing, pillars, mirrors, lamps and radiator.
  box("driver-cab",v(0,1.98,-3.95),2.5,1.55,1.8,yellow);
  box("driver-windscreen",v(0,2.18,-4.86),2.19,.78,.018,glass);
  box("cab-roof",v(0,2.82,-3.96),2.58,.12,1.86,white);
  for(const x of [-1.26,1.26]){
    box("driver-side-window",v(x,2.23,-4.0),.018,.75,1.25,glass);
    box("door-handle",v(x+Math.sign(x)*.015,1.74,-3.45),.025,.04,.22,chrome);
    beam("mirror-arm",v(x,2.4,-4.6),v(x+Math.sign(x)*.3,2.3,-4.8),.035,.035,black);
    box("mirror",v(x+Math.sign(x)*.3,2.24,-4.8),.12,.24,.08,black);
  }
  box("front-bumper",v(0,1.03,-4.95),2.73,.22,.16,white);
  box("radiator-grille",v(0,1.62,-4.87),1.3,.32,.025,black);
  for(const x of [-.92,.92])box("headlamp",v(x,1.35,-4.88),.36,.18,.035,white);
  for(const x of [-.83,.83]){
    const beacon=add("amber-beacon",new T.CylinderGeometry(.10,.10,.14,16),orange,v(x,2.95,-3.8));beacon.material=mat("#f6a719",0,.24);
  }
  // Four independently supported, fully extended telescopic outriggers.
  const feet:any[]=[];
  for(const z of [-3.1,3.1])for(const sign of [-1,1]){
    beam("outrigger-outer",v(0,.98,z),v(sign*3.0,.98,z),.32,.36,yellow);
    beam("outrigger-extension",v(sign*2.9,.98,z),v(sign*4.6,.98,z),.23,.25,steel);
    const foot=v(sign*4.6,0,z);feet.push(foot);
    box("outrigger-mat",foot.clone().add(v(0,.045,0)),1.05,.09,1.05,mat("#705b3e",0,.96));
    cylinder("outrigger-jack",foot.clone().add(v(0,.10,0)),foot.clone().add(v(0,1.02,0)),.12,chrome);
    cylinder("outrigger-jack-sleeve",foot.clone().add(v(0,.65,0)),foot.clone().add(v(0,1.15,0)),.19,yellow);
    cylinder("outrigger-shoe",foot.clone().add(v(0,.09,0)),foot.clone().add(v(0,.16,0)),.28,steel);
    label("outrigger-stripes",["////"],foot.clone().add(v(0,1.02,-.185)),.46,.18,Math.PI);
  }
  add("slew-ring",new T.CylinderGeometry(1.08,1.08,.27,40),steel,v(0,1.60,0));
  box("slew-body",v(-.45,1.99,0),3.3,.53,2.45,yellow);
  box("counterweight",v(-1.95,2.0,0),1.03,.93,2.7,steel);
  for(const y of [1.73,1.99,2.25])box("counterweight-layers",v(-2.48,y,0),.03,.035,2.58,black);
  label("crane-mark",["SERNEM","MOBILE CRANE"],v(-.9,2.0,1.24),1.8,.48);
  box("operator-cab",v(.25,2.32,-1.16),1.6,1.35,1.0,yellow);
  box("operator-windscreen",v(1.06,2.55,-1.16),.018,.82,.85,glass);
  box("operator-side-window",v(.25,2.55,-1.67),1.32,.82,.018,glass);
  box("operator-roof",v(.25,3.05,-1.16),1.68,.11,1.08,white);
  // Nested telescopic stages share one measured boom centreline.
  const pivot=v(0,2.40,0),tip=v(7.2,12.8,0),boomDirection=tip.clone().sub(pivot).normalize();
  const boomLength=pivot.distanceTo(tip),at=(distance:number)=>pivot.clone().addScaledVector(boomDirection,distance);
  const sections=[[0,4.5,.79,.73],[3.9,7.8,.64,.59],[7.2,10.7,.49,.46],[10.1,boomLength,.35,.34]];
  for(let i=0;i<sections.length;i++){
    const [start,end,w,d]=sections[i];beam(`boom-stage-${i+1}`,at(start),at(end),w,d,i===3?steel:yellow);
    beam("boom-wear-collar",at(Math.max(start,end-.12)),at(end),w+.06,d+.06,black);
  }
  cylinder("boom-hinge",v(0,2.4,-.62),v(0,2.4,.62),.19,steel);
  const ramBase=v(1.05,1.84,0),ramEnd=at(3.7),ramMid=ramBase.clone().lerp(ramEnd,.62);
  cylinder("luffing-cylinder",ramBase,ramMid,.23,yellow);cylinder("luffing-rod",ramMid,ramEnd,.135,chrome);
  cylinder("ram-pin",ramEnd.clone().add(v(0,0,-.42)),ramEnd.clone().add(v(0,0,.42)),.09,steel);
  // Winch, running rope, head sheave and two vertical falls into the block.
  const winch=v(-1.15,2.45,.1);
  cylinder("hoist-drum",winch.clone().add(v(0,0,-.48)),winch.clone().add(v(0,0,.48)),.32,steel);
  const headCentre=tip.clone().add(v(-.29,0,0));
  for(const z of [-.14,.14]){
    line("boom-running-rope",[winch.clone().add(v(0,.29,z)),at(1).add(v(-.35,.25,z)),headCentre.clone().add(v(0,.29,z))],.018,black);
    const wrap=[];
    for(let i=0;i<=16;i++){const angle=Math.PI/2-i*Math.PI/32;wrap.push(headCentre.clone().add(v(.29*Math.cos(angle),.29*Math.sin(angle),z)));}
    line("head-reeving",wrap,.018,black);
  }
  const sheave=add("boom-head-sheave",new T.CylinderGeometry(.29,.29,.38,32),steel,headCentre);sheave.rotation.x=Math.PI/2;
  const block=v(7.2,5.62,0),ropeEnds:any[]=[];
  for(const z of [-.14,.14]){
    const top=tip.clone().add(v(0,0,z)),bottom=block.clone().add(v(0,.28,z));
    cylinder("vertical-hoist-rope",top,bottom,.018,black);ropeEnds.push([top,bottom]);
  }
  box("hook-block",block,.43,.56,.49,yellow);
  for(const z of [-.26,.26]){
    box("block-cheek",block.clone().add(v(0,0,z)),.49,.55,.035,steel);
    const axle=add("block-axle",new T.CylinderGeometry(.085,.085,.032,20),chrome,block.clone().add(v(0,0,z+Math.sign(z)*.025)));axle.rotation.x=Math.PI/2;
  }
  label("block-warning",["///"],block.clone().add(v(.222,0,0)),.42,.22,Math.PI/2);
  cylinder("hook-swivel",v(7.2,5.34,0),v(7.2,5.18,0),.065,chrome);
  const hookPoints=[v(7.2,5.18,0),v(7.04,5.10,0),v(7.01,4.94,0),v(7.12,4.83,0),v(7.28,4.85,0),v(7.39,4.99,0)];
  line("load-hook",hookPoints,.048,chrome);
  cylinder("hook-safety-latch",hookPoints[0],hookPoints[hookPoints.length-1],.012,steel);
  const master=v(7.2,4.66,0),masterBottom=v(7.2,4.44,0);
  const link=add("master-link",new T.TorusGeometry(.13,.022,12,40),orange,master);link.scale.y=1.55;link.rotation.y=Math.PI/2;
  // Open steel pipe: annular end faces and true inner wall, not solid caps.
  const load=v(7.2,2.60,0),radius=.34,inner=.305,length=6.0;
  const pipeProfile=[new T.Vector2(inner,-length/2),new T.Vector2(radius,-length/2),new T.Vector2(radius,length/2),new T.Vector2(inner,length/2),new T.Vector2(inner,-length/2)];
  const pipe=add("lifted-pipe",new T.LatheGeometry(pipeProfile,64),mat("#71838b",.72,.52),load);pipe.rotation.x=Math.PI/2;
  for(const z of [-2.99,2.99]){
    const ring=add("pipe-end-bevel",new T.TorusGeometry((radius+inner)/2,.018,8,64),chrome,load.clone().add(v(0,0,z)));
    ring.rotation.z=0;
  }
  const slingStations=[-1.8,1.8],slings:any[]=[];
  const ribbon=(points:any[])=>{
    const curve=new T.CurvePath(),positions:number[]=[],uvs:number[]=[],indices:number[]=[];
    for(let i=0;i<points.length-1;i++)curve.add(new T.LineCurve3(points[i],points[i+1]));
    const count=160;
    for(let i=0;i<=count;i++){
      const t=i/count,p=curve.getPoint(t),tangent=curve.getTangent(t).normalize();
      const across=v(0,0,1).addScaledVector(tangent,-tangent.z).normalize().multiplyScalar(.05);
      positions.push(...p.clone().sub(across).toArray(),...p.clone().add(across).toArray());uvs.push(0,t*8,1,t*8);
      if(i<count){const j=i*2;indices.push(j,j+1,j+2,j+1,j+3,j+2);}
    }
    const geometry=new T.BufferGeometry();geometry.setAttribute("position",new T.Float32BufferAttribute(positions,3));geometry.setAttribute("uv",new T.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);geometry.computeVertexNormals();
    const m=orange.clone();m.side=T.DoubleSide;
    return {mesh:add("basket-sling",geometry,m,v(0,0,0)),curve,points};
  };
  for(const z of slingStations){
    const points=[masterBottom.clone(),v(load.x-radius-.003,load.y,z)];
    // The wrap sits on the underside of the pipe; its limbs converge on the
    // same master link. Equal stations straddle the centre of gravity.
    for(let i=1;i<=24;i++){const angle=Math.PI+i*Math.PI/24;points.push(v(load.x+(radius+.003)*Math.cos(angle),load.y+(radius+.003)*Math.sin(angle),z));}
    points.push(masterBottom.clone());
    const sling=ribbon(points);slings.push(sling);
  }
  // No lift animation that could break the contact constraints: all rigging
  // is modelled in a single, balanced static load case.
  const zone={minX:-6.2,maxX:11.2,minZ:-6.2,maxZ:6.2};
  const corners=[v(zone.minX,0,zone.minZ),v(zone.maxX,0,zone.minZ),v(zone.maxX,0,zone.maxZ),v(zone.minX,0,zone.maxZ)];
  for(let i=0;i<4;i++){
    const a=corners[i],b=corners[(i+1)%4];
    beam("exclusion-ground-line",a.clone().add(v(0,.012,0)),b.clone().add(v(0,.012,0)),.085,.026,yellow);
    for(let k=0;k<=4;k++){
      const p=a.clone().lerp(b,k/4);
      add("barrier-foot",new T.CylinderGeometry(.22,.24,.08,12),black,p.clone().add(v(0,.04,0)));
      cylinder("barrier-post",p.clone().add(v(0,.08,0)),p.clone().add(v(0,.95,0)),.035,orange);
    }
    beam("exclusion-tape",a.clone().add(v(0,.87,0)),b.clone().add(v(0,.87,0)),.055,.012,orange);
  }
  const sign=v(11.2,1.35,1.4);
  for(const z of [sign.z-.62,sign.z+.62])cylinder("sign-post",v(sign.x,0,z),v(sign.x,1.7,z),.035,steel);
  label("lifting-warning",tr?["ASKIDAKİ YÜK","ALANA GİRME"]:["SUSPENDED LOAD","KEEP OUT"],sign,1.65,.70,Math.PI/2);
  label("lifting-front-warning",tr?["KALDIRMA ALANI","GİRİŞ YASAK"]:["LIFTING ZONE","NO ENTRY"],v(2.2,1.15,-6.21),2.1,.7,Math.PI);
  group.traverse((mesh:any)=>{if(mesh.isMesh)mesh.userData.inspectionId="lifting";});
  const slingLength=Math.hypot(masterBottom.y-load.y,1.8,radius+.003);
  const diagnostics={pivot:pivot.toArray(),boomTip:tip.toArray(),boomLength,boomAngleDegrees:T.MathUtils.radToDeg(Math.atan2(tip.y-pivot.y,tip.x-pivot.x)),
    hookBlock:block.toArray(),hookPoints:hookPoints.map((p:any)=>p.toArray()),master:master.toArray(),masterBottom:masterBottom.toArray(),
    load:load.toArray(),pipeLength:length,pipeRadius:radius,pipeInnerRadius:inner,slingStations,
    slingAngleDegrees:T.MathUtils.radToDeg(Math.asin((masterBottom.y-load.y)/slingLength)),
    slingEndpoints:slings.map(s=>[s.curve.getPoint(0).toArray(),s.curve.getPoint(1).toArray()]),
    slingCurves:slings.map(s=>s.points.map((p:any)=>p.toArray())),feet:feet.map((p:any)=>p.toArray()),
    ropeEnds:ropeEnds.map(ends=>ends.map((p:any)=>p.toArray())),zone};
  group.userData.diagnostics=diagnostics;
  return {group,diagnostics,inspectionPoint:load.clone().setY(0)};
}
