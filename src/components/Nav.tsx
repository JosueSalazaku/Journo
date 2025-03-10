"use client";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { Button } from "./ui/button";
import { useCustomSession } from "./SessionProvider";
import { ProfileDropdown } from "./ProfileDropdown";
import { SquarePlus } from 'lucide-react';
import DarkModeButton from "./DarkModeButton";


export function Nav() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const session = useCustomSession();
  const { name, image } = session?.data?.user ?? {};
  const isLoggedIn = !!session?.data?.user;

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
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
    <nav className="flex h-20 w-full text-primary-dark dark:text-primary-light items-center justify-between dark:bg-dark px-10">
      <DarkModeButton />
      <div className="flex w-full items-center justify-between gap-3 text-2xl font-bold">
        <Link href="/">Journo</Link>
        <button
          ref={buttonRef}
          onClick={() => setOpen(!open)}
          className="md:hidden lg:hidden"
        >
          {open ? <MdOutlineClose /> : <IoIosMenu />}
        </button>

        {/* Small-screen dropdown */}
        {open && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-20 h-full w-full bg-black"
          >
            <ul className="flex flex-col items-start">
              {isLoggedIn ? (
                <>
                  <li className="py-2">
                    <Link href="/write" onClick={() => setOpen(false)}>
                    <SquarePlus />
                    </Link>
                  </li>
                  <li className="py-2">
                    <Link href="/explore" onClick={() => setOpen(false)}>
                      Explore
                    </Link>
                  </li>
                  <li className="py-2">
                    <Link href="/insights" onClick={() => setOpen(false)}>
                      Insights
                    </Link>
                  </li>
                </>
              ) : null}
              {!isLoggedIn && (
                <li onClick={() => setOpen(false)}>
                  <Link href="/api/auth/sign-in">Login / Sign Up</Link>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden items-center justify-end gap-3 text-lg font-normal  md:flex">
          {isLoggedIn ? (
            <>
              <Link href="/write"><SquarePlus /></Link>
              <Link href="/explore">Explore</Link>
              <Link href="/insights">Insights</Link>
            </>
          ) : (
            <Button className="bg-slate-800">
              <Link href="/api/auth/sign-in">Login / Sign Up</Link>
            </Button>
          )}
        </div>
      </div>

      {/* ProfileDropdown Component */}
      {isLoggedIn && (
        <div className="hidden md:block pl-4">
          <ProfileDropdown image={image ?? null} name={name ?? null} />
        </div>
      )}
    </nav>
  );
}
