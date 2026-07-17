"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function AIAssistantPage() {
  const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [loading, setLoading] = useState(false);
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          AI Safety Assistant
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">
          Ask SafeBase AI
        </h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          Ask practical HSE questions and receive structured safety guidance.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <textarea
         value={question}
         onChange={(e) => setQuestion(e.target.value)}
         className="min-h-40 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
         placeholder="Example: What controls are required for grinding work?"
          />

          <button
  onClick={async () => {
    setLoading(true);
setAnswer("");
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  }}
  className="mt-4 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
>
            Ask AI
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold">AI Response</h2>

          <div className="mt-3 text-slate-300">
  <ReactMarkdown>
  {loading
    ? "🤖 SafeBase AI is analyzing your question...\n\nPlease wait..."
    : answer || "Your answer will appear here."}
</ReactMarkdown>
</div>
        </div>
      </div>
    </main>
  );
}