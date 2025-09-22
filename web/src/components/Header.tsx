"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-white/50 supports-[backdrop-filter]:dark:bg-black/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white font-semibold shadow-sm">
            {"</>"}
          </span>
          <span className="text-lg font-semibold tracking-tight">CDKB</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {/* Placeholder for future links */}
          <span className="opacity-60">Login</span>
          <span className="opacity-60">Leaderboard</span>
        </nav>
      </div>
    </header>
  );
}



