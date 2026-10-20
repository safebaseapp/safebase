import { NextResponse } from "next/server";
import { getSim5Access } from "@/lib/sim5/server-access";
import { createLabsWriter } from "@/lib/labs/admin-writer";
import { isLogExtension, verifyMissionLog } from "@/lib/sim5/replay";
export const dynamic="force-dynamic";
// Server-computed calendar day matching the trusted PostgreSQL reward clock.
function budapestDate(now=new Date()) {
 const parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Budapest",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);
 const value=(type:string)=>parts.find(part=>part.type===type)?.value||"";
 return `${value("year")}-${value("month")}-${value("day")}`;
}
const reply=(body:unknown,status=200)=>NextResponse.json(body,{status,headers:{"Cache-Control":"private, no-store","Vary":"Cookie"}});
export async function GET() {
 const access=await getSim5Access();
 if(!access.allowed||!access.userId)return reply({ok:false,error:"PREMIUM_REQUIRED"},403);
 try {
  const db=createLabsWriter();
  const rewardDate=budapestDate();
  const [history,day]=await Promise.all([
   db.from("sim5_runs").select("id,schema_version,locale,status,score,xp_awarded,report,started_at,ended_at,updated_at").eq("user_id",access.userId).order("started_at",{ascending:false}).limit(30),
   db.from("sim5_daily_rewards").select("reward_date,xp_awarded").eq("user_id",access.userId).eq("reward_date",rewardDate).maybeSingle()
  ]);
  if(history.error||day.error)return reply({ok:false,error:"HISTORY_UNAVAILABLE"},503);
  return reply({ok:true,runs:history.data,daily:{rewardDate,claimed:!!day.data,earnedToday:day.data?.xp_awarded||0,maxDailyXp:50}});
 }catch{return reply({ok:false,error:"PERSISTENCE_UNAVAILABLE"},503);}
}
export async function POST(request:Request) {
 // Same-origin mutation. Do not accept cross-site cookie-authenticated writes.
 const origin=request.headers.get("origin");
 if(origin&&origin!==new URL(request.url).origin)return reply({ok:false,error:"ORIGIN_DENIED"},403);
 const access=await getSim5Access();
 if(!access.allowed||!access.userId)return reply({ok:false,error:"PREMIUM_REQUIRED"},403);
 const text=await request.text();if(text.length>500000)return reply({ok:false,error:"PAYLOAD_TOO_LARGE"},413);
 let body;try{body=JSON.parse(text)}catch{return reply({ok:false,error:"INVALID_JSON"},400);}
 if(!body||typeof body!=="object"||Array.isArray(body))return reply({ok:false,error:"INVALID_PAYLOAD"},400);
 try {
  const db=createLabsWriter();
  if(body.action==="start"){
   if(Object.keys(body).some(k=>!["action","locale","runId"].includes(k)))return reply({ok:false,error:"INVALID_PAYLOAD"},400);
   if(typeof body.runId!=="string"||!/^[0-9a-f-]{36}$/i.test(body.runId))return reply({ok:false,error:"INVALID_RUN_ID"},400);
   const {data:existing,error:readError}=await db.from("sim5_runs").select("id,revision").eq("id",body.runId).eq("user_id",access.userId).maybeSingle();
   if(readError)return reply({ok:false,error:"START_FAILED"},503);
   if(existing)return reply({ok:true,run:existing});
   const {data,error}=await db.from("sim5_runs").insert({id:body.runId,user_id:access.userId,locale:body.locale==="tr"?"tr":"en"}).select("id,revision").single();
   if(error)return reply({ok:false,error:"START_FAILED"},503);
   return reply({ok:true,run:data});
  }
  if(body.action!=="sync"||typeof body.runId!=="string"||!/^[0-9a-f-]{36}$/i.test(body.runId)||!Number.isSafeInteger(body.revision)||body.revision<0||Object.keys(body).some(k=>!["action","runId","revision","events"].includes(k)))return reply({ok:false,error:"INVALID_PAYLOAD"},400);
  const {data:run,error}=await db.from("sim5_runs").select("id,revision,events,status,started_at").eq("id",body.runId).eq("user_id",access.userId).maybeSingle();
  if(error)return reply({ok:false,error:"RUN_UNAVAILABLE"},503);
  if(!run)return reply({ok:false,error:"RUN_NOT_FOUND"},404);
  let verified;try{verified=verifyMissionLog(body.events,Math.max(0,Date.now()-Date.parse(run.started_at)))}catch{return reply({ok:false,error:"INVALID_MISSION_LOG"},400);}
  if(!isLogExtension(run.events,verified.log))return reply({ok:false,error:"LOG_CONFLICT"},409);
  const {data:result,error:saveError}=await db.rpc("save_sim5_run",{p_user_id:access.userId,p_run_id:run.id,p_revision:body.revision,p_events:verified.log,p_report:verified.summary,p_status:verified.status,p_score:verified.summary.score});
  if(saveError)return reply({ok:false,error:saveError.message.includes("CONFLICT")?"RUN_CONFLICT":"SAVE_FAILED"},saveError.message.includes("CONFLICT")?409:503);
  return reply({ok:true,...result});
 }catch{return reply({ok:false,error:"PERSISTENCE_UNAVAILABLE"},503);}
}
