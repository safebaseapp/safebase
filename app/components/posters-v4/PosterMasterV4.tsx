import type { PosterDefinition } from "@/lib/posters-v2/types";
import {getPosterTechnicalProfile} from "@/lib/posters-v2/technical-profiles";
import Header from "./Header";
import PreJobStrip from "./PreJobStrip";
import RuleCard from "./RuleCard";
import BottomPanels from "./BottomPanels";
import Footer from "./Footer";
import styles from "./PosterLayout.module.css";

type Locale = "tr" | "en";

type Props = {
  locale: Locale;
  poster: PosterDefinition;
  qrPath?: string;
  companyLogoUrl?: string | null;
};

export default function PosterMasterV4({
  locale,
  poster,
  qrPath,
  companyLogoUrl,
}: Props) {
  return (
    <div
      id="safebase-poster"
      data-poster-code={poster.code}
      data-technical-review={getPosterTechnicalProfile(poster.code)?.reviewStatus ?? "missing-definition"}
      className={`${styles.poster} relative mx-auto box-border h-[1588px] w-[1123px] border-[8px] border-slate-950 bg-[#edf2f7] font-sans text-slate-950 shadow-2xl print:m-0 print:h-[420mm] print:w-[297mm] print:shadow-none`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        className="absolute left-4 top-4 origin-top-left"
        style={{
          // Preserve the 16px gutters on both sides after the existing 0.92 scale.
          width: "calc(108.695652% - 34.782609px)",
          transform: "scale(0.92)",
        }}
      >
        <Header
          locale={locale}
          poster={poster}
          qrPath={qrPath}
          companyLogoUrl={companyLogoUrl}
        />

        <PreJobStrip
          locale={locale}
          poster={poster}
        />

        <section className={styles.rules}>
          {poster.rules.map((rule) => (
            <RuleCard
              key={rule.number}
              locale={locale}
              rule={rule}
              posterCode={poster.code}
            />
          ))}
        </section>

        <BottomPanels
          locale={locale}
          poster={poster}
        />

        <Footer locale={locale} />
        <p className={styles.legend} data-critical-text>{locale==='tr'?'ZORUNLU: saha kontrolü · KOŞULLU ZORUNLU: koşul varsa bağlayıcı · DİKKAT: tehlike uyarısı. Hukuki kapsamı ayrıca doğrula.':'REQUIRED: work control · REQUIRED IF: binding when applicable · WARNING: hazard alert. Verify legal applicability separately.'}</p>
      </div>
    </div>
  );
}
