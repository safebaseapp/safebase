export default function ChecklistsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Safety Inspection Checklists
        </h1>

        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Professional workplace inspection checklists based on international
          HSE best practices.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-2xl border p-6 shadow-sm hover:shadow-lg transition">
          <div className="text-4xl mb-4">🦺</div>

          <h2 className="text-xl font-semibold">
            Work at Height
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Inspect ladders, scaffolds, fall protection systems and anchor
            points before work starts.
          </p>

          <span className="inline-block mt-5 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            Available
          </span>
        </div>

        <div className="rounded-2xl border p-6 opacity-70">
          <div className="text-4xl mb-4">🔥</div>

          <h2 className="text-xl font-semibold">
            Hot Work
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Coming soon...
          </p>
        </div>

        <div className="rounded-2xl border p-6 opacity-70">
          <div className="text-4xl mb-4">🔒</div>

          <h2 className="text-xl font-semibold">
            Lockout / Tagout
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Coming soon...
          </p>
        </div>

      </div>
    </main>
  );
}
