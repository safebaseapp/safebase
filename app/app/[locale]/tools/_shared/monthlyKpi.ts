import type {createClient} from '@/utils/supabase/client';
import type {CalculationDraft} from './CalculatorHandoff';
type Client=ReturnType<typeof createClient>;
const fields={trir:'recordable_cases',ltifr:'lti','severity-rate':'lost_days',dart:'dart_cases'} as const;
export type MonthlyInput={source:keyof typeof fields;hours:number;count:number;period:string;project:string};
export type MonthlyReview={input:MonthlyInput;userId:string;existing:{id:string;worked_hours:number;recordable_cases:number;lti:number;lost_days:number;dart_cases:number;updated_at:string|null}|null};
export function monthlyInput(draft:CalculationDraft,period:string,project:string):MonthlyInput{
 if(!(draft.source in fields)||draft.kind!=='lagging'||draft.basis!=='actual')throw Error('INVALID');
 const source=draft.source as MonthlyInput['source'],hours=Number(draft.inputs.worked_hours),count=Number(draft.inputs[fields[source]]);
 if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(period)||Number(period.slice(0,4))<1900||Number(period.slice(0,4))>2100||!project.trim()||project.trim().length>200||!Number.isFinite(hours)||hours<=0||hours>Number.MAX_SAFE_INTEGER||!Number.isInteger(count)||count<0||count>2147483647)throw Error('INVALID');
 return {source,hours,count,period:period+'-01',project:project.trim()};
}
export async function prepareMonthlyKpi(client:Client,input:MonthlyInput):Promise<MonthlyReview>{
 const {data,error}=await client.auth.getUser();if(error||!data.user)throw Error('AUTH');
 const {data:row,error:readError}=await client.from('hse_incident_metrics').select('id,worked_hours,recordable_cases,lti,lost_days,dart_cases,updated_at').eq('user_id',data.user.id).eq('period_month',input.period).eq('project_name',input.project).maybeSingle();
 if(readError)throw Error('READ');return {input,userId:data.user.id,existing:row};
}
/** Reuse the existing authenticated monthly metrics path. Never changes individual incident records. */
export async function commitMonthlyKpi(client:Client,review:MonthlyReview){
 const {data,error}=await client.auth.getUser();if(error||!data.user||data.user.id!==review.userId)throw Error('AUTH');
 const {input,existing}=review,field=fields[input.source];
 const payload={worked_hours:input.hours,[field]:input.count,updated_at:new Date().toISOString()};
 if(existing){
  // Compare-and-swap: even a concurrent hours/case edit cannot be silently overwritten.
  let query=client.from('hse_incident_metrics').update(payload).eq('id',existing.id).eq('user_id',review.userId).eq('period_month',input.period).eq('project_name',input.project).eq('worked_hours',existing.worked_hours).eq('recordable_cases',existing.recordable_cases).eq('lti',existing.lti).eq('lost_days',existing.lost_days).eq('dart_cases',existing.dart_cases);
  query=existing.updated_at===null?query.is('updated_at',null):query.eq('updated_at',existing.updated_at);
  const {data:row,error:writeError}=await query.select('id').maybeSingle();if(writeError)throw Error('WRITE');if(!row)throw Error('CONFLICT');
 }else{
  // Unique user/month/project constraint rejects a concurrent insert; never upsert over it.
  const {error:writeError}=await client.from('hse_incident_metrics').insert({...payload,user_id:review.userId,period_month:input.period,project_name:input.project});if(writeError)throw Error(writeError.code==='23505'?'CONFLICT':'WRITE');
 }
}
