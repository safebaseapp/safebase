import {build} from '../sim5-review/node_modules/esbuild/lib/main.js';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
export const root=path.resolve(import.meta.dirname,'../..');
export async function load(file,{baseline=false}={}){
 const result=await build({entryPoints:[path.join(root,file)],bundle:true,platform:'node',format:'esm',write:false,jsx:'automatic',tsconfig:path.join(root,'app/tsconfig.json'),nodePaths:[path.join(root,'app/node_modules')],plugins:baseline?[{name:'baseline',setup(b){b.onLoad({filter:/\/app\/.*\.tsx?$/},a=>({contents:execFileSync('git',['show','e25c7c11eb6902f4ecefe096fee4a8e1b959bc11:'+path.relative(root,a.path)],{cwd:root,encoding:'utf8'}),loader:a.path.endsWith('.tsx')?'tsx':'ts'}))}}]:[]});
 return import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].contents).toString('base64'));
}
