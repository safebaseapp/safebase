"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, LockKeyhole, RotateCcw, ShieldAlert, Sparkles, TriangleAlert } from "lucide-react";
import { incidentScenarios, type IncidentChoice } from "@/lib/labs/scenarios/incident-scenarios";
import { getIncidentCatalogItem } from "@/lib/labs/scenarios/incident-catalog";
import s from "./incident.module.css";

type Props = { locale: string; scenarioId: string; isAuthenticated: boolean };
type Score = { safety: number; judgment: number; response: number };
type HistoryItem = { nodeId: string; nodeTitle: string; choice: IncidentChoice };

const PENDING_ATTEMPT_KEY = "sernem_pending_incident_attempt";
const clamp = (value: number) => Math.max(0, Math.min(100, value));

export default function IncidentSimulatorClient({ locale, scenarioId, isAuthenticated }: Props) {
  const isTr = locale === "tr";
  const scenario = incidentScenarios[scenarioId];
  const catalogItem = getIncidentCatalogItem(scenarioId);
  const [nodeId, setNodeId] = useState(scenario.start);
  const [score, setScore] = useState<Score>({ safety: 100, judgment: 100, response: 100 });
  const [selected, setSelected] = useState<IncidentChoice | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const savedRef = useRef(false);

  const node = useMemo(() => scenario.nodes.find((item) => item.id === nodeId) ?? scenario.nodes[0], [nodeId, scenario.nodes]);
  const finished = node.choices.length === 0;
  const criticalCount = history.filter((item) => item.choice.critical).length;
  const average = Math.round((score.safety + score.judgment + score.response) / 3);
  const eventNumber = history.length + (selected ? 0 : 1);
  const displayDifficulty = (catalogItem?.difficulty ?? "basic").toUpperCase();
  const accessLabel = catalogItem?.access === "guest" ? (isTr ? "MİSAFİR" : "GUEST") : catalogItem?.access === "free" ? (isTr ? "ÜCRETSİZ ÜYE" : "FREE MEMBER") : "PREMIUM";

  const outcomeLabel = node.id === "finish-safe"
    ? (isTr ? "Kontrollü Sonuç" : "Controlled Outcome")
    : node.id === "finish-recovered"
      ? (isTr ? "Eskalasyon Sonrası Toparlanma" : "Recovered After Escalation")
      : (isTr ? "Kritik Başarısızlık" : "Critical Failure");

  const debrief = average === 100 && criticalCount === 0
    ? (isTr ? "Kusursuz karar zinciri. Tüm kritik kontrol noktalarında en güçlü seçeneği uyguladın." : "Perfect decision chain. You selected the strongest control at every critical point.")
    : average >= 80 && criticalCount === 0
      ? (isTr ? "Karar zincirin kontrollüydü; bazı tercihlerde daha güçlü bir müdahale ile puan kaybını önleyebilirdin." : "Your decision chain stayed controlled, but stronger choices at a few points would have prevented score loss.")
      : (isTr ? "Bazı kararlar riski büyüttü. Kişisel incelemede puan kaybettiğin adımları ve kritik seçimleri gözden geçir." : "Some decisions increased exposure. Review the steps where points were lost and any critical choices.");

  const buildAttemptPayload = () => {
    const decisions = history.map((item, index) => ({
      step: index + 1,
      nodeId: item.nodeId,
      nodeTitle: item.nodeTitle,
      choiceId: item.choice.id,
      choiceLabel: isTr ? item.choice.labelTr : item.choice.labelEn,
      consequence: isTr ? item.choice.consequenceTr : item.choice.consequenceEn,
      critical: Boolean(item.choice.critical),
      impact: item.choice.impact,
      impactTotal: item.choice.impact.safety + item.choice.impact.judgment + item.choice.impact.response,
    }));

    return {
      scenarioId,
      category: scenario.category,
      difficulty: catalogItem?.difficulty ?? "basic",
      locale,
      score: average,
      criticalCount,
      outcome: outcomeLabel,
      scores: score,
      decisions,
    };
  };

  useEffect(() => {
    if (!finished || savedRef.current || history.length === 0) return;
    savedRef.current = true;
    const payload = buildAttemptPayload();

    if (!isAuthenticated) {
      try { window.localStorage.setItem(PENDING_ATTEMPT_KEY, JSON.stringify(payload)); } catch {}
      return;
    }

    void fetch("/api/labs/incident-attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }, [average, catalogItem?.difficulty, criticalCount, finished, history, isAuthenticated, isTr, locale, outcomeLabel, scenario.category, scenarioId, score]);

  const choose = (choice: IncidentChoice) => {
    if (selected || finished) return;
    setSelected(choice);
    setScore((current) => ({
      safety: clamp(current.safety + Math.min(0, choice.impact.safety)),
      judgment: clamp(current.judgment + Math.min(0, choice.impact.judgment)),
      response: clamp(current.response + Math.min(0, choice.impact.response)),
    }));
    setHistory((current) => [...current, { nodeId: node.id, nodeTitle: isTr ? node.titleTr : node.titleEn, choice }]);
  };

  const continueScenario = () => {
    if (!selected?.next) return;
    setNodeId(selected.next);
    setSelected(null);
  };

  const restart = () => {
    savedRef.current = false;
    setNodeId(scenario.start);
    setScore({ safety: 100, judgment: 100, response: 100 });
    setSelected(null);
    setHistory([]);
  };

  return (
    <div className={s.page}>
      <div className={s.background} aria-hidden="true"><div className={s.glowOne} /><div className={s.glowTwo} /></div>
      <header className={s.topbar}>
        <Link href={`/${locale}/labs/incident-simulator`} className={s.back}><ArrowLeft size={17} /> {isTr ? "Senaryolara dön" : "Back to scenarios"}</Link>
        <div className={s.topMeta}><span>LAB / 002</span><span className={s.live}><i /> {accessLabel}</span></div>
      </header>
      <section className={s.shell}>
        <div className={s.introRow}>
          <div><p className={s.eyebrow}><Sparkles size={15} /> INCIDENT SIMULATOR / {displayDifficulty}</p><h1>{isTr ? scenario.titleTr : scenario.titleEn}</h1><p className={s.intro}>{isTr ? scenario.introTr : scenario.introEn}</p></div>
          <div className={s.category}><span>{scenario.category}</span><b>{displayDifficulty}</b></div>
        </div>
        <div className={s.scoreGrid}><ScoreCard label={isTr ? "Güvenlik" : "Safety"} value={score.safety} /><ScoreCard label={isTr ? "Muhakeme" : "Judgment"} value={score.judgment} /><ScoreCard label={isTr ? "Müdahale" : "Response"} value={score.response} /></div>
        {!finished ? (
          <div className={s.gameGrid}>
            <article className={s.eventCard}>
              <div className={s.eventHead}><span>{String(eventNumber).padStart(2, "0")} / EVENT</span>{selected?.critical ? <span className={s.critical}><TriangleAlert size={14} /> {isTr ? "KRİTİK KARAR" : "CRITICAL DECISION"}</span> : null}</div>
              <p className={s.kicker}>{isTr ? "SAHA DURUMU" : "FIELD SITUATION"}</p><h2>{isTr ? node.titleTr : node.titleEn}</h2><p className={s.situation}>{isTr ? node.situationTr : node.situationEn}</p>
              <div className={s.choices}>{node.choices.map((choice, index) => <button key={choice.id} type="button" className={`${s.choice} ${selected?.id === choice.id ? s.choiceSelected : ""}`} onClick={() => choose(choice)} disabled={Boolean(selected)}><span className={s.choiceIndex}>{String.fromCharCode(65 + index)}</span><span>{isTr ? choice.labelTr : choice.labelEn}</span><ArrowRight size={17} /></button>)}</div>
              {selected && <div className={`${s.consequence} ${selected.critical ? s.consequenceCritical : ""}`}><div className={s.consequenceTitle}>{selected.critical ? <TriangleAlert size={17} /> : <ShieldAlert size={17} />}<b>{isTr ? "KARAR SONUCU" : "DECISION CONSEQUENCE"}</b></div><p>{isTr ? selected.consequenceTr : selected.consequenceEn}</p><div className={s.impactRow}><Impact label={isTr ? "Güvenlik" : "Safety"} value={selected.impact.safety} /><Impact label={isTr ? "Muhakeme" : "Judgment"} value={selected.impact.judgment} /><Impact label={isTr ? "Müdahale" : "Response"} value={selected.impact.response} /></div><button type="button" className={s.continueButton} onClick={continueScenario}>{isTr ? "Sonraki olaya geç" : "Continue to next event"}<ArrowRight size={17} /></button></div>}
            </article>
            <aside className={s.timeline}><p className={s.kicker}>{isTr ? "KARAR ZİNCİRİ" : "DECISION CHAIN"}</p>{history.length === 0 ? <p className={s.empty}>{isTr ? "İlk kararını verdiğinde zincir burada oluşacak." : "Your decision chain will appear here after the first choice."}</p> : history.map((item, index) => <div key={`${item.nodeId}-${index}`} className={s.historyItem}><span className={`${s.historyDot} ${item.choice.critical ? s.dotCritical : ""}`} /><div><small>{String(index + 1).padStart(2, "0")}</small><b>{item.nodeTitle}</b><p>{isTr ? item.choice.labelTr : item.choice.labelEn}</p></div></div>)}</aside>
          </div>
        ) : (
          <section className={s.debrief}><div className={s.outcomeTag}>{outcomeLabel}</div><h2>{isTr ? node.titleTr : node.titleEn}</h2><p className={s.outcomeText}>{isTr ? node.situationTr : node.situationEn}</p><div className={s.resultGrid}><div><span>{average}</span><small>{isTr ? "GENEL SKOR" : "OVERALL SCORE"}</small></div><div><span>{history.length}</span><small>{isTr ? "KARAR" : "DECISIONS"}</small></div><div><span>{criticalCount}</span><small>{isTr ? "KRİTİK HATA" : "CRITICAL ERRORS"}</small></div></div>{isAuthenticated ? <div className={s.debriefNote}><b>Debrief</b><p>{debrief}</p></div> : <div className={s.debriefNote}><b><LockKeyhole size={16} /> {isTr ? "Nerede hata yaptın?" : "Where did you lose points?"}</b><p>{isTr ? "Karar karar kişisel analizini ve önceki denemelerini görmek için ücretsiz hesabınla giriş yap. Bu denemen girişten sonra otomatik olarak hesabına aktarılacak." : "Sign in free to review every decision and previous attempts. This attempt will be imported automatically after sign-in."}</p></div>}<div className={s.finalActions}><button type="button" onClick={restart}><RotateCcw size={17} /> {isTr ? "Tekrar oyna" : "Replay scenario"}</button>{isAuthenticated ? <Link href={`/${locale}/dashboard/labs`}>{isTr ? "Hatalarımı incele" : "Review my decisions"}<ArrowRight size={17} /></Link> : <Link href={`/${locale}/login?next=${encodeURIComponent(`/${locale}/dashboard/labs`)}`}>{isTr ? "Ücretsiz giriş yap" : "Sign in free"}<ArrowRight size={17} /></Link>}</div></section>
        )}
      </section>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) { return <div className={s.scoreCard}><div><span>{label}</span><b>{value}</b></div><div className={s.track}><i style={{ width: `${value}%` }} /></div></div>; }
function Impact({ label, value }: { label: string; value: number }) { return <span className={value >= 0 ? s.positive : s.negative}>{label} {value >= 0 ? `+${value}` : value}</span>; }
