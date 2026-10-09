"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { createLabsWriter } from "@/lib/labs/admin-writer";
import { isAdminUser } from "@/lib/auth/access";

const OWNER_EMAIL = "safebase.global@gmail.com";
async function owner() {
 const client=await createClient();
 const {data:{user}}=await client.auth.getUser();
 if(!user || user.email?.trim().toLowerCase()!==OWNER_EMAIL || !isAdminUser(user)) throw new Error("NOT_AUTHORIZED");
 return user;
}
function loc(form:FormData){return form.get("locale")==="tr"?"tr":"en";}
function uuid(v:string){return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);}

export async function setMemberPlan(form: FormData) {
 const actor=await owner();
 const locale=loc(form);
 const target=String(form.get("userId")??"");
 const plan=String(form.get("plan")??"");
 const reason=String(form.get("reason")??"").trim();
 if(!uuid(target)|| !["free","premium"].includes(plan) || reason.length<5 || reason.length>300) throw new Error("INVALID_PLAN_REQUEST");
 const db=createLabsWriter();
 const {data:profile,error}=await db.from("profiles").select("id,plan,role,lemon_subscription_id,subscription_status").eq("id",target).single();
 if(error||!profile) throw new Error("USER_NOT_FOUND");
 if(profile.role==="admin" || target===actor.id) throw new Error("ADMIN_ACCOUNT_PROTECTED");
 if(profile.lemon_subscription_id || ["active","on_trial","past_due","paused"].includes(String(profile.subscription_status))) throw new Error("PAID_SUBSCRIPTION_MANAGED_BY_BILLING");
 if(profile.plan===plan) redirect(`/${locale}/admin/rewards?notice=unchanged`);
 const {error:writeError}=await db.from("profiles").update({plan,updated_at:new Date().toISOString()}).eq("id",target).eq("plan",profile.plan);
 if(writeError) throw new Error("PLAN_CHANGE_FAILED");
 await db.from("admin_membership_audit").insert({actor_id:actor.id,target_user_id:target,old_plan:profile.plan,new_plan:plan,reason});
 revalidatePath(`/${locale}/admin/rewards`);
 redirect(`/${locale}/admin/rewards?notice=plan-updated`);
}

export async function finalizeAndAward(form:FormData){
 const actor=await owner();
 const locale=loc(form);
 const raw=String(form.get("month")??"");
 if(!/^\d{4}-\d{2}$/.test(raw)) throw new Error("INVALID_MONTH");
 const month=`${raw}-01`;
 const db=createLabsWriter();
 const {error}=await db.rpc("award_finalized_labs_month",{p_month:month,p_actor:actor.id});
 if(error) throw new Error(`REWARD_FINALIZATION_FAILED: ${error.message}`);
 revalidatePath(`/${locale}/admin/rewards`);
 redirect(`/${locale}/admin/rewards?notice=awards-issued`);
}
