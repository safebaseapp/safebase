import Link from "next/link";
import {redirect} from "next/navigation";
import {createClient} from "@/utils/supabase/server";
import {createLabsWriter} from "@/lib/labs/admin-writer";
import {isAdminUser} from "@/lib/auth/access";
import {setMemberPlan,finalizeAndAward} from "./actions";

export default async function RewardsAdmin({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{notice?:string}>}){
 const {locale:raw}=await params;const locale=raw==="tr"?"tr":"en",tr=locale==="tr";
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();
 if(!user)redirect(`/${locale}/login?next=/${locale}/admin/rewards`);
 if(user.email?.trim().toLowerCase()!=="safebase.global@gmail.com"||!isAdminUser(user))redirect(`/${locale}/dashboard`);
 const db=createLabsWriter();
 const [{data:people,error:peopleError},{data:awards,error:awardError},{data:history,error:historyError}]=await Promise.all([
  db.from("profiles").select("id,full_name,email,plan,role,subscription_status,lemon_subscription_id").order("created_at",{ascending:false}).limit(150),
  db.from("premium_reward_grants").select("competition_month,placement,granted_days,starts_at,expires_at,revoked_at,user_id").order("competition_month",{ascending:false}).limit(30),
  db.from("admin_membership_audit").select("created_at,target_user_id,old_plan,new_plan,reason").order("created_at",{ascending:false}).limit(20)
 ]);
 const {notice}=await searchParams;
 const month=new Date();month.setUTCMonth(month.getUTCMonth()-1);
 const previousMonth=`${month.getUTCFullYear()}-${String(month.getUTCMonth()+1).padStart(2,"0")}`;
 return <main className="min-h-screen bg-slate-950 px-4 py-9 text-white sm:px-7"><div className="mx-auto max-w-6xl">
  <Link href={`/${locale}/admin/memberships`} className="text-sm font-bold text-cyan-300">← {tr?"Üyelik yönetimi":"Membership management"}</Link>
  <h1 className="mt-5 text-3xl font-black">{tr?"Yarışma Ödülleri ve Manuel Üyelik":"Competition Rewards & Manual Membership"}</h1>
  <p className="mt-2 text-sm text-slate-400">{tr?"1. sıra: 7 gün · 2. sıra: 3 gün · 3. sıra: 1 gün. Süreli Premium, ücretli abonelik planını değiştirmez.":"1st: 7 days · 2nd: 3 days · 3rd: 1 day. Temporary Premium does not alter paid subscriptions."}</p>
  {notice&&<p className="mt-4 rounded-xl border border-emerald-400/30 p-3 text-sm text-emerald-200">{notice}</p>}
  {(peopleError||awardError||historyError)&&<p className="mt-4 text-rose-300">{tr?"Bazı yönetici verileri yüklenemedi.":"Some admin data could not be loaded."}</p>}
  <section className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-5"><h2 className="text-lg font-bold">{tr?"Ay Sonu Ödüllerini Onayla":"Approve Month-End Rewards"}</h2>
  <p className="my-2 text-xs text-slate-400">{tr?"Yalnızca bitmiş aylar kesinleştirilebilir. Aynı ay için ödül ikinci kez verilmez. Bu işlem gerçek Premium hakkı tanımlar.":"Only closed months can be finalized. The same month cannot be rewarded twice. This grants real Premium access."}</p>
  <form action={finalizeAndAward} className="flex flex-wrap gap-2"><input type="hidden" name="locale" value={locale}/><input type="month" name="month" defaultValue={previousMonth} required className="rounded-lg border border-slate-700 bg-slate-900 p-2"/><button type="submit" className="rounded-lg bg-amber-400 px-4 py-2 font-bold text-slate-950">{tr?"Ayı Kesinleştir ve Ödülleri Ver":"Finalize & Grant Prizes"}</button></form></section>
  <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5"><h2 className="text-xl font-bold">{tr?"Üye Planlarını Elle Yönet":"Manage Member Plans Manually"}</h2>
  <p className="my-3 text-xs text-slate-400">{tr?"Ödeme ile yönetilen abonelikler ve admin hesapları korunur. Değişiklik nedeni zorunludur.":"Billing-managed subscriptions and admin accounts are protected. A reason is required."}</p>
  <div className="space-y-2">{(people??[]).map(p=><form key={p.id} action={setMemberPlan} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-slate-900/80 p-3">
   <input type="hidden" name="locale" value={locale}/><input type="hidden" name="userId" value={p.id}/>
   <div className="min-w-44 flex-1"><p className="font-semibold">{p.full_name||p.email||"User"}</p><p className="text-xs text-slate-500">{p.email} · {p.plan}</p></div>
   <select name="plan" defaultValue={p.plan||"free"} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"><option value="free">Free</option><option value="premium">Premium</option></select>
   <input name="reason" required minLength={5} maxLength={300} placeholder={tr?"Değişiklik nedeni":"Reason for change"} className="min-w-44 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"/>
   <button disabled={p.role==="admin"||Boolean(p.lemon_subscription_id)||["active","on_trial","past_due","paused"].includes(p.subscription_status||"")} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-30">{tr?"Kaydet":"Save"}</button>
  </form>)}</div></section>
  <section className="mt-6 grid gap-4 md:grid-cols-2"><article className="rounded-2xl border border-white/10 p-5"><h2 className="mb-3 font-bold">{tr?"Verilmiş Ödüller":"Award Grants"}</h2>{(awards??[]).map((a,i)=><p key={i} className="border-b border-white/10 py-2 text-xs text-slate-300">{a.competition_month} · #{a.placement} · {a.granted_days} {tr?"gün":"days"} · {a.revoked_at?"Revoked":a.expires_at}</p>)}</article>
  <article className="rounded-2xl border border-white/10 p-5"><h2 className="mb-3 font-bold">{tr?"Plan Değişikliği Günlüğü":"Plan Change Audit"}</h2>{(history??[]).map((h,i)=><p key={i} className="border-b border-white/10 py-2 text-xs text-slate-300">{h.created_at} · {h.old_plan} → {h.new_plan} · {h.reason}</p>)}</article></section>
 </div></main>;
}
