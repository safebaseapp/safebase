import {startServer} from '../sim5-review/server.mjs';
import {chromium} from '../sim5-review/node_modules/playwright/index.mjs';
process.env.SIM5_NAV_PROBE='1';const label=process.argv[2];
const {server,url}=await startServer(0),browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{const p=await browser.newPage({viewport:{width:1280,height:900}});await p.goto(url+'/site.html?mode=demo');await p.waitForFunction(()=>window.reviewNavigation,null,{timeout:120000});
for(const [name,position,target]of [['welding',[-14,6,6],[-23,1,-5]],['road',[4,8,26],[-15,1,10]],['lifting',[-13,9,64],[-30,3,47]]]){
const n=await p.evaluate(({position,target})=>{window.reviewCamera={position,target};window.reviewFrameRequested=true;return window.reviewFrameCount},{position,target});await p.waitForFunction(n=>window.reviewFrameCount>n,n,{timeout:120000});await p.locator('canvas').screenshot({path:`docs/sim5-performance/${label}-${name}.png`});}
}finally{await browser.close();server.closeAllConnections();server.close()}
