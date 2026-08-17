type Props = {
  className?: string;
};

export default function SernemLogo({ className = "" }: Props) {
  return (
    <div
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-blue-400/25 bg-gradient-to-br from-[#07152f] via-[#08265b] to-[#020817] shadow-[0_8px_28px_rgba(37,99,235,.28)] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        className="h-[39px] w-[39px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="sernemShield"
            x1="12"
            y1="7"
            x2="52"
            y2="57"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#22D3EE" />
            <stop offset="0.38" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#1D4ED8" />
          </linearGradient>

          <linearGradient
            id="sernemS"
            x1="19"
            y1="16"
            x2="47"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="0.52" stopColor="#E2E8F0" />
            <stop offset="1" stopColor="#94A3B8" />
          </linearGradient>

          <filter
            id="sernemGlow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="1.7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* OUTER SHIELD */}
        <path
          d="M32 5.5L53 13.5V28.5C53 42.3 45.1 52.7 32 59C18.9 52.7 11 42.3 11 28.5V13.5L32 5.5Z"
          stroke="url(#sernemShield)"
          strokeWidth="3.6"
          strokeLinejoin="round"
          filter="url(#sernemGlow)"
        />

        {/* INNER SHIELD DETAIL */}
        <path
          d="M32 11L47.5 17V28.2C47.5 38.5 41.8 46.7 32 52C22.2 46.7 16.5 38.5 16.5 28.2V17L32 11Z"
          stroke="#60A5FA"
          strokeOpacity="0.34"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* GEOMETRIC S */}
        <path
          d="M43.8 21.2C40.7 18.4 36.9 17 32.2 17C25.7 17 21.1 20.3 21.1 25.1C21.1 29.4 24.3 31.8 30.7 33.1L34.1 33.8C37.3 34.5 38.7 35.5 38.7 37C38.7 39 36.4 40.4 32.7 40.4C28.7 40.4 25.4 39 22.5 36.3L18.9 40.5C22.6 44.2 27.1 46 32.5 46C39.9 46 45 42.4 45 36.7C45 32.4 41.9 29.9 35.1 28.5L31.7 27.8C28.9 27.2 27.5 26.3 27.5 24.9C27.5 23.2 29.4 22.2 32.4 22.2C35.6 22.2 38.3 23.3 40.6 25.4L43.8 21.2Z"
          fill="url(#sernemS)"
        />

        {/* BLUE CUT / ACCENT */}
        <path
          d="M22 34.7L42.5 28.2"
          stroke="#2563EB"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* LOWER CHEVRON */}
        <path
          d="M24 49.5L32 53.2L40 49.5"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* SUBTLE LIGHT */}
      <div className="pointer-events-none absolute -right-2 -top-2 h-6 w-6 rounded-full bg-cyan-300/20 blur-lg" />
    </div>
  );
}
