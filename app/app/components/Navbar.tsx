export default function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-slate-950">
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

        <div className="hidden gap-8 text-gray-300 md:flex">
          <a href="#tools">Tools</a>
          <a href="#categories">Categories</a>
          <a href="#resources">Resources</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700">
          Explore
        </button>
      </div>
    </nav>
  );
}