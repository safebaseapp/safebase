/**
 * SERNEM Labs 3D Safety Inspector — Package 1 standalone WebGL2 field renderer.
 * No external assets or dependencies: the first build cannot impact existing Labs.
 * Visuals are procedural training-environment placeholders, not approved hazard scenes.
 */
import { trainingHazards, type SafetyHazard } from "./hazards";

type V3 = [number, number, number];
type RGB = [number, number, number];
type Blocker = { x: number; z: number; width: number; depth: number };

const toRGB = (hex: number): RGB => [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const unit = (v: V3): V3 => { const l = Math.hypot(...v) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };

class SiteMesh {
  positions: number[] = [];
  normals: number[] = [];
  colors: number[] = [];
  blockers: Blocker[] = [];

  triangle(a: V3, b: V3, c: V3, normal: V3, rgb: RGB) {
    for (const v of [a, b, c]) {
      this.positions.push(...v);
      this.normals.push(...normal);
      this.colors.push(...rgb);
    }
  }

  quad(a: V3, b: V3, c: V3, d: V3, normal: V3, rgb: RGB) {
    this.triangle(a, b, c, normal, rgb);
    this.triangle(a, c, d, normal, rgb);
  }

  box(x: number, y: number, z: number, w: number, h: number, d: number, hex: number) {
    const [x0, x1] = [x - w / 2, x + w / 2], [y0, y1] = [y - h / 2, y + h / 2], [z0, z1] = [z - d / 2, z + d / 2];
    const p = (x: number, y: number, z: number): V3 => [x, y, z];
    const rgb = toRGB(hex);
    this.quad(p(x0,y0,z1),p(x1,y0,z1),p(x1,y1,z1),p(x0,y1,z1),[0,0,1],rgb);
    this.quad(p(x1,y0,z0),p(x0,y0,z0),p(x0,y1,z0),p(x1,y1,z0),[0,0,-1],rgb);
    this.quad(p(x1,y0,z1),p(x1,y0,z0),p(x1,y1,z0),p(x1,y1,z1),[1,0,0],rgb);
    this.quad(p(x0,y0,z0),p(x0,y0,z1),p(x0,y1,z1),p(x0,y1,z0),[-1,0,0],rgb);
    this.quad(p(x0,y1,z1),p(x1,y1,z1),p(x1,y1,z0),p(x0,y1,z0),[0,1,0],rgb);
    this.quad(p(x0,y0,z0),p(x1,y0,z0),p(x1,y0,z1),p(x0,y0,z1),[0,-1,0],rgb);
  }

  cylinder(a: V3, b: V3, radius: number, hex: number, segments = 12) {
    const axis = unit([b[0]-a[0],b[1]-a[1],b[2]-a[2]]);
    const base = Math.abs(axis[1]) < 0.94 ? [0,1,0] as V3 : [1,0,0] as V3;
    const u = unit(cross(axis,base));
    const v = cross(axis,u);
    const rgb=toRGB(hex), shadow=toRGB(hex===0xcdd7df?0xa5b2bd:hex);
    for(let i=0;i<segments;i++){
      const angle=i*2*Math.PI/segments, next=(i+1)*2*Math.PI/segments;
      const rad=(t:number):V3 => [Math.cos(t)*u[0]+Math.sin(t)*v[0],Math.cos(t)*u[1]+Math.sin(t)*v[1],Math.cos(t)*u[2]+Math.sin(t)*v[2]];
      const n1=rad(angle),n2=rad(next), normal=unit([n1[0]+n2[0],n1[1]+n2[1],n1[2]+n2[2]]);
      const o=(p:V3,n:V3):V3=>[p[0]+n[0]*radius,p[1]+n[1]*radius,p[2]+n[2]*radius];
      this.quad(o(a,n1),o(a,n2),o(b,n2),o(b,n1),normal,rgb);
      this.triangle(a,o(a,n2),o(a,n1),[-axis[0],-axis[1],-axis[2]],shadow);
      this.triangle(b,o(b,n1),o(b,n2),axis,shadow);
    }
  }

  solid(x:number,z:number,w:number,d:number) { this.blockers.push({x,z,width:w,depth:d}); }
}

/**
 * Fictional, purpose-built unsafe conditions.
 * Every hazard has physical scene evidence; these meshes are never reused from Spot the Hazard.
 * Geometry in Package 2 is indicative, not a photograph or a fully realistic asset.
 */
function addTrainingFindings(m: SiteMesh) {
  // (1) Emergency access route: two pallets block part of a marked gate.
  m.box(1.2,0.35,35,2.8,0.70,1.65,0xa17d4b);
  m.box(1.2,0.87,35,2.5,0.36,1.45,0x988f75);m.solid(1.2,35,2.8,1.65);
  for(const x of [0.25,1.1,1.95])m.box(x,0.99,35,0.15,0.12,1.1,0x5a4936);
  // (2) Loose electrical cable visibly crossing the center walkway.
  for(let n=0;n<13;n++){
    const x=-4.15+n*0.68, z=20+Math.sin(n*0.7)*0.24;
    m.cylinder([x,0.12,z],[x+0.65,0.12,20+Math.sin((n+1)*0.7)*0.24],0.09,0x19212a,8);
  }
  m.box(-4.3,0.3,20.4,0.55,0.60,0.55,0xe5ad56);
  // (3) Dark excavation inset. Three-sided edge rails leave a deliberately open approach.
  m.box(-19,0.018,-28,5.9,0.015,4.7,0x0a1725);
  m.box(-19,0.018,-28,4.6,0.012,3.6,0x162532);m.solid(-19,-28,5.9,4.7);
  for(const z of [-30.35,-25.65])m.box(-19,0.75,z,6.2,0.15,0.13,0xee993b);
  for(const z of [-30.35,-25.65])for(const x of [-22,-16])m.box(x,0.55,z,0.16,1.1,0.17,0xdbb766);
  m.box(-22,0.75,-28,0.14,0.18,4.9,0xee993b);
  // (4) One bay of the upper scaffold guardrail is absent; the adjacent rails remain.
  // The missing segment itself is created by omitting a rail in constructSite.
  for(const x of [-10.0,-4.0])m.cylinder([x,3.4,-6],[x,4.4,-6],0.07,0xb0c5d2,8);
  // (5) Small unsecured objects positioned on the top scaffold deck.
  for(const [x,z,w] of [[-4.8,-12,0.95],[-5.0,-12.4,0.42],[-4.65,-11.7,0.28]] as number[][]) {
    m.box(x,6.86,z,w,0.35,w*0.73,0xcf9859);
  }
  // (6) Unrestrained cylinder and exposed valve at the workshop approach.
  m.cylinder([1.5,0,17.5],[1.5,2.2,17.5],0.34,0x2d8a91,18);
  m.cylinder([1.5,2.2,17.5],[1.5,2.45,17.5],0.10,0xe0cfb7,12);
  m.box(1.5,2.42,17.5,0.52,0.06,0.10,0xdaa85f);m.solid(1.5,17.5,0.8,0.8);
  // (7) Hot work adjacent to fuel / combustibles, indicated by workbench and drums.
  m.box(-10,0.55,28,2.4,1.1,1.25,0x637b85);
  m.box(-10,1.2,28,2.8,0.18,1.45,0xc1b28c);m.solid(-10,28,2.6,1.5);
  m.cylinder([-8.0,0.03,27.45],[-8,1.15,27.45],0.42,0xc46b39,14);
  m.cylinder([-8.6,0.03,29.0],[-8.6,1.15,29.0],0.42,0x993f2b,14);
  m.box(-9.0,1.43,28.0,0.7,0.27,0.4,0x9ac0cc);
  // (8) Suspended load in open corridor: gantry, hook, cable, hanging object.
  for(const x of [15,22])m.box(x,5.0,28,0.65,10,0.65,0x91a7b2);
  m.box(18.5,10.1,28,8.0,0.6,0.75,0xbbcbd1);
  m.cylinder([18.4,9.85,28.1],[18.4,4.2,28.1],0.08,0x303f49,10);
  m.box(18.4,3.4,28.1,3.0,1.45,2.6,0xb88b4b);
  m.box(18.4,4.18,28.1,2.85,0.11,2.48,0x40596c);
  // (9) Plant vehicle on walkway, no separated pedestrian crossing.
  m.box(5,0.92,-2,2.9,1.45,3.7,0xc49b46);m.solid(5,-2,3.2,3.9);
  m.box(5,1.87,-2.55,2.4,1.1,1.7,0x40586b);
  for(const x of [3.52,6.48])for(const z of [-3.17,-0.88])m.cylinder([x,0.48,z],[x+0.1,0.48,z],0.48,0x1c2732,10);
  for(const x of [4.2,5.8])m.box(x,0.25,0.6,0.25,0.2,2.3,0x879ca4);
  // (10) Open electrical cabinet with visible panel interior.
  m.box(-26,1.42,3.4,1.6,2.5,0.55,0xb9bdaf);m.solid(-26,3.4,1.8,0.8);
  m.box(-26,1.5,3.08,1.35,2.25,0.10,0x243341);
  m.box(-24.98,1.5,2.7,0.12,2.27,1.05,0xd4b85d);
  for(const x of [-26.3,-26,-25.7])for(const y of [1.0,1.45,1.9])m.box(x,y,2.99,0.18,0.24,0.07,0x9c6a4a);
  // (11) Spill around pump skids, clearly dark and glossy compared with paving.
  m.box(-3,0.016,-23,5.2,0.025,2.4,0x121f24);
  m.box(-3.6,0.027,-23.5,4.2,0.023,1.9,0x273f48);
  m.box(-3,0.50,-23,1.95,0.99,1.4,0x789ba7);
  m.cylinder([-3,1.00,-23],[-1.7,1.00,-23],0.27,0xa4bac4,12);
  // (12) Cylindrical pipes stacked without chocks on vehicle access.
  m.solid(6,-27,2.6,3.0);
  for(const [x,y,z] of [[5.2,0.28,-27],[6.0,0.28,-27],[6.8,0.28,-27],[5.6,0.78,-27],[6.4,0.78,-27]] as number[][]){
    m.cylinder([x,y,z-1.45],[x,y,z+1.45],0.32,0x91a7b7,12);
  }
}

function constructSite() {
  const m = new SiteMesh();
  // Subtle concrete paving and asphalt walkways.
  m.box(0,-0.26,0,86,0.45,86,0x344454);
  m.box(0,-0.018,7,11,0.035,72,0x415668);
  for(let z=-39;z<=39;z+=5){ m.box(0,0.005,z,0.13,0.012,2.3,0xe1d39c); }
  // Wide construction joints rather than a dense artificial checkerboard.
  for(let x=-30;x<=30;x+=15)m.box(x,-0.023,0,0.025,0.009,77,0x3c4b56);
  for(let z=-30;z<=30;z+=15)m.box(0,-0.022,z,77,0.009,0.025,0x3c4b56);
  // Fenced compound perimeter with entrances at the south.
  for(const x of [-40,40]){
    for(let z=-40;z<=40;z+=3){ m.box(x,1.12,z,0.15,2.24,0.16,0x7f9fb0); }
    for(const y of [0.55,1.9])m.box(x,y,0,0.08,0.08,80,0x6e8799);
  }
  for(const z of [-40,40]){
    for(let x=-40;x<=40;x+=3){ if(z===40&&Math.abs(x)<5)continue; m.box(x,1.12,z,0.15,2.24,0.16,0x7f9fb0);}
    for(const y of [0.55,1.9]){ m.box(-22,y,z,36,0.08,0.08,0x6e8799);m.box(22,y,z,36,0.08,0.08,0x6e8799);}
  }
  // Real GLB refinery asset replaces the old procedural eastern tank and pipe rack.
  // Hazard evidence and its target positions are deliberately preserved.
  // Scaffolding training zone: decking, braces, toe boards, guardrails.
  const xa=[-16,-10,-4], za=[-18,-12,-6], levels=[0,3.3,6.6];
  for(const x of xa)for(const z of za){m.cylinder([x,0,z],[x,9.2,z],0.09,0xb0c5d2,10);m.solid(x,z,0.55,0.55);}
  for(const y of levels.slice(1)){
    for(let i=0;i<xa.length-1;i++)for(let j=0;j<za.length-1;j++){
      m.box((xa[i]+xa[i+1])/2,y,(za[j]+za[j+1])/2,5.85,0.2,5.85,0x98795c);
    }
    for(const z of za) {
      if (y===3.3 && z===-6) { m.cylinder([-16,y+1.05,z],[-10,y+1.05,z],0.058,0xb6d0db); }
      else m.cylinder([-16,y+1.05,z],[-4,y+1.05,z],0.058,0xb6d0db);
    }
    for(const x of xa) m.cylinder([x,y+1.05,-18],[x,y+1.05,-6],0.058,0xb6d0db);
  }
  for(let i=0;i<xa.length-1;i++){
    m.cylinder([xa[i],0.2,-18],[xa[i+1],6.45,-18],0.043,0x819eaa);
    m.cylinder([xa[i],6.45,-6],[xa[i+1],0.2,-6],0.043,0x819eaa);
  }
  // Maintenance workshop, workshop doors and overhead ventilation.
  m.box(-25,4.2,16,22,8.4,17,0x708494);m.solid(-25,16,22,17);
  m.box(-25,8.48,16,23.5,0.8,18.6,0x526575);
  for(const x of [-30,-24,-18]){m.box(x,2.8,7.43,3.3,5.3,0.09,0x2c4759);m.box(x,5.3,7.35,3.5,0.2,0.12,0xc5ac63);}
  for(const x of [-34,-32,-30,-28,-26])m.box(x,7,7.32,1.2,0.5,0.1,0xb4d5e1);
  // Three self-contained pieces of safe equipment on the working pad.
  m.box(-5,0.06,13,15,0.13,12,0x65727a);
  m.box(-8,0.85,12,3.5,1.7,2.4,0xb5a36f);m.solid(-8,12,3.6,2.4);
  m.box(-8,1.85,12,3.7,0.3,2.5,0x384d60);
  m.cylinder([-5,1,11],[-5,3.2,11],0.52,0xc9d5db,14);m.solid(-5,11,1.1,1.1);
  m.cylinder([-4.4,3,11],[-1.3,3,11],0.17,0xd1bc78);
  m.box(-1.5,1.1,15,2.3,2.2,3.6,0x7f9b9d);m.solid(-1.5,15,2.4,3.5);
  // Safety delineation: approach lane, bollards and barriers.
  for(const z of [-27,-23,-19,-15]){
    m.box(2.9,0.02,z,0.14,0.03,2.4,0xdcc676);
    m.box(3.9,0.02,z,0.14,0.03,2.4,0xdcc676);
  }
  for(const x of [-4,-2,0,2,4]){
    m.cylinder([x,0,-31],[x,0.95,-31],0.13,0xe0aa60);
    m.box(x,0.7,-31,0.29,0.12,0.29,0x1c2d3d);
  }
  // Light poles and suspended floodlight brackets.
  for(const [x,z] of [[-36,31],[36,31],[-36,-34],[36,-34]]){
    m.cylinder([x,0,z],[x,10,z],0.16,0x829baa,12);
    m.box(x,10,z,2.2,0.25,0.4,0xc2d8e2);m.box(x,9.82,z-0.4,1.6,0.5,0.15,0xffdfac);
  }
  // Painted arrows and directional lane separators on the ground.
  for(const z of [24,-4,-24]){
    m.box(0,0.02,z,0.18,0.03,2.8,0xe1d2a7);
    m.box(-0.55,0.02,z-1.1,1.05,0.03,0.15,0xe1d2a7);
    m.box(0.55,0.02,z-1.1,1.05,0.03,0.15,0xe1d2a7);
  }
  // Scaffold couplers, planking seams and toe boards.
  for(const y of [3.3,6.6]){
    for(const z of [-18,-12,-6])for(const x of [-16,-10,-4]){
      m.box(x,y+0.05,z,0.27,0.2,0.27,0xcbd9de);
    }
    for(const z of [-18,-12,-6])m.box(-10,y+0.12,z,12,0.24,0.12,0x9f7049);
    for(const x of [-16,-10,-4])m.box(x,y+0.12,-12,0.12,0.24,12,0x9f7049);
  }
  // Walkway edge markings and warning chevrons near equipment zones.
  for(const z of [-30,-25,-20,-15,-10,-5,0,5,10,15,20]){
    m.box(5.55,0.024,z,0.18,0.025,1.3,0xe6c15b);
    m.box(-3.4,0.024,z,0.18,0.025,1.3,0xe6c15b);
  }
  // Workshop cladding seams and external ventilation ducting.
  for(let x=-35;x<=-15;x+=2)m.box(x,4.1,7.34,0.06,7.7,0.08,0x9db0ba);
  for(const x of [-32,-25,-18]){
    m.cylinder([x,8.85,13],[x,8.85,23],0.48,0x9aafb9,12);
    m.cylinder([x,8.85,23],[x,7.8,23],0.48,0x9aafb9,12);
  }
  // Package 4 environmental cues: readable silhouettes at walking height, no answer markers.
  // Industrial fire points and eyewash stations give the compound a working-site identity.
  for(const [x,z] of [[-3,31],[4,6],[-12,21],[4,-17]] as number[][]){
    m.box(x,1.15,z,0.72,1.6,0.16,0xd9e3e7);
    m.box(x,1.63,z+0.095,0.58,0.43,0.06,0xb82e35);
    m.box(x,0.86,z+0.16,0.24,0.62,0.20,0xc83136);
    m.cylinder([x,1.21,z+0.29],[x,1.44,z+0.29],0.05,0x202d36,8);
    m.box(x,0.52,z+0.18,0.42,0.12,0.28,0x6a7d88);
  }
  for(const [x,z] of [[-12,29],[4,-8]] as number[][]){
    m.box(x,1.2,z,0.9,1.65,0.22,0x3c8c88);
    m.box(x,1.65,z+0.14,0.66,0.38,0.08,0xe3e6d4);
    m.cylinder([x,0.75,z+0.28],[x,1.18,z+0.28],0.07,0xcbd9dd,8);
    m.box(x,0.8,z+0.42,0.48,0.16,0.32,0xe6c86a);
  }
  // Small reflective floor studs guide navigation without pointing to any specific finding.
  for(const x of [-5.25,5.25])for(let z=-34;z<=34;z+=4){
    m.box(x,0.025,z,0.23,0.05,0.43,0xe7d9a3);
  }
  // P5 surface detailing: weathered maintenance grating, pipe clamps and tank weld seams.
  for(const z of [6,8,10,12,14,16]){
    m.box(4.8,0.037,z,0.85,0.04,0.045,0x8799a0);
    for(const x of [4.46,4.70,4.94,5.18])m.box(x,0.047,z,0.035,0.045,0.68,0x657983);
  }
  // Instrument cabinets and gauges: thin, decorative panels avoid new invisible walls.
  for(const [x,z] of [[5,26],[-13,7],[18,25]] as number[][]){
    m.box(x,1.15,z,1.1,1.8,0.46,0x849aa5);
    m.box(x,1.52,z+0.25,0.83,0.72,0.045,0x203d4c);
    for(const ox of [-0.25,0,0.25])m.cylinder([x+ox,1.66,z+0.29],[x+ox,1.66,z+0.35],0.085,0xe0c98b,10);
    m.box(x,0.9,z+0.26,0.58,0.14,0.045,0x5ba5a6);
  }
  addTrainingFindings(m);
  return m;
}

const vertexShader = `#version 300 es
precision highp float;
in vec3 aPosition;
in vec3 aNormal;
in vec3 aColor;
uniform mat4 uProjection;
uniform mat4 uView;
uniform vec3 uEye;
out vec3 vColor;
out vec3 vNormal;
out float vDepth;
out vec3 vWorld;
void main(){
  vWorld=aPosition;
  vColor=aColor;
  vNormal=aNormal;
  vDepth=distance(aPosition,uEye);
  gl_Position=uProjection*uView*vec4(aPosition,1.0);
}`;
const fragmentShader = `#version 300 es
precision highp float;
in vec3 vColor;
in vec3 vNormal;
in float vDepth;
in vec3 vWorld;
out vec4 fragColor;
void main(){
  vec3 n=normalize(vNormal);
  vec3 sun=normalize(vec3(-0.55,0.83,0.35));
  float diffuse=max(dot(n,sun),0.0);
  float cold=max(dot(n,normalize(vec3(0.5,0.2,-0.8))),0.0)*0.12;
  float occlusion=n.y<0.15?0.91:1.0;
  float light=(0.37+diffuse*0.70+cold)*occlusion;
  float metalHighlight=pow(max(dot(reflect(-sun,n),normalize(vec3(0.2,0.65,0.75))),0.0),20.0)*0.13;
  // P5: restrained industrial finish: multiscale surface grain, grime and warm daylight.
  float fine=fract(sin(dot(vWorld.xz*11.7+vWorld.yy*2.4,vec2(12.9898,78.233)))*43758.5453);
  float coarse=fract(sin(dot(floor(vWorld.xz*0.35)+vWorld.yy*0.17,vec2(39.3468,11.135)))*12741.315);
  float seams=1.0-smoothstep(0.008,0.03,min(fract(abs(vWorld.x)/15.0),fract(abs(vWorld.z)/15.0)));
  float horizontal=clamp(n.y,0.0,1.0);
  float dirt=mix(0.965,0.93+coarse*0.06,horizontal);
  vec3 base=vColor*(0.97+0.025*fine+0.025*coarse)*dirt;
  base*=1.0-0.028*seams*horizontal;
  float edgeLight=pow(1.0-max(dot(n,normalize(vec3(0.0,0.55,0.84))),0.0),3.0)*0.07;
  vec3 lit=base*(light+edgeLight)+vec3(0.72,0.77,0.78)*metalHighlight;
  // Subtle filmic compression prevents flat, overexposed industrial surfaces.
  lit=lit/(vec3(1.0)+lit*0.27);
  lit=pow(max(lit,vec3(0.0)),vec3(0.94));
  vec3 atmospheric=vec3(0.54,0.63,0.68);
  float fog=clamp((vDepth-48.0)/160.0,0.0,0.52);
  fragColor=vec4(mix(lit,atmospheric,fog),1.0);
}`;

function compile(gl: WebGL2RenderingContext, type:number, source:string):WebGLShader{
  const shader=gl.createShader(type);
  if(!shader)throw new Error("WebGL shader unavailable");
  gl.shaderSource(shader,source);gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
  return shader;
}
function projection(fov:number,aspect:number,near:number,far:number):Float32Array{
  const f=1/Math.tan(fov/2),nf=1/(near-far);
  return new Float32Array([f/aspect,0,0,0, 0,f,0,0, 0,0,(far+near)*nf,-1, 0,0,2*far*near*nf,0]);
}
function cameraView(eye:V3,yaw:number,pitch:number):Float32Array{
  const forward:V3=[Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),-Math.cos(yaw)*Math.cos(pitch)];
  const right:V3=[Math.cos(yaw),0,Math.sin(yaw)], up=unit(cross(right,forward));
  return new Float32Array([
    right[0],up[0],-forward[0],0,
    right[1],up[1],-forward[1],0,
    right[2],up[2],-forward[2],0,
    -dot(right,eye),-dot(up,eye),dot(forward,eye),1,
  ]);
}
export type WalkState = { x:number; z:number; yaw:number; pitch:number };
const SPAWN: WalkState={x:13,z:5,yaw:0,pitch:0.03};

export class RefineryWorld {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private buffers: WebGLBuffer[]=[];
  private vertexCount=0;
  private blockers:Blocker[]=[];
  public state:WalkState={...SPAWN};
  readonly bounds=37.6;
  constructor(private canvas:HTMLCanvasElement){
    const gl=canvas.getContext("webgl2",{antialias:true,alpha:false,powerPreference:"high-performance"});
    if(!gl)throw new Error("WebGL2 is not available in this browser");
    this.gl=gl;
    const vs=compile(gl,gl.VERTEX_SHADER,vertexShader),fs=compile(gl,gl.FRAGMENT_SHADER,fragmentShader);
    const program=gl.createProgram();
    if(!program)throw new Error("Could not create WebGL program");
    gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program) || "WebGL program link failed");
    gl.deleteShader(vs);gl.deleteShader(fs);this.program=program;
    const mesh=constructSite();this.blockers=mesh.blockers;this.vertexCount=mesh.positions.length/3;
    const attrs:[number[],string][]= [[mesh.positions,"aPosition"],[mesh.normals,"aNormal"],[mesh.colors,"aColor"]];
    gl.useProgram(program);
    for(const [values,name] of attrs){
      const location=gl.getAttribLocation(program,name);
      const buffer=gl.createBuffer();
      if(!buffer||location<0)throw new Error("Could not allocate WebGL attribute "+name);
      this.buffers.push(buffer);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(values),gl.STATIC_DRAW);
      gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,3,gl.FLOAT,false,0,0);
    }
    gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);gl.clearColor(0.54,0.63,0.68,1);
  }
  /**
   * Import a real binary glTF refinery asset into the playable scene.
   * Keeps hazard meshes and scoring intact. Material base colors are used as
   * a fallback until the PBR renderer lands. GLB is optional in preview.
   */
  async loadRefineryGLB(source = "/models/refinery/large_industrial_storage_tanks.glb"): Promise<boolean> {
    const response = await fetch(source);
    if (!response.ok) return false;
    const bytes = await response.arrayBuffer();
    if (bytes.byteLength < 20) return false;
    const dv = new DataView(bytes);
    if (dv.getUint32(0, true) !== 0x46546c67 || dv.getUint32(4, true) !== 2) return false;
    let offset = 12, json: any = null, binary: ArrayBuffer | null = null;
    while (offset + 8 <= bytes.byteLength) {
      const length = dv.getUint32(offset, true), type = dv.getUint32(offset + 4, true);
      offset += 8;
      if (length > bytes.byteLength - offset) return false;
      if (type === 0x4e4f534a) json = JSON.parse(new TextDecoder().decode(new Uint8Array(bytes, offset, length)));
      if (type === 0x004e4942) binary = bytes.slice(offset, offset + length);
      offset += length;
    }
    if (!json || !binary) return false;
    const views = json.bufferViews || [], accessors = json.accessors || [];
    const read = (index: number): number[][] => {
      const a = accessors[index];
      if (!a || a.bufferView === undefined || a.sparse) return [];
      const v = views[a.bufferView];
      if (!v) return [];
      const count = a.type === "VEC3" ? 3 : a.type === "VEC2" ? 2 : 1;
      const width = a.componentType === 5126 || a.componentType === 5125 ? 4 : a.componentType === 5123 ? 2 : 1;
      const stride = v.byteStride || count * width;
      const byteOffset = (v.byteOffset || 0) + (a.byteOffset || 0);
      if (byteOffset + (a.count - 1) * stride + count * width > binary!.byteLength) return [];
      const data = new DataView(binary!, byteOffset);
      const result: number[][] = [];
      for (let i = 0; i < a.count; i++) {
        const row: number[] = [];
        for (let k = 0; k < count; k++) {
          const at = i * stride + k * width;
          row.push(a.componentType === 5126 ? data.getFloat32(at, true) : a.componentType === 5125 ? data.getUint32(at, true) : a.componentType === 5123 ? data.getUint16(at, true) : data.getUint8(at));
        }
        result.push(row);
      }
      return result;
    };
    const positions: number[] = [], normals: number[] = [], colors: number[] = [];
    const nodes = json.nodes || [], meshes = json.meshes || [];
    // glTF matrices are column-major; Sketchfab uses a rotated root matrix.
    const identity = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
    const multiply = (a: number[], b: number[]) => {
      const out = new Array<number>(16).fill(0);
      for (let col=0;col<4;col++) for(let row=0;row<4;row++)
        for(let k=0;k<4;k++) out[col*4+row]+=a[k*4+row]*b[col*4+k];
      return out;
    };
    const add = (nodeIndex: number, parent: number[]) => {
      const node = nodes[nodeIndex];
      if (!node) return;
      const t = node.translation || [0,0,0], q = node.rotation || [0,0,0,1], sc = node.scale || [1,1,1];
      const [x,y,z,w]=q, [sx,sy,sz]=sc;
      const local: number[] = node.matrix || [
        (1-2*(y*y+z*z))*sx,2*(x*y+z*w)*sx,2*(x*z-y*w)*sx,0,
        2*(x*y-z*w)*sy,(1-2*(x*x+z*z))*sy,2*(y*z+x*w)*sy,0,
        2*(x*z+y*w)*sz,2*(y*z-x*w)*sz,(1-2*(x*x+y*y))*sz,0,
        t[0],t[1],t[2],1
      ];
      const m = multiply(parent,local);
      if (node.mesh !== undefined) for (const p of meshes[node.mesh]?.primitives || []) {
        if (p.mode !== undefined && p.mode !== 4) continue;
        const xyz = read(p.attributes?.POSITION), nrm = p.attributes?.NORMAL !== undefined ? read(p.attributes.NORMAL) : [];
        const idx = p.indices !== undefined ? read(p.indices).map(a=>a[0]) : xyz.map((_,i)=>i);
        const factor = json.materials?.[p.material]?.pbrMetallicRoughness?.baseColorFactor || [0.66,0.73,0.77,1];
        for (let i=0;i+2<idx.length;i+=3) for (let k=0;k<3;k++) {
          const v=idx[i+k], qv=xyz[v], n=nrm[v] || [0,1,0];
          if (!qv) continue;
          const px=m[0]*qv[0]+m[4]*qv[1]+m[8]*qv[2]+m[12];
          const py=m[1]*qv[0]+m[5]*qv[1]+m[9]*qv[2]+m[13];
          const pz=m[2]*qv[0]+m[6]*qv[1]+m[10]*qv[2]+m[14];
          // glTF scaled nodes require inverse-transpose normal transformation.
          const a=m[0],b=m[4],c=m[8],d=m[1],e=m[5],f=m[9],g=m[2],h=m[6],j=m[10];
          const det=a*(e*j-f*h)-b*(d*j-f*g)+c*(d*h-e*g);
          const inv=Math.abs(det)>1e-9?1/det:0;
          const nx=inv*((e*j-f*h)*n[0]+(f*g-d*j)*n[1]+(d*h-e*g)*n[2]);
          const ny=inv*((c*h-b*j)*n[0]+(a*j-c*g)*n[1]+(b*g-a*h)*n[2]);
          const nz=inv*((b*f-c*e)*n[0]+(c*d-a*f)*n[1]+(a*e-b*d)*n[2]);
          const nl=Math.hypot(nx,ny,nz)||1;
          positions.push(px*0.4+17,py*0.4,pz*0.4-12);
          normals.push(nx/nl,ny/nl,nz/nl);
          colors.push(factor[0],factor[1],factor[2]);
        }
      }
      for (const child of node.children || []) add(child,m);
    };
    for (const root of json.scenes?.[json.scene || 0]?.nodes || []) add(root,identity);
    if (!positions.length || positions.length !== normals.length || positions.length !== colors.length) return false;
    const gl=this.gl;
    gl.useProgram(this.program);
    for (const [i,values] of [positions,normals,colors].entries()) {
      gl.bindBuffer(gl.ARRAY_BUFFER,this.buffers[i]);
      const oldBytes=gl.getBufferParameter(gl.ARRAY_BUFFER,gl.BUFFER_SIZE) as number;
      const previous=new Float32Array(oldBytes/4);
      gl.getBufferSubData(gl.ARRAY_BUFFER,0,previous);
      const combined=new Float32Array(previous.length+values.length);
      combined.set(previous);combined.set(values,previous.length);
      gl.bufferData(gl.ARRAY_BUFFER,combined,gl.STATIC_DRAW);
    }
    this.vertexCount+=positions.length/3;
    return true;
  }

  /** Nearest aimed training finding within a short inspection distance. */
  pickHazard(completed: ReadonlySet<string>): SafetyHazard | null {
    const eye: V3 = [this.state.x,1.72,this.state.z];
    const {yaw,pitch}=this.state;
    const viewDir: V3 = [Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),-Math.cos(yaw)*Math.cos(pitch)];
    let selected: SafetyHazard | null = null;
    let best = 0.925;
    for(const hazard of trainingHazards){
      if(completed.has(hazard.id))continue;
      const [x,y,z]=hazard.target;
      const delta:V3=[x-eye[0],y-eye[1],z-eye[2]];
      const distance=Math.hypot(...delta);
      if(distance > hazard.range || distance < 0.2)continue;
      const alignment=dot(viewDir,[delta[0]/distance,delta[1]/distance,delta[2]/distance]);
      if(alignment>best){best=alignment;selected=hazard;}
    }
    return selected;
  }
  /** A nearby hazard to help touch users locate the next inspection point. */
  nearestHazard(completed: ReadonlySet<string>): { hazard: SafetyHazard; distance: number } | null {
    let nearest: { hazard: SafetyHazard; distance: number } | null = null;
    for (const hazard of trainingHazards) {
      if (completed.has(hazard.id)) continue;
      const distance = Math.hypot(hazard.target[0]-this.state.x,hazard.target[2]-this.state.z);
      if (distance > 12 || (nearest && nearest.distance <= distance)) continue;
      nearest = { hazard, distance };
    }
    return nearest;
  }
  reset(){this.state={...SPAWN};}
  look(dx:number,dy:number){
    this.state.yaw+=dx*0.0021;
    this.state.pitch=Math.max(-1.28,Math.min(1.28,this.state.pitch-dy*0.0021));
  }
  private canMove(x:number,z:number){
    if(Math.abs(x)>this.bounds||Math.abs(z)>this.bounds)return false;
    const radius=0.39;
    return !this.blockers.some(b=>Math.abs(x-b.x)<b.width/2+radius&&Math.abs(z-b.z)<b.depth/2+radius);
  }
  walk(forward:number,sideways:number,dt:number,sprint:boolean){
    const magnitude=Math.hypot(forward,sideways);
    if(!magnitude)return;
    const length=Math.min(Math.max(dt,0),0.05)*(sprint?6.7:4.25)/Math.max(1,magnitude);
    const dx=(Math.sin(this.state.yaw)*forward+Math.cos(this.state.yaw)*sideways)*length;
    const dz=(-Math.cos(this.state.yaw)*forward+Math.sin(this.state.yaw)*sideways)*length;
    if(this.canMove(this.state.x+dx,this.state.z))this.state.x+=dx;
    if(this.canMove(this.state.x,this.state.z+dz))this.state.z+=dz;
  }
  render(){
    const gl=this.gl, canvas=this.canvas;
    const dpr=Math.min(window.devicePixelRatio||1,1.65);
    const w=Math.max(1,Math.floor(canvas.clientWidth*dpr));
    const h=Math.max(1,Math.floor(canvas.clientHeight*dpr));
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
    gl.viewport(0,0,canvas.width,canvas.height);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.useProgram(this.program);
    const eye:V3=[this.state.x,1.72,this.state.z];
    const proj=projection(Math.PI/3,canvas.width/canvas.height,0.08,145);
    const view=cameraView(eye,this.state.yaw,this.state.pitch);
    gl.uniformMatrix4fv(gl.getUniformLocation(this.program,"uProjection"),false,proj);
    gl.uniformMatrix4fv(gl.getUniformLocation(this.program,"uView"),false,view);
    gl.uniform3fv(gl.getUniformLocation(this.program,"uEye"),new Float32Array(eye));
    gl.drawArrays(gl.TRIANGLES,0,this.vertexCount);
  }
  dispose(){for(const b of this.buffers)this.gl.deleteBuffer(b);this.gl.deleteProgram(this.program);}
}
