"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import ResultCard, { type Solution } from "../components/ResultCard";

const seeded: Solution[] = [
  {
    id: "1",
    summary: "Fix: React 'act(...)' warning in tests",
    details:
      "Wrap state updates triggered by async code inside testing-library's waitFor, or use act() directly. This ensures React flushes effects before assertions.",
    code: `await waitFor(() => {
  expect(screen.getByText(/loaded/i)).toBeInTheDocument();
});`,
    language: "tsx",
    tags: ["react", "testing-library", "jest"],
    contributor: "@dev_amy",
  },
  {
    id: "2",
    summary: "Fix: Node EADDRINUSE on dev server restart",
    details:
      "Port is occupied from a previous crashed process. Free it by killing the PID or auto-select a new port. In Next.js, set PORT or use next dev -p.",
    code: `# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Next.js
next dev -p 3001`,
    language: "bash",
    tags: ["node", "nextjs", "windows"],
    contributor: "@ops_jay",
  },
  {
    id: "3",
    summary: "Fix: Python ImportError due to circular import",
    details:
      "Refactor imports to local scope where needed, or move shared types to a third module. Avoid module-level side effects that import each other.",
    code: `# a.py
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from b import Service

def use(service: "Service"):
    ...`,
    language: "python",
    tags: ["python", "imports", "circular"],
    contributor: "@py_kai",
  },
  {
    id: "4",
    summary: "Fix: Tailwind classes not applied in production",
    details:
      "Ensure the content globs include all file locations and no dynamic class names are missed. Prefer known class lists or safelist for dynamic usage.",
    code: `// tailwind.config.ts
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};`,
    language: "ts",
    tags: ["tailwind", "build"],
    contributor: "@ui_zoe",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Solution[]>(seeded);
  const [fetched, setFetched] = useState(false);

  async function handleSearch() {
    setLoading(true);
    try {
      // Placeholder API call; replace with real endpoint later
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, tags: tags.split(",").map((t) => t.trim()).filter(Boolean) }),
      });
      if (res.ok) {
        const data = (await res.json()) as { solutions: Solution[] };
        setResults(data.solutions);
      } else {
        setResults([]);
      }
    } catch {
      setResults([]);
    } finally {
      setFetched(true);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
          <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-black/10 dark:border-white/10 p-4 sm:p-6">
            <label htmlFor="errorLog" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Error log
            </label>
            <textarea
              id="errorLog"
              placeholder="Paste your error log here..."
              className="mt-2 w-full resize-y min-h-40 sm:min-h-48 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-950 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <input
                type="text"
                placeholder="Tags (e.g., react, nextjs)"
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-950 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <button
                onClick={handleSearch}
                disabled={loading || query.trim().length === 0}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-4 py-2.5 shadow-sm"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2"><Spinner /> Searching…</span>
                ) : (
                  "Find Solution"
                )}
              </button>
            </div>
          </section>

          <section className="mt-6 space-y-4">
            {!loading && fetched && results.length === 0 && (
              <div className="rounded-md border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center text-sm text-gray-600 dark:text-gray-300">
                No matching solution found. You can submit your own!
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-10 text-gray-600 dark:text-gray-300">
                <Spinner />
                <span className="ml-2">Loading results…</span>
              </div>
            )}

            {!loading && results.map((s) => <ResultCard key={s.id} solution={s} />)}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
