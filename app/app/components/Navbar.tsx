export default function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/en" className="flex items-center gap-3">
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

        <div className="hidden gap-8 text-gray-300 md:flex">
          <a href="#tools" className="transition hover:text-blue-400">
            Tools
          </a>

          <a
            href="/en/ai-assistant"
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            🤖 AI Assistant
          </a>

          <a
            href="/en/knowledge-base"
            className="transition hover:text-blue-400"
          >
            📚 Knowledge Base
          </a>

          <a
            href="/en/downloads"
            className="transition hover:text-blue-400"
          >
            ⬇️ Downloads
          </a>

          <a href="#about" className="transition hover:text-blue-400">
            About
          </a>

          <a href="#contact" className="transition hover:text-blue-400">
            Contact
          </a>
        </div>

        <button className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700">
          Explore
        </button>
      </div>
    </nav>
  );
}