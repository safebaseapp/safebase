/**
 * Browser acceptance for touch gameplay. Runs against local Next.js on GitHub Actions.
 * Chromium iPhone-sized emulation is NOT a real Safari or iPhone device test.
 */
import { chromium, devices } from "playwright";
import { mkdir } from "node:fs/promises";
const base = process.env.LABS_BASE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({headless:true,args:["--use-gl=angle","--use-angle=swiftshader","--enable-webgl","--disable-web-security"]});
const context = await browser.newContext({...devices["iPhone 13"], viewport:{width:390,height:844}, locale:"tr-TR"});
const page = await context.newPage();
const failures = [];
const check = async (description, fn) => {try {await fn(); console.log("PASS",description)} catch(e){failures.push(description+": "+String(e));console.error("FAIL",description,String(e).slice(0,350))}};
try {
  await mkdir("artifacts",{recursive:true});
  await check("Turkish Inspector route opens",async()=> {
    const response=await page.goto(base+"/tr/labs/3d-safety-inspector",{waitUntil:"domcontentloaded",timeout:90000});
    if(!response||response.status()>=400)throw Error("HTTP "+response?.status());
    await page.getByText("Rafineri eğitim sahası",{exact:true}).waitFor({timeout:30000});
  });
  await check("Game starts on mobile",async()=> {
    await page.getByRole("button",{name:/Sahaya gir/}).click({timeout:18000});
    await page.getByRole("button",{name:/İNCELE/}).waitFor({timeout:10000});
  });
  await check("Touch controls visible and keyboard HUD hidden",async()=> {
    const state=await page.evaluate(()=>{
      const cls=(substring)=>[...document.querySelectorAll("[class]")].find(e=>(typeof e.className==="string")&&e.className.includes(substring));
      const visible=(e)=>e&&getComputedStyle(e).display!=="none"&&e.getBoundingClientRect().width>0&&e.getBoundingClientRect().height>0;
      return {mobile:visible(cls("mobileControls")),desktop:visible(cls("bottomHud")),prompt:visible(cls("mobilePrompt")),keyboard:visible(cls("desktopPrompt"))};
    });
    if(!state.mobile||state.desktop||!state.prompt||state.keyboard)throw Error(JSON.stringify(state));
  });
  await page.screenshot({path:"artifacts/labs-3d-mobile-start.png",fullPage:false});
  await check("Joystick moves player",async()=>{
    const pad=page.locator('[role="group"][aria-label*="joystick"]').first();
    await pad.waitFor({state:"visible"});
    const box=await pad.boundingBox();if(!box)throw Error("joystick box unavailable");
    const x=box.x+box.width/2, y=box.y+box.height/2;
    const initial=await page.locator('[class*="coords"]').textContent();
    await page.mouse.move(x,y);await page.mouse.down();
    await page.mouse.move(x,y-35,{steps:5});
    await page.waitForTimeout(1400);
    await page.mouse.up();
    const next=await page.locator('[class*="coords"]').textContent();
    if(initial===next)throw Error("coordinates unchanged: "+initial+" → "+next);
  });
  await check("Touch Inspect gives finding or guidance",async()=>{
    await page.getByRole("button",{name:/İNCELE/}).click();
    const screen=await page.locator("main").innerText();
    if(!screen.includes("nişangâhı")&&!screen.includes("Sahada görülen uygunsuzluk")&&!screen.includes("Bulgu olarak kaydet"))throw Error("No feedback after Inspect");
  });
  await check("Mobile Pause stops game",async()=>{
    // Game may be showing an inspection modal. If so cancel before pausing.
    const back=page.getByRole("button",{name:"Geri dön"});
    if(await back.isVisible())await back.click();
    await page.getByRole("button",{name:/Duraklat/}).first().click();
    await page.getByText("Saha incelemesi duraklatıldı").waitFor({timeout:6000});
  });
} finally {
  await page.screenshot({path:"artifacts/labs-3d-mobile-final.png",fullPage:false}).catch(()=>{});
  await browser.close();
}
if(failures.length){console.error(failures.join("\n"));process.exitCode=1;}else console.log("Mobile emulation smoke checks passed.");
