"use client";
import Link from "next/link";
import { useRef ,useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";

export function Nav() {
  
  const click = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (click.current && !click.current.contains(event.target as Node)) {
        setOpen(false); // Close the dropdown if clicked outside
      }
    }
  
    document.addEventListener("mousedown", handleOutsideClick);
  
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Cleanup
    };
  }, []); 
  

  return (
    <nav ref={click} className="flex h-20 w-full items-center justify-between bg-primary px-5">
      <div ref={click} className="flex w-full items-center justify-between gap-3 text-2xl font-bold text-white">
        <Link href="/">Journo</Link>
        <button onClick={() => setOpen(!open)} className="lg:hidden"><IoIosMenu /></button>
        {open  && (
            <div ref={click} className="absolute top-20 right-0 bg-black h-[985px] w-full">
            <ul className="flex flex-col items-start p-3">
              <li className="py-2"><Link href="/write">Write</Link></li>
              <li className="py-2"><Link href="/explore">Explore</Link></li>
              <li className="py-2"><Link href="/insights">Insights</Link></li>
            </ul>
            </div>
        )}
        <div ref={click} className="hidden items-center justify-end gap-3 text-lg font-bold text-white md:flex">
          <Link href="/write">Write</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/insights">Insights</Link>
        </div>
      </div>
    </nav>
  );
}
