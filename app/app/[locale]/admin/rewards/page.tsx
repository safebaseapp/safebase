import Link from "next/link";
import {redirect} from "next/navigation";
import {createClient} from "@/utils/supabase/server";
import {createLabsWriter} from "@/lib/labs/admin-writer";
import {isAdminUser} from "@/lib/auth/access";
import {setMemberPlan,finalizeAndAward,grantTemporaryPremium,revokeTemporaryPremium} from "./actions";

export default async function RewardsAdmin({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{notice?:string;month?:string}>}){
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
 const {notice,month:requestedMonth}=await searchParams;
 const month=new Date();month.setUTCMonth(month.getUTCMonth()-1);
 const previousMonth=`${month.getUTCFullYear()}-${String(month.getUTCMonth()+1).padStart(2,"0")}`;
 const selectedMonth=/^\d{4}-\d{2}$/.test(requestedMonth??"")?requestedMonth!:previousMonth;
 const {data:preview}=await db.rpc("preview_labs_monthly_results",{p_month:`${selectedMonth}-01`});
 const {data:manualGrants}=await db.from("manual_premium_grants").select("id,user_id,days,expires_at,revoked_at,reason").order("granted_at",{ascending:false}).limit(30);
 const nameById=new Map((people??[]).map(p=>[p.id,p.full_name||p.email||p.id]));
 return <main className="min-h-screen bg-slate-950 px-4 py-9 text-white sm:px-7"><div className="mx-auto max-w-6xl">
  <Link href={`/${locale}/admin/memberships`} className="text-sm font-bold text-cyan-300">← {tr?"Üyelik yönetimi":"Membership management"}</Link>
  <h1 className="mt-5 text-3xl font-black">{tr?"Yarışma Ödülleri ve Manuel Üyelik":"Competition Rewards & Manual Membership"}</h1>
  <p className="mt-2 text-sm text-slate-400">{tr?"1. sıra: 7 gün · 2. sıra: 3 gün · 3. sıra: 1 gün. Süreli Premium, ücretli abonelik planını değiştirmez.":"1st: 7 days · 2nd: 3 days · 3rd: 1 day. Temporary Premium does not alter paid subscriptions."}</p>
  {notice&&<p className="mt-4 rounded-xl border border-emerald-400/30 p-3 text-sm text-emerald-200">{notice}</p>}
  {(peopleError||awardError||historyError)&&<p className="mt-4 text-rose-300">{tr?"Bazı yönetici verileri yüklenemedi.":"Some admin data could not be loaded."}</p>}
  <section className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-5"><h2 className="text-lg font-bold">{tr?"Ay Sonu Ödüllerini Onayla":"Approve Month-End Rewards"}</h2>
  <p className="my-2 text-xs text-slate-400">{tr?"Yalnızca bitmiş aylar kesinleştirilebilir. Aynı ay için ödül ikinci kez verilmez. Bu işlem gerçek Premium hakkı tanımlar.":"Only closed months can be finalized. The same month cannot be rewarded twice. This grants real Premium access."}</p>
  <form method="get" className="mb-4 flex gap-2"><input type="month" name="month" defaultValue={selectedMonth} className="rounded-lg border border-slate-700 bg-slate-900 p-2"/><button className="rounded-lg border border-white/20 px-4 py-2">{tr?"Önizle":"Preview"}</button></form>
  <div className="mb-4 space-y-2">{(preview??[]).slice(0,3).map((r:{rank:number;user_id:string;monthly_xp:number})=><div key={r.rank} className="flex justify-between rounded-xl bg-white/5 p-3 text-sm"><span>#{r.rank} · {nameById.get(r.user_id)??r.user_id}</span><span>{r.monthly_xp} XP · {r.rank===1?7:r.rank===2?3:1} {tr?"gün":"days"}</span></div>)}</div>
  <form action={finalizeAndAward} className="flex flex-wrap items-center gap-2"><input type="hidden" name="locale" value={locale}/><input type="hidden" name="month" value={selectedMonth}/><label className="text-xs text-amber-200">{tr?"Onaylamak için aynen yaz:":"Type to confirm:"} AWARD {selectedMonth}</label><input name="confirm" required placeholder={`AWARD ${selectedMonth}`} className="rounded-lg border border-amber-300/30 bg-slate-950 p-2"/><button type="submit" className="rounded-lg bg-amber-400 px-4 py-2 font-bold text-slate-950">{tr?"Kesinleştir ve Ödüllendir":"Finalize & Award"}</button></form></section>
  <section className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-5"><h2 className="text-xl font-bold">{tr?"Süreli Premium Hediye Et":"Grant Temporary Premium"}</h2><p className="my-3 text-xs text-slate-400">{tr?"Kullanıcının asıl planı değiştirilmez. Süre dolduğunda erişim otomatik sona erer.":"The user's base plan stays unchanged. Access expires automatically."}</p>
  <form action={grantTemporaryPremium} className="flex flex-wrap gap-2"><input type="hidden" name="locale" value={locale}/><select name="userId" required className="min-w-48 rounded-lg border border-slate-700 bg-slate-950 p-2">{(people??[]).filter(p=>p.role!=="admin").map(p=><option key={p.id} value={p.id}>{p.full_name||p.email||p.id}</option>)}</select><select name="days" className="rounded-lg border border-slate-700 bg-slate-950 p-2">{[1,3,7,30].map(d=><option key={d} value={d}>{d} {tr?"gün":"days"}</option>)}</select><input name="reason" required minLength={5} maxLength={300} placeholder={tr?"Hediye nedeni":"Gift reason"} className="min-w-44 flex-1 rounded-lg border border-slate-700 bg-slate-950 p-2"/><button className="rounded-lg bg-cyan-500 px-4 py-2 font-bold text-slate-950">{tr?"Süreli Premium Ver":"Grant Premium"}</button></form>
  <h3 className="mt-6 font-semibold">{tr?"Manuel Hediyeler":"Manual Gifts"}</h3><div className="mt-2 space-y-2">{(manualGrants??[]).map(g=><div key={g.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 p-2 text-xs"><span>{nameById.get(g.user_id)??g.user_id} · {g.days} {tr?"gün":"days"} · {g.expires_at} · {g.revoked_at?(tr?"İptal":"Revoked"):g.reason}</span>{!g.revoked_at&&<form action={revokeTemporaryPremium} className="flex gap-2"><input type="hidden" name="locale" value={locale}/><input type="hidden" name="grantId" value={g.id}/><input name="confirm" placeholder="REVOKE" required className="w-24 rounded border border-slate-700 bg-slate-950 p-1"/><button className="rounded bg-rose-600 px-3 py-1">{tr?"İptal Et":"Revoke"}</button></form>}</div>)}</div></section>
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
