const categories = [
  {
    title: "Safety Calculators",
    description:
      "Calculate risk scores, TRIR, LTIFR, working hours and other essential HSE metrics.",
    icon: "🧮",
    count: "12 tools",
  },
  {
    title: "Inspection Checklists",
    description:
      "Use practical checklists for scaffolds, ladders, lifting equipment, PPE and more.",
    icon: "✅",
    count: "24 checklists",
  },
  {
    title: "HSE Templates",
    description:
      "Download professional forms, permits, reports and safety documentation.",
    icon: "📄",
    count: "30 templates",
  },
  {
    title: "Knowledge Base",
    description:
      "Clear and practical guidance covering the most important workplace safety topics.",
    icon: "📚",
    count: "40 articles",
  },
];

const popularTools = [
  {
    name: "Risk Matrix Calculator",
    description: "Calculate and classify workplace risks.",
    tag: "Calculator",
  },
  {
    name: "TRIR Calculator",
    description: "Calculate your Total Recordable Incident Rate.",
    tag: "Calculator",
  },
  {
    name: "Scaffold Inspection",
    description: "Complete a structured scaffold safety check.",
    tag: "Checklist",
  },
  {
    name: "Toolbox Talk Template",
    description: "Prepare a clear and professional toolbox talk.",
    tag: "Template",
  },
  {
    name: "LTIFR Calculator",
    description: "Calculate Lost Time Injury Frequency Rate.",
    tag: "Calculator",
  },
  {
    name: "Hot Work Checklist",
    description: "Verify essential controls before hot work begins.",
    tag: "Checklist",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 font-bold text-white">
              S
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight">SafeBase</div>
              <div className="text-xs text-slate-400">
                Safety tools and resources
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a className="transition hover:text-white" href="#tools">
              Tools
            </a>
            <a className="transition hover:text-white" href="#categories">
              Categories
            </a>
            <a className="transition hover:text-white" href="#resources">
              Resources
            </a>
            <a className="transition hover:text-white" href="#about">
              About
            </a>
          </nav>

          <button className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10">
            Explore SafeBase
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[130px]" />

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
          <div className="mb-7 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
            Built for modern safety professionals
          </div>

          <h1 className="max-w-5xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Practical safety tools.
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              All in one place.
            </span>
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Free HSE calculators, inspection checklists, professional templates
            and practical workplace safety resources.
          </p>

          <div className="mt-10 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl shadow-blue-950/30 backdrop-blur sm:flex-row">
            <input
              aria-label="Search SafeBase"
              placeholder="Search risk matrix, scaffold, hot work..."
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />

            <button className="rounded-xl bg-blue-500 px-7 py-3 font-semibold transition hover:bg-blue-400">
              Search
            </button>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm text-slate-400">
            <span>Popular:</span>
            <button className="hover:text-white">Risk Matrix</button>
            <span>•</span>
            <button className="hover:text-white">Scaffold Checklist</button>
            <span>•</span>
            <button className="hover:text-white">TRIR</button>
          </div>
        </div>
      </section>

      <section
        id="categories"
        className="border-y border-white/10 bg-white/[0.025]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Explore SafeBase
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need for practical safety work
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Find structured tools and resources designed to help HSE
              professionals work faster, improve consistency and strengthen
              workplace safety.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <article
                key={category.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.075]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-3xl">
                  {category.icon}
                </div>

                <h3 className="mt-6 text-xl font-semibold">{category.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {category.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-blue-300">{category.count}</span>
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Popular tools
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Start with the tools professionals use most
            </h2>
          </div>

          <button className="w-fit rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-white/25 hover:text-white">
            View all tools
          </button>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool) => (
            <article
              key={tool.name}
              className="rounded-2xl border border-white/10 bg-slate-900 p-6 transition hover:border-blue-400/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-blue-300">
                  ↗
                </div>

                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                  {tool.tag}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-semibold">{tool.name}</h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {tool.description}
              </p>

              <button className="mt-6 text-sm font-semibold text-blue-300 transition hover:text-blue-200">
                Open tool →
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="resources" className="px-6 pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-600/20 to-cyan-400/5 px-8 py-14 sm:px-14">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                Free professional resources
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                Spend less time creating documents. Spend more time improving
                safety.
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-slate-300">
                Use ready-to-edit HSE templates, practical checklists and
                structured tools created for real workplace activities.
              </p>

              <button className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-blue-50">
                Browse resources
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <div className="text-3xl font-bold">100%</div>
                <div className="mt-2 text-sm text-slate-400">Free to use</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <div className="text-3xl font-bold">4</div>
                <div className="mt-2 text-sm text-slate-400">
                  Resource categories
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <div className="text-3xl font-bold">24/7</div>
                <div className="mt-2 text-sm text-slate-400">Online access</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <div className="text-3xl font-bold">Global</div>
                <div className="mt-2 text-sm text-slate-400">
                  HSE community
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="about" className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold text-white">SafeBase</div>
            <p className="mt-1">
              Free safety tools and practical resources for HSE professionals.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <a className="transition hover:text-white" href="#tools">
              Tools
            </a>
            <a className="transition hover:text-white" href="#categories">
              Checklists
            </a>
            <a className="transition hover:text-white" href="#resources">
              Templates
            </a>
            <a className="transition hover:text-white" href="#about">
              About
            </a>
          </div>

          <div>© 2026 SafeBase</div>
        </div>
      </footer>
    </main>
  );
}