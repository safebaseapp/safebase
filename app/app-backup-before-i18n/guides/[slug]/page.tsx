import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const guideDetails: Record<
  string,
  {
    title: string;
    icon: string;
    description: string;
  }
> = {
  "hot-work": {
    title: "Hot Work",
    icon: "🔥",
    description:
      "Practical guidance for welding, cutting, brazing, grinding, and other spark-producing activities.",
  },

  "confined-space": {
    title: "Confined Space",
    icon: "🕳️",
    description:
      "Essential controls for safe entry, atmospheric testing, ventilation, standby personnel, and rescue.",
  },

  loto: {
    title: "Lockout Tagout",
    icon: "🔒",
    description:
      "Control hazardous energy during maintenance, repair, inspection, cleaning, and equipment intervention.",
  },

  ppe: {
    title: "Personal Protective Equipment",
    icon: "🦺",
    description:
      "Guidance for selecting, inspecting, using, maintaining, and storing workplace protective equipment.",
  },

  grinding: {
    title: "Grinding Safety",
    icon: "⚙️",
    description:
      "Key controls for portable grinders, abrasive wheels, machine guards, sparks, flying particles, and PPE.",
  },
};

function removeFirstMarkdownTitle(content: string) {
  return content.replace(/^\s*#\s+.+\r?\n+/, "").trim();
}

async function getGuideContent(slug: string) {
  if (!guideDetails[slug]) {
    return null;
  }

  const knowledgeDirectory = path.join(
    process.cwd(),
    "app",
    "knowledge"
  );

  const filePath = path.join(
    knowledgeDirectory,
    `${slug}.md`
  );

  try {
    const rawContent = await fs.readFile(filePath, "utf8");

    return removeFirstMarkdownTitle(rawContent);
  } catch (error) {
    console.error(`Could not read guide file: ${filePath}`, error);

    return null;
  }
}

export function generateStaticParams() {
  return Object.keys(guideDetails).map((slug) => ({
    slug,
  }));
}

export default async function GuidePage({
  params,
}: GuidePageProps) {
  const { slug } = await params;

  const guide = guideDetails[slug];
  const content = await getGuideContent(slug);

  if (!guide || !content) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 md:py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
        >
          ← Back to Safety Guides
        </Link>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/20 sm:p-8 md:p-10">
          <div className="flex flex-col gap-6 border-b border-slate-800 pb-8 sm:flex-row sm:items-start">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl">
              {guide.icon}
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">
                SafeBase Safety Guide
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                {guide.title}
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
                {guide.description}
              </p>
            </div>
          </div>

          <article className="mt-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h2 className="mb-4 mt-10 border-b border-slate-700 pb-3 text-2xl font-bold text-white first:mt-0">
                    {children}
                  </h2>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-4 mt-10 flex items-center gap-3 text-2xl font-bold text-blue-300 first:mt-0">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-3 mt-8 text-xl font-semibold text-slate-100">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="mb-5 leading-8 text-slate-300">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="mb-7 space-y-3">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-7 list-decimal space-y-3 pl-6 text-slate-300">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li className="flex items-start gap-3 leading-7 text-slate-300">
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-400">
                      ✓
                    </span>

                    <span>{children}</span>
                  </li>
                ),

                strong: ({ children }) => (
                  <strong className="font-semibold text-white">
                    {children}
                  </strong>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-6 rounded-xl border-l-4 border-amber-400 bg-amber-400/10 px-5 py-4 text-amber-100">
                    {children}
                  </blockquote>
                ),

                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-400 underline decoration-blue-400/40 underline-offset-4 transition hover:text-blue-300"
                  >
                    {children}
                  </a>
                ),

                code: ({ children }) => (
                  <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-blue-300">
                    {children}
                  </code>
                ),

                hr: () => (
                  <hr className="my-8 border-slate-700" />
                ),

                table: ({ children }) => (
                  <div className="my-6 overflow-x-auto rounded-xl border border-slate-700">
                    <table className="w-full border-collapse text-left text-sm">
                      {children}
                    </table>
                  </div>
                ),

                thead: ({ children }) => (
                  <thead className="bg-slate-800 text-slate-100">
                    {children}
                  </thead>
                ),

                th: ({ children }) => (
                  <th className="border-b border-slate-700 px-4 py-3 font-semibold">
                    {children}
                  </th>
                ),

                td: ({ children }) => (
                  <td className="border-b border-slate-800 px-4 py-3 text-slate-300">
                    {children}
                  </td>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h2 className="text-xl font-bold text-white">
              Have a question about {guide.title}?
            </h2>

            <p className="mt-2 text-slate-400">
              Ask SafeBase AI for practical guidance based on this safety
              guide.
            </p>
          </div>

          <Link
            href={`/ai-assistant?topic=${encodeURIComponent(guide.title)}`}
            className="mt-5 inline-flex shrink-0 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 sm:mt-0"
          >
            Ask SafeBase AI →
          </Link>
        </section>
      </div>
    </main>
  );
}