"use client"

import { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <nav className="flex h-20 w-full items-center justify-between bg-primary px-14">
      <Link href="/" className="font-didot text-2xl font-bold text-main">
        Keanino
      </Link>
      <button onClick={toggle} className="md:hidden">
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <div className="hidden md:flex flex-row items-center text-white space-x-6">
        <SignedIn>
          <Link href="/People">People</Link>
          <Link href="/Places">Places</Link>
          <Link href="/Pages">Pages</Link>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in"><button>Sign In</button></Link>
          <Link href="/sign-up"><button>Sign Up</button></Link>
        </SignedOut>
      </div>

      {/* Small screen */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 z-50 bg-orange-400 p-5 flex flex-col text-6xl space-y-10 text-main md:hidden">
          <SignedIn>
            <Link href="/People">People</Link>
            <Link href="/Places">Places</Link>
            <Link href="/Pages">Pages</Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in"><button>Sign In</button></Link>
            <Link href="/sign-up"><button>Sign Up</button></Link>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}
