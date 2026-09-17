import SignIcon from "./SignIcon";
import type {
  SafetySign,
  SignLocale,
} from "@/lib/safety-signs/types";

type Props = {
  sign: SafetySign;
  locale: SignLocale;
  compact?: boolean;
};

export default function SignRenderer({
  sign,
  locale,
  compact = false,
}: Props) {
  const title = sign.title[locale];

  const titleSize = compact
    ? "text-[21px]"
    : "text-[38px]";

  return (
    <div
      data-safety-sign-renderer
      className="flex h-full w-full flex-col overflow-hidden rounded-[18px] border-[6px] border-white bg-white shadow-[0_20px_55px_rgba(0,0,0,0.34)]"
    >
      <div className="flex min-h-0 flex-[72] items-center justify-center bg-white px-[8%] py-[7%]">
        <div className="h-full w-full">
          <SignIcon icon={sign.icon} />
        </div>
      </div>

      <div
        className={`flex min-h-0 flex-[28] items-center justify-center px-[8%] py-[5%] text-center ${
          sign.category === "prohibition"
            ? "bg-[#df111c] text-white"
            : sign.category === "warning"
              ? "bg-slate-950 text-white"
              : "bg-white text-slate-950"
        }`}
      >
        <h2
          className={`${titleSize} font-black uppercase leading-[1.06] tracking-[-0.025em]`}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}
