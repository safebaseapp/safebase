// Read-only fixtures exercise the actual poster Premium decision helper.
// No Supabase, Lemon, user accounts, sessions or production changes.
import assert from "node:assert/strict";
import { build } from "../sim5-review/node_modules/esbuild/lib/main.js";
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";

const compiled = await build({
  entryPoints: ["app/lib/auth/poster-premium-access.ts"],
  bundle: true, platform: "node", format: "cjs", write: false,
  tsconfig: "app/tsconfig.json",
  plugins:[{
    name: "read-only-poster-entitlements",
    setup(b) {
      b.onResolve({filter: /^(server-only|@\/utils\/supabase\/server|@\/lib\/auth\/(access|reward-access|billing-premium))$/},
        a=>({path:a.path,namespace:"qa"}));
      b.onLoad({filter:/.*/,namespace:"qa"}, a=>{
        const name=a.path;
        let contents;
        if(name==="server-only") contents="export default {}";
        else if(name.endsWith("/server")) contents=`
          export async function createClient(){
            const c=globalThis.posterCase;
            return {
              auth:{getUser:async()=>({data:{user:c.user},error:c.authError?{}:null})},
              from:()=>({select:()=>({eq:()=>({maybeSingle:async()=>({data:c.profile,error:c.profileError?{}:null})})})})
            };
          }`;
        else if(name.endsWith("/access"))
          contents="export function isAdminUser(){return globalThis.posterCase.admin===true}";
        else if(name.endsWith("/reward-access"))
          contents="export async function hasActiveReward(){return globalThis.posterCase.reward===true}";
        else if(name.endsWith("/billing-premium"))
          contents="export async function hasCurrentBillingPremium(){return globalThis.posterCase.billing===true}";
        else throw new Error("unexpected mock: "+name);
        return {loader:"js",contents};
      });
    },
  }],
});
const dest="/tmp/sernem-poster-access-audit.cjs";
writeFileSync(dest,compiled.outputFiles[0].text);
const {getPosterPremiumAccess}=createRequire(import.meta.url)(dest);
const user={id:"fixture-user",email:"user@example.invalid"};
const active=(plan="free",role="user")=>({status:"active",plan,role});
const checks=[
  {name:"guest",user:null,expected:false,reason:"guest"},
  {name:"auth error",user,authError:true,expected:false,reason:"guest"},
  {name:"free",user,profile:active(),expected:false,reason:"free"},
  {name:"paid current",user,profile:active("premium"),billing:true,expected:true,reason:"billing"},
  {name:"expired premium trial",user,profile:active("premium"),billing:false,expected:false,reason:"free"},
  {name:"reward access",user,profile:active(),reward:true,expected:true,reason:"reward"},
  {name:"admin role",user,profile:active("free","admin"),expected:true,reason:"admin"},
  {name:"admin email",user,profile:active(),admin:true,expected:true,reason:"admin"},
  {name:"suspended premium",user,profile:{status:"suspended",plan:"premium",role:"user"},billing:true,expected:false,reason:"inactive"},
  {name:"missing profile",user,profile:null,expected:false,reason:"inactive"},
  {name:"profile read error",user,profile:active("premium"),profileError:true,expected:false,reason:"inactive"}
];
for(const c of checks) {
  globalThis.posterCase=c;
  const actual=await getPosterPremiumAccess();
  assert.equal(actual.allowed,c.expected,c.name+" decision");
  assert.equal(actual.reason,c.reason,c.name+" reason");
  console.log("PASS:",c.name);
}
console.log("PASS:",checks.length,"poster entitlement fixtures. Live accounts and provider data not touched.");
