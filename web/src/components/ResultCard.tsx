"use client";

import { useState } from "react";
import CodeBlock from "../components/CodeBlock";

export type Solution = {
  id: string;
  summary: string;
  details: string;
  code: string;
  language: string;
  tags: string[];
  contributor: string;
};

type Props = {
  solution: Solution;
};

export default function ResultCard({ solution }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-sm p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
            {solution.summary}
          </h3>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line line-clamp-3">
            {expanded ? solution.details : solution.details.slice(0, 180) + (solution.details.length > 180 ? "…" : "")}
          </div>
          <button
            className="mt-2 inline-flex text-blue-600 hover:text-blue-700 text-sm font-medium"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>
        <div className="shrink-0 text-xs text-gray-500 dark:text-gray-400 text-right">
          <div>By {solution.contributor}</div>
        </div>
      </div>

      <div className="mt-4">
        <CodeBlock code={solution.code} language={solution.language} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {solution.tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2.5 py-0.5 text-xs border border-blue-200/60 dark:border-blue-800/50"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}



