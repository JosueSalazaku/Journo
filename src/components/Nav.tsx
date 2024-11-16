"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";

export function Nav() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // Separate ref for the button
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false); // Close dropdown on outside click
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <nav className="flex h-20 w-full items-center justify-between bg-primary px-5">
      <div className="flex w-full items-center justify-between gap-3 text-2xl font-bold text-white">
        <Link href="/">Journo</Link>
        <button
          ref={buttonRef} // Attach the separate button ref
          onClick={() => setOpen(!open)} // Toggle dropdown state
          className="md:hidden lg:hidden"
        >
          <IoIosMenu />
        </button>

        {open && (
          <div ref={dropdownRef} className="absolute top-20 right-0 bg-black h-full w-full">
            <ul className="flex flex-col items-start">
              <li className="py-2"><Link href="/write" onClick={() => {setOpen(false)}}>Write</Link></li>
              <li className="py-2"><Link href="/explore" onClick={() => {setOpen(false)}}>Explore</Link></li>
              <li className="py-2"><Link href="/insights" onClick={() => {setOpen(false)}}>Insights</Link></li>
            </ul>
          </div>
        )}
        <div className="hidden items-center justify-end gap-3 text-lg font-bold text-white md:flex">
          <Link href="/write">Write</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/insights">Insights</Link>
        </div>
      </div>
    </nav>
  );
}
