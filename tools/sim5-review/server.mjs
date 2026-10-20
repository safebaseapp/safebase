import http from 'node:http';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {repoRoot,toolRoot} from './inspect.mjs';
const operation=path.join(repoRoot,'app/app/[locale]/labs/sim5/WeldingOperation.ts');
export async function startServer(port=4176){
 const lifting=await build({entryPoints:[path.join(repoRoot,'app/app/[locale]/labs/sim5/LiftingOperation.ts')],format:'esm',write:false});
 const compiled=await build({entryPoints:[operation],format:'esm',write:false});
 const baseline=process.env.SIM5_REVIEW_BASELINE;
 if(baseline&&!/^[0-9a-f]{40}$/.test(baseline))throw Error('Invalid baseline SHA');
 const probe=process.env.SIM5_NAV_PROBE==='1';
 const plugins=baseline||probe?[{name:'review-source',setup(b){b.onLoad({filter:/[/\\]sim5[/\\].*\.tsx?$/},async args=>{
  let contents=baseline?execFileSync('git',['-C',repoRoot,'show',`${baseline}:${path.relative(repoRoot,args.path)}`],{encoding:'utf8'}):await fs.readFile(args.path,'utf8');
  // Expose the real navigation only inside this isolated review bundle.
  if(probe&&args.path.endsWith('/RealModels.tsx'))contents=contents.replace('const canStep=navigation.step;','window.reviewNavigation=navigation;const canStep=navigation.step;');
  return {contents,loader:args.path.endsWith('.tsx')?'tsx':'ts'};
 })}}]:[];
 const site=await build({plugins,entryPoints:[path.join(toolRoot,'site.jsx')],bundle:true,write:false,format:'esm',jsx:'automatic',nodePaths:[path.join(repoRoot,'app/node_modules')]});
 const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.glb':'model/gltf-binary','.png':'image/png'};
 const server=http.createServer(async(req,res)=>{
  try{
   const pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);
   if(pathname==='/operation.js'||pathname==='/site.js'||pathname==='/lifting.js'){res.setHeader('Content-Type','text/javascript');return res.end((pathname==='/operation.js'?compiled:pathname==='/lifting.js'?lifting:site).outputFiles[0].contents);}
   let base=toolRoot,relative=pathname==='/'?'review.html':pathname.slice(1);
   if(pathname.startsWith('/vendor/')){base=path.join(toolRoot,'node_modules');relative=pathname.slice(8);}
   else if(pathname.startsWith('/sim5/')){base=path.join(repoRoot,'app/public');relative=pathname.slice(1);}
   const filename=path.resolve(base,relative);
   if(!filename.startsWith(base+path.sep)){res.writeHead(403);return res.end();}
   res.setHeader('Content-Type',types[path.extname(filename)]||'application/octet-stream');
   res.end(await fs.readFile(filename));
  }catch(error){res.writeHead(404);res.end(String(error));}
 });
 await new Promise(resolve=>server.listen(port,'127.0.0.1',resolve));
 return {server,url:`http://127.0.0.1:${server.address().port}`};
}
if(process.argv[1]===fileURLToPath(import.meta.url)){const{url}=await startServer();console.log(`Local SIM5 review server: ${url}`);}
