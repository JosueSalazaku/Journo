"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Nav() {
  
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function toggle() {
      // func
    }
    }, [])

  return (

<nav className="flex h-20 w-full items-center justify-between bg-primary px-5">
  <div className="flex w-full justify-between items-center gap-3 text-2xl font-bold text-white">
    <Link href="/">Journo</Link>
    <div className="hidden md:flex justify-end items-center gap-3 text-lg font-bold text-white">
      <Link href="/write">Write</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/insights">Insights</Link>
    </div>
  </div>
</nav>
  );
}
