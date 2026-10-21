import {createRequire} from "node:module";
// Local-only synthetic Supabase protocol fixture. Never proxies requests.
import fs from 'node:fs';
import http from 'node:http';import crypto from 'node:crypto';
export const origin='http://127.0.0.1:54511';
export const roles=['free','paid','expired','admin','suspended','trial'];
const users=roles.map((role,i)=>({id:`00000000-0000-4000-8000-${String(i+1).padStart(12,'0')}`,email:`${role}@fixture.invalid`,role:'authenticated',aud:'authenticated',email_confirmed_at:'2026-01-01T00:00:00Z',app_metadata:{},user_metadata:{},created_at:'2026-01-01T00:00:00Z'}));
export function session(role){const user=users[roles.indexOf(role)]||users[0];const enc=v=>Buffer.from(JSON.stringify(v)).toString('base64url'),head=enc({alg:'HS256',typ:'JWT'}),body=enc({sub:user.id,aud:'authenticated',role:'authenticated',email:user.email,iat:Math.floor(Date.now()/1000),exp:Math.floor(Date.now()/1000)+7200});return {access_token:head+'.'+body+'.'+crypto.createHmac('sha256','p11-local-only').update(head+'.'+body).digest('base64url'),refresh_token:'p11-local-refresh',expires_in:7200,expires_at:Math.floor(Date.now()/1000)+7200,token_type:'bearer',user}}
export function cookie(role){return {name:'sb-127-auth-token',value:'base64-'+Buffer.from(JSON.stringify(session(role))).toString('base64url'),domain:'127.0.0.1',path:'/'}}
function profile(user){const role=roles[users.indexOf(user)];return {...user,full_name:'Fixture',plan:['paid','expired','trial'].includes(role)?'premium':'free',role:role==='admin'?'admin':'user',status:role==='suspended'?'suspended':'active',lemon_subscription_id:role==='paid'?'fixture-paid':null,subscription_status:role==='paid'?'active':null}}
export async function startFixture(){
const dir=new URL('./artifacts/',import.meta.url);fs.mkdirSync(dir,{recursive:true});
const require=createRequire(new URL('../../app/package.json',import.meta.url));
await require('sharp')(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="80"><rect width="300" height="80" fill="#063c55"/><text x="20" y="55" font-size="40" fill="white">P11 TEST</text></svg>')).png().toFile(new URL('./artifacts/fixture-logo.png',import.meta.url).pathname);
const server=http.createServer(async(req,res)=>{const u=new URL(req.url,origin);let user=null;try{const payload=JSON.parse(Buffer.from((req.headers.authorization||'').split('.')[1]||'','base64url'));user=users.find(x=>x.id===payload.sub)}catch{}
const reply=(v,status=200)=>{res.writeHead(status,{'Content-Type':'application/json','Access-Control-Allow-Origin':req.headers.origin||'*','Access-Control-Allow-Credentials':'true','Access-Control-Allow-Private-Network':'true','Access-Control-Allow-Headers':req.headers['access-control-request-headers']||'apikey,authorization,content-type,x-client-info,x-supabase-api-version,prefer,accept','Access-Control-Allow-Methods':'GET,POST,PATCH,DELETE,OPTIONS','Access-Control-Expose-Headers':'Content-Range','Content-Range':'0-0/1'});res.end(JSON.stringify(v))};if(req.method==='OPTIONS')return reply({});let body='';for await(const c of req)body+=c;
if(u.pathname==='/auth/v1/user')return user?reply(user):reply({message:'No fixture session'},401);
if(u.pathname==='/auth/v1/token'){let data={};try{data=JSON.parse(body)}catch{};if(data.password==='reject-fixture')return reply({error:'invalid_grant',error_description:'Invalid fixture login'},400);return reply(session('free'))}
if(u.pathname==='/auth/v1/signup')return reply({user:users[0],session:null});if(u.pathname==='/auth/v1/recover'||u.pathname==='/auth/v1/logout')return reply({});if(u.pathname==='/auth/v1/verify')return reply(session('free'));
if(u.pathname.includes('/storage/')){
 if(u.pathname.includes('/object/list/'))return reply(['paid','admin'].includes(roles[users.indexOf(user)])?[{name:'logo.png'}]:[]);
 if(u.pathname.endsWith('/logo.png')){res.writeHead(200,{'Content-Type':'image/png','Access-Control-Allow-Origin':'*'});return res.end(fs.readFileSync(new URL('./artifacts/fixture-logo.png',import.meta.url)))}
 if(u.pathname.endsWith('/document-profile.json'))return reply({projectName:'P11 Fixture',siteName:'Local test',presentedBy:'Fixture',revision:'00'});
 return reply({message:'No fixture asset'},404);
}
if(u.pathname==='/auth/v1/admin/users')return reply({users:[],aud:'authenticated'});
if(u.pathname.startsWith('/rest/v1/rpc/'))return reply(u.pathname.endsWith('has_active_premium_reward')?false:[]);
const table=u.pathname.split('/').pop(),uid=(u.searchParams.get('id')||u.searchParams.get('user_id')||'').replace('eq.','');const owner=users.find(x=>x.id===uid)||user||users[0],role=roles[users.indexOf(owner)];let data=[];
if(table==='profiles')data=[profile(owner)];if(table==='premium_trial_reservations'&&['expired','trial'].includes(role))data=[{id:'fixture-reservation',status:'on_trial',lemon_subscription_id:'fixture-trial',trial_ends_at:new Date(Date.now()+(role==='trial'?3600000:-3600000)).toISOString(),access_ends_at:null}];
if(req.method!=='GET'&&req.method!=='HEAD')return reply([],201);
if(req.headers.accept?.includes('vnd.pgrst.object'))return data.length?reply(data[0]):reply({code:'PGRST116',details:'0 rows',message:'No fixture row'},406);return reply(data);
});await new Promise(r=>server.listen(54511,'127.0.0.1',r));return server}
if(process.argv[1]===new URL(import.meta.url).pathname){await startFixture();console.log('Local isolated auth fixture ready')}
