"use client";

import { useEffect, useRef } from "react";

type Props = {
  code: string;
  language?: string;
};

// Lightweight inline syntax highlight using <code> with lang-based classes; avoids extra deps
export default function CodeBlock({ code, language = "plaintext" }: Props) {
  const preRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    // Future: integrate a real highlighter; keep structure for easy swap
  }, [code, language]);

  return (
    <pre
      ref={preRef}
      className="overflow-auto rounded-md bg-gray-900 text-gray-100 text-sm p-4 shadow-inner"
    >
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}



