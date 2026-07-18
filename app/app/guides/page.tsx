import Link from "next/link";

const guides = [
  {
    title: "Hot Work",
    slug: "hot-work",
    icon: "🔥",
    description:
      "Practical guidance for welding, cutting, grinding, brazing, and other spark-producing activities.",
    topics: ["Hot work permit", "Fire watch", "Gas testing", "Fire prevention"],
  },
  {
    title: "Confined Space",
    slug: "confined-space",
    icon: "🕳️",
    description:
      "Essential controls for safe entry, atmospheric monitoring, ventilation, standby personnel, and rescue.",
    topics: ["Entry permit", "Gas testing", "Ventilation", "Rescue planning"],
  },
  {
    title: "Lockout Tagout",
    slug: "loto",
    icon: "🔒",
    description:
      "Control hazardous energy during inspection, maintenance, cleaning, repair, and equipment intervention.",
    topics: ["Isolation", "Zero energy", "Personal locks", "Verification"],
  },
  {
    title: "Personal Protective Equipment",
    slug: "ppe",
    icon: "🦺",
    description:
      "Guidance for selecting, inspecting, using, storing, and maintaining workplace protective equipment.",
    topics: ["Head protection", "Eye protection", "Gloves", "Respiratory PPE"],
  },
  {
    title: "Grinding Safety",
    slug: "grinding",
    icon: "⚙️",
    description:
      "Key controls for portable grinders, abrasive wheels, machine guards, flying particles, sparks, and PPE.",
    topics: ["Wheel inspection", "Machine guards", "Spark control", "Face protection"],
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <section className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Safety Knowledge
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            SafeBase Safety Guides
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Explore practical HSE guidance covering workplace hazards,
            control measures, personal protective equipment, and safe working
            practices.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-slate-900/80"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                  {guide.icon}
                </div>

                <span className="text-lg text-slate-600 transition group-hover:translate-x-1 group-hover:text-blue-400">
                  →
                </span>
              </div>

              <h2 className="mt-6 text-xl font-bold text-white transition group-hover:text-blue-300">
                {guide.title}
              </h2>

              <p className="mt-3 flex-1 leading-7 text-slate-400">
                {guide.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {guide.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-xs font-medium text-slate-400"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="mt-6 border-t border-slate-800 pt-4 text-sm font-semibold text-blue-400">
                Read safety guide
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h2 className="text-xl font-bold text-white">
              Need a specific safety answer?
            </h2>

            <p className="mt-2 text-slate-400">
              Ask SafeBase AI and receive structured guidance using the
              knowledge base.
            </p>
          </div>

          <Link
            href="/ai-assistant"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 md:mt-0"
          >
            Ask SafeBase AI →
          </Link>
        </section>
      </div>
    </main>
  );
}