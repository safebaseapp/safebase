import sharp from '../../app/node_modules/sharp/lib/index.js';
import fs from 'node:fs';
const results=[];
for(const scene of ['welding','road','lifting']){
const a=await sharp(`docs/sim5-performance/before-${scene}.png`).removeAlpha().raw().toBuffer({resolveWithObject:true}),b=await sharp(`docs/sim5-performance/after-${scene}.png`).removeAlpha().raw().toBuffer({resolveWithObject:true});
let sum=0,changed=0;for(let i=0;i<a.data.length;i+=3){let max=0;for(let c=0;c<3;c++){const d=Math.abs(a.data[i+c]-b.data[i+c]);sum+=d;max=Math.max(max,d)}if(max>10)changed++}
results.push({scene,width:a.info.width,height:a.info.height,meanAbsoluteChannelDifference:sum/a.data.length,pixelsChangedOver10:changed,changedPercent:100*changed/(a.info.width*a.info.height)});
}
fs.writeFileSync('docs/sim5-performance/image-comparison.json',JSON.stringify({results,note:'Same real scene and test-only camera positions. Animation timing and software-render variance may differ. Application renderer, models, materials, cameras unchanged.'},null,2));console.log(results);
