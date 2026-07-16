export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-6 py-12 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <div className="text-xl font-bold text-white">SafeBase</div>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Free safety tools, checklists, templates and practical resources
            for HSE professionals.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Platform</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a href="#tools" className="hover:text-white">
              Tools
            </a>
            <a href="#categories" className="hover:text-white">
              Categories
            </a>
            <a href="#" className="hover:text-white">
              Resources
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Company</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a href="#" className="hover:text-white">
              About
            </a>
            <a href="#" className="hover:text-white">
              Contact
            </a>
            <a href="#" className="hover:text-white">
              FAQ
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Legal</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <div>© 2026 SafeBase. All rights reserved.</div>
        <div>Built for safety professionals.</div>
      </div>
    </footer>
  );
}