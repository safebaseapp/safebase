import SignIcon from "./SignIcon";
import type { SafetySign, SignLocale } from "@/lib/safety-signs/types";
import { signQrAsset } from "@/lib/safety-signs/qr";

type Props = { sign: SafetySign; locale: SignLocale; compact?: boolean };

export default function SignRenderer({ sign, locale, compact = false }: Props) {
  return (
    <div data-safety-sign-renderer data-sign-slug={sign.slug}
      className="flex h-full w-full flex-col overflow-hidden rounded-[18px] border-[6px] border-white bg-white shadow-[0_20px_55px_rgba(0,0,0,0.34)]">
      <div data-sign-symbol className="flex min-h-0 flex-[72] items-center justify-center bg-white px-[8%] py-[7%]">
        <div className="h-full w-full"><SignIcon icon={sign.icon} /></div>
      </div>
      <div data-sign-title className={`flex min-h-0 flex-[13.2] items-center justify-center px-[6%] py-[2%] text-center ${
        sign.category === "prohibition" ? "bg-[#df111c] text-white" : sign.category === "warning" ? "bg-slate-950 text-white" : "bg-white text-slate-950"
      }`}>
        <h2 className={`${compact ? "text-[clamp(13px,2.5vw,21px)]" : "text-[clamp(16px,3.5vw,38px)]"} break-words font-black uppercase leading-[1.06] tracking-[-0.025em]`}>
          {sign.title[locale]}
        </h2>
      </div>
      <div data-sign-qr-footer className="flex min-h-0 flex-[14.8] items-center justify-between gap-2 border-t-2 border-slate-900 bg-white px-[4%] py-[1%] text-slate-950">
        <div className="min-w-0">
          <p className={compact ? "text-[10px] font-black" : "text-[clamp(10px,2vw,17px)] font-black"}>SERNEM.COM</p>
          <p className={compact ? "text-[8px]" : "text-[clamp(8px,1.5vw,13px)]"}>{locale === "tr" ? "Bu levhanın bilgi sayfası" : "This sign’s information page"}</p>
        </div>
        <div className="aspect-square h-full max-h-full shrink-0">
          <img data-sign-qr src={signQrAsset(sign.slug, locale)} alt={locale === "tr" ? "Bu Türkçe levha sayfasına QR" : "QR to this English sign page"}
            className="h-full w-full object-contain" />
        </div>
      </div>
    </div>
  );
}
