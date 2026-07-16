import RiskMatrix from "./components/RiskMatrix";
import Footer from "./components/Footer";
import FeaturedTools from "./components/FeaturedTools";
import Categories from "./components/Categories";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="flex min-h-[calc(100vh-88px)] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          SAFEBASE
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-slate-600">
          Modern platform for HSE professionals.
        </p>

        <p className="mt-3 max-w-3xl text-slate-500">
          Free calculators, checklists, templates and practical safety
          resources.
        </p>

        <a
          href="#categories"
          className="mt-10 rounded-xl bg-slate-950 px-8 py-4 font-semibold text-white transition hover:bg-slate-800"
        >
          Explore Tools
        </a>
      </section>

      <Categories />
      <FeaturedTools />
      <RiskMatrix />
      <Footer />
    </main>
  );
}