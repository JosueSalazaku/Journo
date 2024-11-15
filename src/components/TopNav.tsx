"use client";
import Link from "next/link";

export function TopNav() {
  
  return (
    <nav className="flex h-20 w-full items-center justify-between bg-primary px-5">
      <div className="flex w-full justify-between items-center gap-3 text-4xl font-bold text-white">
        <Link href="/">Journo</Link>
        <div className="flex justify-end items-center gap-3 text-xl font-bold text-white">
        <Link href="/write">Write</Link>
        <div>
          <Link href="/explore">Explore</Link>
        </div>
        <div>
        <Link href="/insights">Insights</Link>
        </div>
        </div>
      </div>
    </nav>
  );
}
