"use client";
import Link from "next/link";
import { useRef ,useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";

export function Nav() {
  
  const dropDownRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setOpen(false); // Close the dropdown if clicked outside
      }
    }
  
    document.addEventListener("mousedown", handleOutsideClick);
  
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Cleanup
    };
  }, []); 
  

  return (
    <nav ref={dropDownRef} className="flex h-20 w-full items-center justify-between bg-primary px-5">
      <div ref={dropDownRef} className="flex w-full items-center justify-between gap-3 text-2xl font-bold text-white">
        <Link href="/">Journo</Link>
        <button onClick={() => setOpen(!open)} className="lg:hidden"><IoIosMenu /></button>
        {open  && (
            <div ref={dropDownRef} className="absolute top-20 right-0 bg-black h-[985px] w-full">
            <ul className="flex flex-col items-start p-3">
              <li className="py-2"><Link href="/write" onClick={() => setOpen(false)}>Write</Link></li>
              <li className="py-2"><Link href="/explore" onClick={() => setOpen(false)}>Explore</Link></li>
              <li className="py-2"><Link href="/insights" onClick={() => setOpen(false)}>Insights</Link></li>
            </ul>
            </div>
        )}
        <div ref={dropDownRef} className="hidden items-center justify-end gap-3 text-lg font-bold text-white md:flex">
          <Link href="/write">Write</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/insights">Insights</Link>
        </div>
      </div>
    </nav>
  );
}
