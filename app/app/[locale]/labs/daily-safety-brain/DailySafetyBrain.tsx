"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, ShieldCheck } from "lucide-react";

type Locale = "tr" | "en";
type Bilingual = { tr: string; en: string };
type Question = { id: string; topic: Bilingual; question: Bilingual; answers: Bilingual[]; correct: number; explanation: Bilingual };
const questionBank: Question[] = [
  { id: "hot-work", topic: { tr: "Sıcak çalışma", en: "Hot work" }, question: { tr: "Kaynak başlamadan önce yanıcı malzemeler için en doğru adım hangisidir?", en: "What is the best action for combustibles before welding starts?" }, answers: [{ tr: "İşi hızlandırmak için bekletmek", en: "Leave them to save time" }, { tr: "Uzaklaştırmak veya uygun şekilde korumak", en: "Remove or suitably protect them" }, { tr: "Yalnızca kaynakçıya haber vermek", en: "Only tell the welder" }], correct: 1, explanation: { tr: "Sıcak çalışma öncesi yangın tehlikeleri kontrol edilmeli, yanıcılar uzaklaştırılmalı veya korunmalıdır.", en: "Before hot work, control fire hazards and remove or adequately protect combustibles." } },
  { id: "confined-space", topic: { tr: "Kapalı alan", en: "Confined space" }, question: { tr: "Kapalı alan girişinden önce hangi kontrol kritik önemdedir?", en: "Which check is critical before confined-space entry?" }, answers: [{ tr: "Sadece kapının açık olması", en: "The door is open" }, { tr: "Yalnızca amirin sözlü onayı", en: "Only verbal supervisor approval" }, { tr: "İzin, atmosfer testi ve kurtarma hazırlığı", en: "Permit, atmospheric testing and rescue readiness" }], correct: 2, explanation: { tr: "Giriş koşulları, atmosfer, izolasyon, gözcü ve kurtarma düzeni girişten önce doğrulanmalıdır.", en: "Verify entry conditions, atmosphere, isolation, attendant and rescue arrangements before entry." } },
  { id: "lifting", topic: { tr: "Kaldırma", en: "Lifting" }, question: { tr: "Askıdaki yükün altına girilmek istendiğinde ne yapılmalı?", en: "What should happen if someone tries to go under a suspended load?" }, answers: [{ tr: "Geçmesine izin vermek", en: "Allow them to pass" }, { tr: "Girişi durdurmak ve dışlama bölgesini korumak", en: "Stop entry and maintain the exclusion zone" }, { tr: "Yükü daha hızlı kaldırmak", en: "Hoist faster" }], correct: 1, explanation: { tr: "Askıdaki yük altında personel bulunmamalı; bariyer ve iletişim korunmalıdır.", en: "People must stay out from under suspended loads; maintain barriers and communication." } },
  { id: "loto", topic: { tr: "LOTO", en: "Lockout/tagout" }, question: { tr: "Bakım öncesi enerji izolasyonu nasıl doğrulanır?", en: "How should energy isolation be verified before maintenance?" }, answers: [{ tr: "Sadece durdurma düğmesiyle", en: "Only with the stop button" }, { tr: "Yetkili izolasyon ve sıfır enerji kontrolüyle", en: "By authorized isolation and zero-energy verification" }, { tr: "Operatörün tahminiyle", en: "By operator estimation" }], correct: 1, explanation: { tr: "Enerji kaynakları izole edilmeli, kilitlenmeli ve işe başlamadan önce sıfır enerji doğrulanmalıdır.", en: "Energy sources must be isolated, locked out and verified at zero energy before work." } },
  { id: "height", topic: { tr: "Yüksekte çalışma", en: "Working at height" }, question: { tr: "Kenar koruması olmayan platformda ilk yaklaşım nedir?", en: "What is the first approach to an unprotected platform edge?" }, answers: [{ tr: "İşe hemen başlamak", en: "Start work immediately" }, { tr: "Önce toplu düşme koruması ve güvenli erişimi sağlamak", en: "Establish collective fall protection and safe access first" }, { tr: "Sadece uyarı levhası asmak", en: "Only post a warning sign" }], correct: 1, explanation: { tr: "Mümkünse toplu koruma önceliklidir; çalışma koşulları güvenli değilse işe başlanmaz.", en: "Prefer collective protection where practicable; do not start until conditions are safe." } },
  { id: "chemical", topic: { tr: "Kimyasal güvenlik", en: "Chemical safety" }, question: { tr: "Bilinmeyen bir kimyasalla çalışmadan önce hangi belge incelenir?", en: "Which document should be reviewed before using an unfamiliar chemical?" }, answers: [{ tr: "SDS / Güvenlik Bilgi Formu", en: "Safety Data Sheet (SDS)" }, { tr: "Sadece satın alma fişi", en: "Only the purchase receipt" }, { tr: "İş programı", en: "Work schedule" }], correct: 0, explanation: { tr: "SDS; maruziyet, KKD, depolama ve acil müdahale önlemlerini açıklar.", en: "The SDS describes exposure, PPE, storage and emergency response controls." } },
  { id: "scaffold", topic: { tr: "İskele", en: "Scaffolding" }, question: { tr: "İskelede güvenli kullanım öncesi ne doğrulanmalıdır?", en: "What must be confirmed before using a scaffold?" }, answers: [{ tr: "Sadece iskele rengi", en: "Only its color" }, { tr: "Yetkili kontrol, uygun erişim ve kullanım durumu", en: "Competent inspection, safe access and usable status" }, { tr: "Yakındaki işçilerin sayısı", en: "Number of nearby workers" }], correct: 1, explanation: { tr: "İskelenin kontrol durumu, platformu, erişimi ve korumaları doğrulanmalıdır.", en: "Verify inspection status, platforms, access and protective measures." } },
  { id: "near-miss", topic: { tr: "Ramak kala", en: "Near miss" }, question: { tr: "Yaralanma olmadan gerçekleşen ciddi bir ramak kala için doğru davranış nedir?", en: "What is the right response to a serious near miss without injury?" }, answers: [{ tr: "Kimse zarar görmediği için raporlamamak", en: "Do not report as nobody was hurt" }, { tr: "Sadece arkadaşlarla konuşmak", en: "Only discuss with coworkers" }, { tr: "Raporlamak ve tekrarını önleyecek önlemleri belirlemek", en: "Report and identify preventive controls" }], correct: 2, explanation: { tr: "Ramak kala olayları, gerçekleşmiş bir zararı beklemeden öğrenme fırsatı sağlar.", en: "Near misses provide learning opportunities before harm occurs." } },
  { id: "simops", topic: { tr: "SIMOPS", en: "SIMOPS" }, question: { tr: "Aynı alanda kaldırma ve sıcak çalışma planlanıyorsa ne yapılmalı?", en: "What should be done when lifting and hot work are planned in the same area?" }, answers: [{ tr: "Ekipleri birbirinden habersiz çalıştırmak", en: "Let crews work independently without coordination" }, { tr: "Eş zamanlı riskleri değerlendirmek ve işleri koordine etmek", en: "Assess simultaneous risks and coordinate the work" }, { tr: "Sadece bir uyarı afişi asmak", en: "Only display a warning poster" }], correct: 1, explanation: { tr: "Çakışan işler izin, alan kontrolü ve iletişim açısından birlikte değerlendirilmelidir.", en: "Overlapping work must be coordinated through permits, area controls and communication." } },
  { id: "housekeeping", topic: { tr: "Saha düzeni", en: "Housekeeping" }, question: { tr: "Yaya yolunda kablo ve hortumlar varsa en iyi önlem nedir?", en: "What is the best control for cables and hoses across a walkway?" }, answers: [{ tr: "Görmezden gelmek", en: "Ignore them" }, { tr: "Güvenli güzergâha almak veya uygun geçiş koruması sağlamak", en: "Reroute safely or provide proper crossing protection" }, { tr: "Üzerinden dikkatlice atlamak", en: "Step over carefully" }], correct: 1, explanation: { tr: "Takılma ve düşme risklerini kaynağında azaltmak, sadece uyarıya güvenmekten daha etkilidir.", en: "Remove trip hazards at the source rather than relying only on warnings." } },
];

const dayId = (date: Date) => Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86400000);
function dailyQuestions(day: number) {
  return questionBank.map((question, index) => ({ question, order: (Math.imul(index + 1, 2654435761) ^ Math.imul(day, 2246822519)) >>> 0 }))
    .sort((a, b) => a.order - b.order).slice(0, 5).map((entry) => entry.question);
}
type Saved = { day: number; answers: number[] };

export default function DailySafetyBrain({ locale }: { locale: Locale }) {
  const tr = locale === "tr";
  const [day, setDay] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  useEffect(() => {
    const currentDay = dayId(new Date());
    setDay(currentDay);
    try {
      const saved = JSON.parse(window.localStorage.getItem("sernem_daily_brain_v1") || "null") as Saved | null;
      if (saved?.day === currentDay && Array.isArray(saved.answers)) {
        setAnswers(saved.answers.filter((x) => Number.isInteger(x) && x >= 0 && x <= 2).slice(0, 5));
      }
    } catch { /* private browsing may disable storage */ }
  }, []);
  const questions = useMemo(() => day === null ? [] : dailyQuestions(day), [day]);
  const currentIndex = answers.length;
  const complete = questions.length > 0 && currentIndex === questions.length;
  const score = questions.reduce((total, q, index) => total + (answers[index] === q.correct ? 1 : 0), 0);
  function answer(index: number) {
    if (day === null || currentIndex >= questions.length) return;
    const next = [...answers, index];
    setAnswers(next);
    try { window.localStorage.setItem("sernem_daily_brain_v1", JSON.stringify({ day, answers: next })); } catch { /* optional local history */ }
  }
  function reset() {
    setAnswers([]);
    try { window.localStorage.removeItem("sernem_daily_brain_v1"); } catch { /* optional */ }
  }
  return (
    <main className="min-h-screen bg-[#030b19] px-4 py-12 text-white sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Link href={`/${locale}/labs`} className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300"><ArrowLeft size={17} /> HSE Labs</Link>
        <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#112849] to-[#071323] p-6 shadow-2xl sm:p-10">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-300"><ShieldCheck size={18} /> DAILY SAFETY BRAIN</div>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">{tr ? "Bugünün güvenlik meydan okuması" : "Today's safety challenge"}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-300">{tr ? "Her gün aynı 5 saha sorusu. Kısa bir test, hemen açıklanan sonuçlar. Yeni set UTC gece yarısında açılır." : "Five consistent questions each day. Quick answers and clear feedback. A new set opens at midnight UTC."}</p>
          {day === null ? <p className="mt-8 text-slate-300">{tr ? "Hazırlanıyor..." : "Preparing..."}</p> : (
            <>
              <div className="mt-8 flex items-center justify-between gap-3 text-xs font-bold text-slate-400">
                <span>{complete ? (tr ? "Tamamlandı" : "Completed") : `${Math.min(currentIndex + 1, 5)} / 5`}</span>
                <span>{tr ? "Doğru" : "Correct"}: {score} / 5</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${currentIndex * 20}%` }} /></div>
              {complete ? (
                <div className="mt-9 text-center">
                  <CheckCircle2 className="mx-auto text-emerald-300" size={42} />
                  <p className="mt-3 text-5xl font-black">{score} / 5</p>
                  <h2 className="mt-3 text-2xl font-bold">{tr ? "Günlük testi bitirdin!" : "Daily challenge complete!"}</h2>
                  <p className="mt-3 text-slate-300">{tr ? "Sonucun bu tarayıcıda saklandı. Bu aşamada XP veya global sıralama puanı verilmez." : "Your result is saved in this browser. This version does not award XP or leaderboard points."}</p>
                  <button onClick={reset} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-bold"><RotateCcw size={17} />{tr ? "Tekrar çöz" : "Try again"}</button>
                </div>
              ) : (
                <div className="mt-8">
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200">{questions[currentIndex]?.topic[locale]}</span>
                  <h2 className="mt-5 text-xl font-black leading-snug sm:text-2xl">{questions[currentIndex]?.question[locale]}</h2>
                  <div className="mt-6 grid gap-3">{questions[currentIndex]?.answers.map((option, index) => (
                    <button key={index} type="button" onClick={() => answer(index)} className="min-h-14 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-4 text-left text-sm font-semibold transition hover:border-cyan-400/60 hover:bg-cyan-400/10">
                      <span className="mr-3 text-cyan-300">{String.fromCharCode(65 + index)}.</span>{option[locale]}
                    </button>
                  ))}</div>
                  {currentIndex > 0 && <div className="mt-7 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300"><p className="font-bold text-white">{answers[currentIndex - 1] === questions[currentIndex - 1].correct ? (tr ? "Önceki cevap doğru" : "Previous answer correct") : (tr ? "Önceki cevap yanlış" : "Previous answer incorrect")}</p><p className="mt-2 leading-6">{questions[currentIndex - 1].explanation[locale]}</p></div>}
                </div>
              )}
            </>
          )}
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">{tr ? "Bu bilgi testi saha izinlerinin veya yerel güvenlik prosedürlerinin yerine geçmez." : "This knowledge challenge does not replace site permits or local safety procedures."}</p>
        <Link href={`/${locale}/labs`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">{tr ? "Diğer Labs modülleri" : "Explore other Labs"} <ArrowRight size={15} /></Link>
      </div>
    </main>
  );
}
