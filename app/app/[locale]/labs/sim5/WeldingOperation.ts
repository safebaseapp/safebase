/* eslint-disable @typescript-eslint/no-explicit-any -- Three is loaded by the site's pinned runtime module. */
/** Static, geometry-derived pose for the CC BY 4.0 grewe.juergen welder.
 * Source GLB is immutable. Mesh transforms are baked before posing; equipment
 * coordinates must never be confused with the human's coordinate frame.
 */
export function createWeldingOperation(THREE: any, source: any, tr: boolean) {
  const group = new THREE.Group();
  group.name = "sim5-welding-operation";
  source.updateMatrixWorld(true);
  const byName = new Map<string, any>();
  source.traverse((mesh: any) => { if (mesh.isMesh) byName.set(mesh.name, mesh); });
  const required = (name: string, material: string) => {
    const mesh = byName.get(name);
    if (!mesh || mesh.material?.name !== material) {
      throw new Error(`Welder asset changed: missing ${name} / ${material}`);
    }
    return mesh;
  };
  const face = required("Object_6", "old_caucasian_male_detailed_76a85de9");
  const eyes = required("Object_8", "Eye_brown_76a85de9");
  const nozzle = required("Object_711", "52722df2-7f7f-480c-b920-db193664ce58_661d30c5_c151e20c_51c14b96_a48b81cb");
  const leadEnd = required("Object_715", "UserDefined_b7308142_c151e20c_51c14b96_a48b81cb");
  const outlet = required("Object_225", "UserDefined_b7308142_c151e20c_51c14b96_a48b81cb");
  const lens = required("Object_763", "966__6de33994_c151e20c_51c14b96_3e3ad33f");
  const shield = required("Object_771", "970__6de33994_c151e20c_51c14b96_3e3ad33f");
  const bounds = (mesh: any) => new THREE.Box3().setFromObject(mesh, true);
  const center = (mesh: any) => bounds(mesh).getCenter(new THREE.Vector3());
  const faceBox = bounds(face), eyeCenter = center(eyes);
  const forward = eyeCenter.clone().sub(center(face)).setY(0).normalize();
  // The source asset has a level -Z working frame. Fail visibly on a different
  // asset instead of silently reintroducing guessed world-space placements.
  if (forward.z > -.95) throw new Error("Welder working frame no longer matches the inspected asset");
  forward.set(0, 0, -1);
  const humanNames = new Set(["Object_6", "Object_8", "Object_10", "Object_12", "Object_14", "Object_15", "Object_17", "Object_18", "Object_19", "Object_20", "Object_22", "Object_24", "Object_25", "Object_27"]);
  const headNames = new Set(["Object_6", "Object_8", "Object_12", "Object_22", "Object_24", "Object_25"]);
  const shieldNames = new Set(["Object_763", "Object_765", "Object_767", "Object_769", "Object_771"]);
  const torchNames = new Set(["Object_707", "Object_709", "Object_711", "Object_713"]);
  const humanBox = new THREE.Box3();
  for (const name of humanNames) humanBox.union(bounds(byName.get(name)));
  const floor = new THREE.Box3().setFromObject(source, true).min.y;
  const height = humanBox.max.y - humanBox.min.y;
  const hip = new THREE.Vector3(center(face).x, humanBox.min.y + height * .53, 0);
  // A smooth hip bend preserves the feet and lower legs, while hands, gloves,
  // torch and upper torso undergo exactly the same rigid 22-degree rotation.
  const lean = THREE.MathUtils.degToRad(22);
  const posed = (point: any) => {
    const p = point.clone();
    const blend = THREE.MathUtils.smoothstep(p.y, hip.y - .17, hip.y + .20);
    p.sub(hip).applyAxisAngle(new THREE.Vector3(1, 0, 0), -lean * blend).add(hip);
    return p;
  };
  const vertices = (mesh: any) => {
    const a = mesh.geometry.attributes.position, points = [];
    for (let i = 0; i < a.count; i++) points.push(new THREE.Vector3().fromBufferAttribute(a, i).applyMatrix4(mesh.matrixWorld));
    return points;
  };
  // Principal axis of the actual metal nozzle, then the centroid of its end
  // ring. This is independent of mesh origins, assembly bounds or workX/Z.
  const nozzlePoints = vertices(nozzle);
  const mean = nozzlePoints.reduce((a: any, p: any) => a.add(p), new THREE.Vector3()).divideScalar(nozzlePoints.length);
  const nozzleAxis = forward.clone();
  for (let i = 0; i < 24; i++) {
    const next = new THREE.Vector3();
    for (const p of nozzlePoints) { const q = p.clone().sub(mean); next.addScaledVector(q, q.dot(nozzleAxis)); }
    nozzleAxis.copy(next.normalize());
  }
  let extent = -Infinity;
  for (const p of nozzlePoints) extent = Math.max(extent, p.dot(nozzleAxis));
  const rim = nozzlePoints.filter((p: any) => p.dot(nozzleAxis) > extent - .001);
  const rawTip = rim.reduce((a: any, p: any) => a.add(p), new THREE.Vector3()).divideScalar(rim.length);
  const tip = posed(rawTip), axis = nozzleAxis.clone().applyAxisAngle(new THREE.Vector3(1, 0, 0), -lean).normalize();
  const contact = tip.clone().addScaledVector(axis, .012); // 12 mm consumable wire / nozzle standoff.
  const leadSocket = posed(center(leadEnd));
  const machineSocket = center(outlet);
  const eyePosed = posed(eyeCenter);
  const neck = posed(new THREE.Vector3(center(face).x, faceBox.min.y, center(face).z));
  const gazeAngle = Math.atan2(eyePosed.y - contact.y, Math.hypot(eyePosed.x - contact.x, eyePosed.z - contact.z));
  const headTilt = Math.max(0, gazeAngle - lean);
  const headPose = (p: any) => posed(p).sub(neck).applyAxisAngle(new THREE.Vector3(1, 0, 0), -headTilt).add(neck);
  // Align the source shield's viewing window with the actual eyes, then move
  // head, hardhat, hair and shield together. Never add a second face-sized box.
  const shieldLift = eyeCenter.y - center(lens).y;
  const materialCopies = new Map<any, any>();
  const materialCopy = (original: any) => {
    if (!materialCopies.has(original)) {
      const m = original.clone();
      if (m.map) m.map.colorSpace = THREE.SRGBColorSpace;
      if (m.name === lens.material.name) { m.color.set("#102c27"); m.metalness = .25; m.roughness = .19; }
      materialCopies.set(original, m);
    }
    return materialCopies.get(original);
  };
  for (const [name, original] of byName) {
    // Replace only the two disconnected source lead sections and its degenerate
    // end marker. Keep the power source, hose reels and gas equipment intact.
    if (["Object_4", "Object_705", "Object_715"].includes(name)) continue;
    const geometry = original.geometry.clone().applyMatrix4(original.matrixWorld);
    const a = geometry.attributes.position;
    const isHead = headNames.has(name), isShield = shieldNames.has(name);
    const deform = humanNames.has(name) || torchNames.has(name) || isShield;
    if (deform) {
      for (let i = 0; i < a.count; i++) {
        let p = new THREE.Vector3().fromBufferAttribute(a, i);
        if (isShield) { p.y += shieldLift; p.z += .07; }
        p = isHead || isShield ? headPose(p) : posed(p);
        a.setXYZ(i, p.x, p.y, p.z);
      }
      a.needsUpdate = true;
      // Source normals are normalized Int8. Accumulating small face areas in
      // that buffer rounds them to zero; rebuild into a Float32 attribute.
      geometry.deleteAttribute("normal");
      geometry.computeVertexNormals();
    }
    geometry.computeBoundingBox();geometry.computeBoundingSphere();
    const mesh = new THREE.Mesh(geometry, Array.isArray(original.material) ? original.material.map(materialCopy) : materialCopy(original.material));
    mesh.name = name;mesh.castShadow = true;mesh.receiveShadow = true;
    mesh.userData.part = isShield ? "face-shield" : isHead ? "head" : torchNames.has(name) ? "torch" : humanNames.has(name) ? "worker" : "power-source";
    group.add(mesh);
  }
  const metal = (color: string, metalness = .45, roughness = .6) => new THREE.MeshStandardMaterial({color, metalness, roughness});
  const steel = metal("#5c6c76"), dark = metal("#242e34"), rubber = metal("#171b20", 0, .94);
  const add = (name: string, geometry: any, mat: any, position: any) => {
    const mesh = new THREE.Mesh(geometry, mat);mesh.name = name;mesh.position.copy(position);mesh.castShadow = true;mesh.receiveShadow = true;group.add(mesh);return mesh;
  };
  const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  const box = (name: string, position: any, w: number, h: number, d: number, mat = steel) => add(name, new THREE.BoxGeometry(w,h,d),mat,position);
  const tube = (name: string, points: any[], radius: number, mat = rubber) => {
    const spline = new THREE.CatmullRomCurve3(points, false, "centripetal");
    // A free spline can dip beneath the slab between floor control points.
    // Bound the entire sampled centreline, not only its control points.
    const path = new THREE.Curve();
    path.getPoint = (t: number, target = new THREE.Vector3()) => {
      spline.getPoint(t, target);target.y = Math.max(floor + radius, target.y);return target;
    };
    return add(name,new THREE.TubeGeometry(path,128,radius,10,false),mat,v(0,0,0));
  };
  const segment = (name: string, a: any, b: any, radius: number, mat = steel) => {
    const mesh=add(name,new THREE.CylinderGeometry(radius,radius,a.distanceTo(b),12),mat,a.clone().add(b).multiplyScalar(.5));
    mesh.quaternion.setFromUnitVectors(v(0,1,0),b.clone().sub(a).normalize());return mesh;
  };
  const top = contact.y - .035;
  const benchCenter = contact.clone().add(v(0,0,-.075));
  box("bench-top",v(benchCenter.x,top-.025,benchCenter.z),1.15,.05,.72);
  for (const dx of [-.49,.49]) for (const dz of [-.28,.28]) {
    box("bench-leg",v(benchCenter.x+dx,(top-.05+floor)/2,benchCenter.z+dz),.055,top-.05-floor,.055,dark);
    box("bench-foot",v(benchCenter.x+dx,floor+.012,benchCenter.z+dz),.12,.024,.12,dark);
  }
  for (const dz of [-.28,.28]) box("bench-brace",v(benchCenter.x,floor+.24,benchCenter.z+dz),1.03,.045,.045,dark);
  for (const dx of [-.49,.49]) box("bench-brace",v(benchCenter.x+dx,floor+.24,benchCenter.z),.045,.045,.61,dark);
  // The wire ends at the measured inner corner of a T fillet coupon. Both
  // plates and the arc share this reference, so no floating contact is possible.
  box("coupon-base",v(contact.x,contact.y-.0175,contact.z-.07),.49,.035,.32);
  box("coupon-upright",v(contact.x,contact.y+.085,contact.z-.0125),.49,.17,.025);
  segment("consumable-wire",tip,contact,.0018,metal("#b6bac0",.8,.3));
  for (const dx of [-.20,.20]) {
    box("coupon-clamp",v(contact.x+dx,contact.y+.01,contact.z+.06),.045,.055,.075,dark);
  }
  // One continuous lead from the imported machine's real connector to the
  // imported grip's real cable socket. Route around the outside of the boots.
  const cablePoints = [machineSocket, machineSocket.clone().add(v(.13,-.06,.03)),
    v(.46,floor+.035,1.30),v(.56,floor+.035,.40),v(.48,floor+.035,-.14),
    v(.28,floor+.17,-.30),leadSocket.clone().add(v(.06,-.14,.08)),leadSocket];
  const lead=tube("torch-lead",cablePoints,.012);
  const strainEnd=leadSocket.clone().add(v(.025,-.065,.03));
  segment("torch-strain-relief",leadSocket,strainEnd,.019,rubber);
  // A distinct work-return lead closes the electrical path at a bench clamp.
  const returnSocket = center(byName.get("Object_97"));
  const returnClamp = v(benchCenter.x+.52,top+.015,benchCenter.z+.22);
  const returnPoints=[returnSocket,returnSocket.clone().add(v(.14,-.05,.08)),v(.77,floor+.027,1.1),v(.78,floor+.027,-.2),returnClamp.clone().add(v(.03,-.16,.05)),returnClamp];
  tube("work-return-lead",returnPoints,.010);
  box("return-clamp",returnClamp,.075,.075,.10,metal("#acac9e",.7));
  // Source shield is supported at the helmet sides rather than floating.
  const shellBox=bounds(shield);
  for (const sign of [-1,1]) {
    const x=sign<0?shellBox.min.x:shellBox.max.x;
    segment("shield-headband",headPose(v(x,eyeCenter.y+.045,center(face).z)),headPose(v(x,eyeCenter.y+.045,shellBox.max.z+.07)),.009,dark);
  }
  const arc=add("weld-arc",new THREE.SphereGeometry(.014,12,8),new THREE.MeshBasicMaterial({color:0xe6f7ff}),contact);
  const light=new THREE.PointLight(0xbce6ff,1.25,1.6,2);light.name="weld-light";light.position.copy(contact);group.add(light);
  const sparks:any[]=[];
  const sparkMat=new THREE.MeshBasicMaterial({color:0xffc261});
  for(let i=0;i<16;i++)sparks.push(add("contact-spark",new THREE.SphereGeometry(.0025,5,4),sparkMat,contact));
  // A grounded 6 kg extinguisher, away from the lead route and readable from
  // the approach side. All details are procedural; no additional asset license.
  const ex=v(-.92,floor,-.45),red=metal("#b82020",.23,.38);
  const profile=[[.085,0],[.106,.018],[.11,.06],[.11,.42],[.10,.47],[.058,.505],[.025,.518]].map(([r,y])=>new THREE.Vector2(r,y));
  const cylinder=add("extinguisher-body",new THREE.LatheGeometry(profile,40),red,ex);
  box("extinguisher-base",ex.clone().add(v(0,.012,0)),.19,.024,.19,rubber);
  segment("extinguisher-neck",ex.clone().add(v(0,.51,0)),ex.clone().add(v(0,.55,0)),.026,dark);
  box("extinguisher-handle",ex.clone().add(v(.03,.575,0)),.19,.025,.04,dark);
  box("extinguisher-trigger",ex.clone().add(v(.025,.605,0)),.16,.018,.033,dark);
  const pin=add("extinguisher-pin",new THREE.TorusGeometry(.023,.004,8,24),metal("#bca759",.75),ex.clone().add(v(-.052,.57,-.015)));
  pin.rotation.y=Math.PI/2;
  const gaugeCenter=ex.clone().add(v(0,.55,-.058));
  const gauge=add("extinguisher-gauge",new THREE.CylinderGeometry(.027,.027,.014,24),metal("#e6e8db",.1),gaugeCenter);gauge.rotation.x=Math.PI/2;
  const green=add("gauge-green-zone",new THREE.RingGeometry(.015,.022,18,1,.4,2.2),metal("#3d9258",0),gaugeCenter.clone().add(v(0,0,-.008)));
  green.rotation.y=Math.PI;
  segment("gauge-needle",gaugeCenter.clone().add(v(0,0,-.010)),gaugeCenter.clone().add(v(.012,.013,-.010)),.0015,dark);
  const exHosePoints=[ex.clone().add(v(.055,.55,0)),ex.clone().add(v(.15,.49,-.015)),ex.clone().add(v(.15,.23,-.015)),ex.clone().add(v(.12,.10,-.02))];
  tube("extinguisher-hose",exHosePoints,.010);
  segment("extinguisher-nozzle",exHosePoints[3],exHosePoints[3].clone().add(v(0,-.075,0)),.018,dark);
  const labelCanvas=document.createElement("canvas");labelCanvas.width=256;labelCanvas.height=384;
  const ctx=labelCanvas.getContext("2d");
  if(ctx){ctx.fillStyle="#f1efe5";ctx.fillRect(0,0,256,384);ctx.fillStyle="#ad2323";ctx.fillRect(0,0,256,82);ctx.fillStyle="white";ctx.textAlign="center";ctx.font="bold 34px Arial";ctx.fillText(tr?"YANGIN":"FIRE",128,52);ctx.fillStyle="#172529";ctx.font="bold 46px Arial";ctx.fillText("ABC",128,154);ctx.font="30px Arial";ctx.fillText("6 kg",128,205);ctx.font="21px Arial";ctx.fillText(tr?"PİMİ ÇEK":"PULL PIN",128,264);ctx.fillText(tr?"HEDEFLE · SIK":"AIM · SQUEEZE",128,300);ctx.fillText(tr?"TARA":"SWEEP",128,336);}
  const labelTexture=new THREE.CanvasTexture(labelCanvas);labelTexture.colorSpace=THREE.SRGBColorSpace;
  const label=add("extinguisher-label",new THREE.CylinderGeometry(.111,.111,.26,20,1,true,Math.PI-.63,1.26),new THREE.MeshStandardMaterial({map:labelTexture,roughness:.7,side:THREE.DoubleSide}),ex.clone().add(v(0,.275,0)));
  label.rotation.y=0;
  group.position.y=-floor;
  group.traverse((mesh:any)=>{if(mesh.isMesh)mesh.userData.inspectionId="hotwork";});
  const update=(seconds:number)=>{
    const active=Math.sin(seconds*9)>-.42;
    arc.visible=active;light.intensity=active?1.25+.25*Math.sin(seconds*35):0;
    for(let i=0;i<sparks.length;i++){
      const age=(seconds*1.8+i/sparks.length)%1,angle=i*2.399963;
      sparks[i].visible=active&&age<.8;
      sparks[i].position.copy(contact).add(v(Math.cos(angle)*.18*age,.24*age-.44*age*age,.05*age+Math.abs(Math.sin(angle))*.13*age));
    }
  };
  update(.1);
  const toArray=(p:any)=>p.toArray();
  const diagnostics={
    sourceHumanHeight:height,forward:toArray(forward),floor,
    leanDegrees:22,headTiltDegrees:THREE.MathUtils.radToDeg(headTilt),
    rawEye:toArray(eyeCenter),rawNozzleTip:toArray(rawTip),rawNozzleAxis:toArray(nozzleAxis),
    eye:toArray(headPose(eyeCenter)),tip:toArray(tip),contact:toArray(contact),
    leadSocket:toArray(leadSocket),machineSocket:toArray(machineSocket),
    leadStart:toArray(lead.geometry.parameters.path.getPoint(0)),leadEnd:toArray(lead.geometry.parameters.path.getPoint(1)),
    benchCenter:toArray(benchCenter),benchTop:top,
    extinguisherBase:toArray(ex),extinguisherBounds:new THREE.Box3().setFromObject(cylinder,true).min.toArray(),
    lensCenter:toArray(headPose(center(lens).add(v(0,shieldLift,.07)))),
    labelVisible:label.visible,
  };
  group.userData.diagnostics=diagnostics;
  return {group,update,diagnostics};
}
