/**
 * SERNEM Labs 3D Safety Inspector — Package 1 standalone WebGL2 field renderer.
 * No external assets or dependencies: the first build cannot impact existing Labs.
 * Visuals are procedural training-environment placeholders, not approved hazard scenes.
 */
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

function constructSite() {
  const m = new SiteMesh();
  // Subtle concrete paving and asphalt walkways.
  m.box(0,-0.26,0,86,0.45,86,0x344454);
  m.box(0,-0.018,7,11,0.035,72,0x415668);
  for(let z=-39;z<=39;z+=5){ m.box(0,0.005,z,0.13,0.012,2.3,0xe1d39c); }
  for(let x=-38;x<=38;x+=4){
    m.box(x,-0.016,-39,0.05,0.02,76,0x3f5060);
  }
  for(let z=-38;z<=38;z+=4){ m.box(0,-0.014,z,78,0.02,0.05,0x3f5060); }
  // Fenced compound perimeter with entrances at the south.
  for(const x of [-40,40]){
    for(let z=-40;z<=40;z+=3){ m.box(x,1.12,z,0.15,2.24,0.16,0x7f9fb0); }
    for(const y of [0.55,1.9])m.box(x,y,0,0.08,0.08,80,0x6e8799);
  }
  for(const z of [-40,40]){
    for(let x=-40;x<=40;x+=3){ if(z===40&&Math.abs(x)<5)continue; m.box(x,1.12,z,0.15,2.24,0.16,0x7f9fb0);}
    for(const y of [0.55,1.9]){ m.box(-22,y,z,36,0.08,0.08,0x6e8799);m.box(22,y,z,36,0.08,0.08,0x6e8799);}
  }
  // Storage tanks on the east; raised pads, shell rings, railings and piping.
  for (const [x,z,rad,height] of [[23,-20,5,10],[27,10,4.2,7.2]] as number[][]) {
    m.box(x,0.12,z,rad*2+1,0.24,rad*2+1,0x576674);
    m.cylinder([x,0.25,z],[x,height,z],rad,0xaabec8,30);
    for(const y of [1.5,4,6.5,9].filter(y=>y<height)){
      m.cylinder([x-rad-0.02,y,z],[x+rad+0.02,y,z],0.055,0xd6e3e8,18);
    }
    m.cylinder([x,height,z],[x,height+0.32,z],rad*0.98,0x8a9fab,30);
    for(let y=0.7;y<height-0.6;y+=0.48){
      m.box(x-rad-0.18,y,z,0.1,0.08,0.48,0xe8b964);
    }
    m.solid(x,z,rad*2,rad*2);
  }
  // Pipe rack with multiple levels, steel girders, supports and color-coded pipes.
  for(const z of [-30,-23,-16,-9,-2,5,12,19]){
    for(const x of [7.5,16.5]){
      m.box(x,4.1,z,0.55,8.2,0.55,0x8eabb9); m.box(x,8.3,z,0.9,0.4,0.9,0xb8d1d9);m.solid(x,z,1.1,1.1);
    }
    for(const y of [4.1,7.45])m.box(12,y,z,10.8,0.36,0.55,0xb7c6d0);
  }
  for(const [x,y,r,c] of [[9.2,7.9,0.35,0xc8d9df],[11.1,7.9,0.3,0xe5bb5d],[13.1,7.9,0.45,0x8eaac1],[15.2,7.9,0.3,0xc8d9df],[10,4.48,0.25,0x6caeb0],[13,4.55,0.32,0xa2c3cd]] as number[][]) {
    m.cylinder([x,y,-32],[x,y,21],r,c,12);
  }
  // Scaffolding training zone: decking, braces, toe boards, guardrails.
  const xa=[-16,-10,-4], za=[-18,-12,-6], levels=[0,3.3,6.6];
  for(const x of xa)for(const z of za){m.cylinder([x,0,z],[x,9.2,z],0.09,0xb0c5d2,10);m.solid(x,z,0.55,0.55);}
  for(const y of levels.slice(1)){
    for(let i=0;i<xa.length-1;i++)for(let j=0;j<za.length-1;j++){
      m.box((xa[i]+xa[i+1])/2,y,(za[j]+za[j+1])/2,5.85,0.2,5.85,0x98795c);
    }
    for(const z of za) m.cylinder([-16,y+1.05,z],[-4,y+1.05,z],0.058,0xb6d0db);
    for(const x of xa) m.cylinder([x,y+1.05,-18],[x,y+1.05,-6],0.058,0xb6d0db);
  }
  for(let i=0;i<xa.length-1;i++){
    m.cylinder([xa[i],0.2,-18],[xa[i+1],6.45,-18],0.043,0x819eaa);
    m.cylinder([xa[i],6.45,-6],[xa[i+1],0.2,-6],0.043,0x819eaa);
  }
  // Maintenance workshop, workshop doors and overhead ventilation.
  m.box(-25,4.2,16,22,8.4,17,0x708494);m.solid(-25,16,22,17);
  m.box(-25,8.48,16,23.5,0.8,18.6,0x526575);
  for(const x of [-30,-24,-18]){m.box(x,2.8,7.43,3.3,5.3,0.09,0x2c4759);m.box(x,5.3,7.35,3.5,0.2,0xc5ac63);}
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
  float light=(0.30+diffuse*0.73+cold)*occlusion;
  float textureNoise=fract(sin(dot(vWorld.xz*3.1+vWorld.yy,vec2(12.9898,78.233)))*43758.5453);
  vec3 lit=vColor*light*(0.965+0.065*textureNoise);
  vec3 atmospheric=vec3(0.37,0.49,0.59);
  float fog=clamp((vDepth-19.0)/105.0,0.0,0.84);
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
const SPAWN: WalkState={x:0,z:30,yaw:0.1,pitch:0.03};

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
    gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.clearColor(0.30,0.43,0.54,1);
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
