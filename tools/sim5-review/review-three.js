// Test-only renderer instrumentation. Production modules use unmodified Three.
export * from '/vendor/three/build/three.module.js';
import {WebGLRenderer as Renderer} from '/vendor/three/build/three.module.js';
export class WebGLRenderer extends Renderer {
 constructor(options){
  super(options);
  const render=this.render.bind(this);
  this.render=(scene,camera)=>{
   window.reviewRenderInvocations=(window.reviewRenderInvocations||0)+1;
   window.siteScene=scene;window.siteCamera=camera;window.siteRenderer=this;
   // Render on demand for deterministic software-GPU integration captures.
   // The real component's animation, controls and HSE logic continue running.
   if(window.renderedOnce&&!window.reviewFrameRequested&&!window.reviewContinuous)return;
   window.reviewFrameRequested=false;window.renderedOnce=true;
   let view=camera;
   if(window.reviewCamera){view=camera.clone();view.position.fromArray(window.reviewCamera.position);view.lookAt(...window.reviewCamera.target);if(window.reviewCamera.fov){view.fov=window.reviewCamera.fov;view.updateProjectionMatrix();}view.updateMatrixWorld(true);}
   const started=performance.now();render(scene,view);window.reviewCapturedArc={visible:scene.getObjectByName('weld-arc')?.visible,light:scene.getObjectByName('weld-light')?.intensity};if(window.reviewContinuous){this.getContext().finish();(window.reviewRenderTimes||=[]).push(performance.now()-started);}window.reviewFrameCount=(window.reviewFrameCount||0)+1;
  };
 }
}
