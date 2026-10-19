// Test-only renderer instrumentation. Production modules use unmodified Three.
export * from '/vendor/three/build/three.module.js';
import {WebGLRenderer as Renderer} from '/vendor/three/build/three.module.js';
export class WebGLRenderer extends Renderer {
 constructor(options){
  super(options);
  const render=this.render.bind(this);
  this.render=(scene,camera)=>{
   window.siteScene=scene;window.siteCamera=camera;window.siteRenderer=this;
   // Render on demand for deterministic software-GPU integration captures.
   // The real component's animation, controls and HSE logic continue running.
   if(window.renderedOnce&&!window.reviewFrameRequested&&!window.reviewContinuous)return;
   window.reviewFrameRequested=false;window.renderedOnce=true;
   let view=camera;
   if(window.reviewCamera){view=camera.clone();view.position.fromArray(window.reviewCamera.position);view.lookAt(...window.reviewCamera.target);}
   const started=performance.now();render(scene,view);if(window.reviewContinuous){this.getContext().finish();(window.reviewRenderTimes||=[]).push(performance.now()-started);}window.reviewFrameCount=(window.reviewFrameCount||0)+1;
  };
 }
}
