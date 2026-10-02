"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, ShieldAlert, Sparkles, TriangleAlert } from "lucide-react";
import { hotWorkIncident, type IncidentChoice } from "@/lib/labs/scenarios/incident-simulator";
import s from "./incident.module.css";

type Props = { locale: string };
type Score = { safety: number; judgment: number; response: number };
type HistoryItem = { nodeId: string; nodeTitle: string; choice: IncidentChoice };

const clamp = (value: number) => Math.max(0, Math.min(100, value));

export default function IncidentSimulatorClient({ locale }: Props) {
  const isTr = locale === "tr";
  const scenario = hotWorkIncident;
  const [nodeId, setNodeId] = useState(scenario.start);
  const [score, setScore] = useState<Score>({ safety: 50, judgment: 50, response: 50 });
  const [selected, setSelected] = useState<IncidentChoice | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const node = useMemo(() => scenario.nodes.find((item) => item.id === nodeId) ?? scenario.nodes[0], [nodeId, scenario.nodes]);
  const finished = node.choices.length === 0;
  const criticalCount = history.filter((item) => item.choice.critical).length;
  const average = Math.round((score.safety + score.judgment + score.response) / 3);
  const eventNumber = history.length + (selected ? 0 : 1);

  const choose = (choice: IncidentChoice) => {
    if (selected || finished) return;
    setSelected(choice);
    setScore((current) => ({
      safety: clamp(current.safety + choice.impact.safety),
      judgment: clamp(current.judgment + choice.impact.judgment),
      response: clamp(current.response + choice.impact.response),
    }));
    setHistory((current) => [...current, { nodeId: node.id, nodeTitle: isTr ? node.titleTr : node.titleEn, choice }]);
  };

  const continueScenario = () => {
    if (!selected?.next) return;
    setNodeId(selected.next);
    setSelected(null);
  };

  const restart = () => {
    setNodeId(scenario.start);
    setScore({ safety: 50, judgment: 50, response: 50 });
    setSelected(null);
    setHistory([]);
  };

  const outcomeLabel = node.id === "finish-safe"
    ? (isTr ? "Kontrollü Sonuç" : "Controlled Outcome")
    : node.id === "finish-recovered"
      ? (isTr ? "Eskalasyon Sonrası Toparlanma" : "Recovered After Escalation")
      : (isTr ? "Kritik Başarısızlık" : "Critical Failure");

  const debrief = average >= 80 && criticalCount === 0
    ? (isTr ? "Karar zincirin değişen koşulları erken yakaladı ve kontrol hiyerarşisini korudu." : "Your decision chain caught changing conditions early and preserved the control hierarchy.")
    : criticalCount === 0
      ? (isTr ? "Genel yaklaşım kontrollüydü; bazı kararlar daha erken ve daha güçlü müdahale ile geliştirilebilir." : "The overall approach remained controlled, though some decisions could be strengthened by earlier intervention.")
      : (isTr ? "Kritik kararlar, tehlikenin ilerlemesine izin verdi. Debrief'te özellikle stop-work ve permit revalidation noktalarını incele." : "Critical decisions allowed the hazard to progress. Focus the debrief on stop-work timing and permit revalidation.");

  return (
    <div className={s.page}>
      <div className={s.background} aria-hidden="true"><div className={s.glowOne} /><div className={s.glowTwo} /></div>

      <header className={s.topbar}>
        <Link href={`/${locale}/labs`} className={s.back}><ArrowLeft size={17} /> {isTr ? "Labs'e dön" : "Back to Labs"}</Link>
        <div className={s.topMeta}><span>LAB / 002</span><span className={s.live}><i /> {isTr ? "CANLI" : "LIVE"}</span></div>
      </header>

      <section className={s.shell}>
        <div className={s.introRow}>
          <div>
            <p className={s.eyebrow}><Sparkles size={15} /> INCIDENT SIMULATOR / EXPERT</p>
            <h1>{isTr ? scenario.titleTr : scenario.titleEn}</h1>
            <p className={s.intro}>{isTr ? scenario.introTr : scenario.introEn}</p>
          </div>
          <div className={s.category}><span>{scenario.category}</span><b>{scenario.difficulty.toUpperCase()}</b></div>
        </div>

        <div className={s.scoreGrid}>
          <ScoreCard label={isTr ? "Güvenlik" : "Safety"} value={score.safety} />
          <ScoreCard label={isTr ? "Muhakeme" : "Judgment"} value={score.judgment} />
          <ScoreCard label={isTr ? "Müdahale" : "Response"} value={score.response} />
        </div>

        {!finished ? (
          <div className={s.gameGrid}>
            <article className={s.eventCard}>
              <div className={s.eventHead}><span>{String(eventNumber).padStart(2, "0")} / EVENT</span>{selected?.critical ? <span className={s.critical}><TriangleAlert size={14} /> {isTr ? "KRİTİK KARAR" : "CRITICAL DECISION"}</span> : null}</div>
              <p className={s.kicker}>{isTr ? "SAHA DURUMU" : "FIELD SITUATION"}</p>
              <h2>{isTr ? node.titleTr : node.titleEn}</h2>
              <p className={s.situation}>{isTr ? node.situationTr : node.situationEn}</p>

              <div className={s.choices}>
                {node.choices.map((choice, index) => (
                  <button key={choice.id} type="button" className={`${s.choice} ${selected?.id === choice.id ? s.choiceSelected : ""}`} onClick={() => choose(choice)} disabled={Boolean(selected)}>
                    <span className={s.choiceIndex}>{String.fromCharCode(65 + index)}</span>
                    <span>{isTr ? choice.labelTr : choice.labelEn}</span>
                    <ArrowRight size={17} />
                  </button>
                ))}
              </div>

              {selected && (
                <div className={`${s.consequence} ${selected.critical ? s.consequenceCritical : ""}`}>
                  <div className={s.consequenceTitle}>{selected.critical ? <TriangleAlert size={17} /> : <ShieldAlert size={17} />}<b>{isTr ? "KARAR SONUCU" : "DECISION CONSEQUENCE"}</b></div>
                  <p>{isTr ? selected.consequenceTr : selected.consequenceEn}</p>
                  <div className={s.impactRow}>
                    <Impact label={isTr ? "Güvenlik" : "Safety"} value={selected.impact.safety} />
                    <Impact label={isTr ? "Muhakeme" : "Judgment"} value={selected.impact.judgment} />
                    <Impact label={isTr ? "Müdahale" : "Response"} value={selected.impact.response} />
                  </div>
                  <button type="button" className={s.continueButton} onClick={continueScenario}>{isTr ? "Sonraki olaya geç" : "Continue to next event"}<ArrowRight size={17} /></button>
                </div>
              )}
            </article>

            <aside className={s.timeline}>
              <p className={s.kicker}>{isTr ? "KARAR ZİNCİRİ" : "DECISION CHAIN"}</p>
              {history.length === 0 ? <p className={s.empty}>{isTr ? "İlk kararını verdiğinde zincir burada oluşacak." : "Your decision chain will appear here after the first choice."}</p> : history.map((item, index) => (
                <div key={`${item.nodeId}-${index}`} className={s.historyItem}>
                  <span className={`${s.historyDot} ${item.choice.critical ? s.dotCritical : ""}`} />
                  <div><small>{String(index + 1).padStart(2, "0")}</small><b>{item.nodeTitle}</b><p>{isTr ? item.choice.labelTr : item.choice.labelEn}</p></div>
                </div>
              ))}
            </aside>
          </div>
        ) : (
          <section className={s.debrief}>
            <div className={s.outcomeTag}>{outcomeLabel}</div>
            <h2>{isTr ? node.titleTr : node.titleEn}</h2>
            <p className={s.outcomeText}>{isTr ? node.situationTr : node.situationEn}</p>
            <div className={s.resultGrid}>
              <div><span>{average}</span><small>{isTr ? "GENEL SKOR" : "OVERALL SCORE"}</small></div>
              <div><span>{history.length}</span><small>{isTr ? "KARAR" : "DECISIONS"}</small></div>
              <div><span>{criticalCount}</span><small>{isTr ? "KRİTİK HATA" : "CRITICAL ERRORS"}</small></div>
            </div>
            <div className={s.debriefNote}><b>Debrief</b><p>{debrief}</p></div>
            <div className={s.finalActions}><button type="button" onClick={restart}><RotateCcw size={17} /> {isTr ? "Tekrar oyna" : "Replay scenario"}</button><Link href={`/${locale}/labs`}>{isTr ? "Labs'e dön" : "Back to Labs"}<ArrowRight size={17} /></Link></div>
          </section>
        )}
      </section>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) {
  return <div className={s.scoreCard}><div><span>{label}</span><b>{value}</b></div><div className={s.track}><i style={{ width: `${value}%` }} /></div></div>;
}

function Impact({ label, value }: { label: string; value: number }) {
  return <span className={value >= 0 ? s.positive : s.negative}>{label} {value >= 0 ? `+${value}` : value}</span>;
}
