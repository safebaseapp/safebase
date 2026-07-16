import Link from "next/link";
const tools = [
  {
    title: "Risk Matrix Calculator",
    description: "Evaluate and classify workplace risks quickly.",
    type: "Calculator",
    href: "/tools/risk-matrix",
  },
  {
    title: "TRIR Calculator",
    description: "Calculate Total Recordable Incident Rate.",
    type: "Calculator",
      href: "#",
  },
  {
    title: "LTIFR Calculator",
    description: "Calculate Lost Time Injury Frequency Rate.",
    type: "Calculator",
    href: "#",
  },
  {
    title: "Scaffold Inspection",
    description: "Complete a structured scaffold safety inspection.",
    type: "Checklist",
      href: "#",
  },
  {
    title: "Hot Work Checklist",
    description: "Verify critical controls before hot work starts.",
    type: "Checklist",
    href: "#",
  },
  {
    title: "Toolbox Talk Template",
    description: "Create clear and practical toolbox talk documents.",
    type: "Template",
    href: "#",
  },
];

export default function FeaturedTools() {
  return (
    <section id="tools" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Featured tools
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Start with the most useful safety tools
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Practical tools designed for everyday HSE work.
            </p>
          </div>

          <button className="w-fit rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950">
            View all tools
          </button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <article
              key={tool.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {tool.type}
                </span>

                <span className="text-sm text-slate-400">Coming soon</span>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-950">
                {tool.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {tool.description}
              </p>

              <Link
              href={tool.href}
              className="mt-6 inline-block font-semibold text-blue-600"
              >
               Learn more →
               </Link>
               
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}