"use client";
import { useState, useRef, useEffect } from "react";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GoBookmark } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import Image from 'next/image';

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const { signOut } = useAuth();
  const { user } = useUser(); 
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && event.target instanceof Node && !menuRef.current.contains(event.target)) {
        setTimeout(() => {
          closeMenu();
        }, 150);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex h-20 w-full items-center justify-between bg-primary px-5">
      <Link href="/" className="font-didot text-3xl font-bold text-main">
        Journo
      </Link>
      <button onClick={toggle} className="md:hidden text-white">
        {isOpen ? <HiOutlineX className="size-7" /> : <HiOutlineMenu className="size-7" />}
      </button>
      <div className="hidden md:flex flex-row items-center text-white space-x-6">
        <SignedIn>
          <Button className="bg-main font-bold text-primary">
            <Link href="/write">Write</Link>
          </Button>
          <Link href="/people">People</Link>
          <Link href="/places">Places</Link>
          <Link href="/pages">Pages</Link>
            {isOpen && (
            <div className="absolute top-16 right-4 flex flex-col  p-7 gap-5 bg-white text-black w-52 h-60 shadow-lg rounded-lg">
              <Link href='/profile' className="flex flex-row items-center gap-4"><GoPerson /> Profile</Link>
              <Link href='/library' className="flex flex-row items-center gap-4"><GoBookmark /> Library</Link>
              <Link href='/settings' className="flex flex-row items-center gap-4"><IoSettingsOutline /> Settings</Link>
              <button 
                onClick={async () => { 
                  await signOut(); 
                  closeMenu(); 
                }} 
                className="bg-none text-black font-bold justify-start flex pt-2 flex-row gap-4 items-start rounded-none hover:bg-orange-900 hover:border-none hover:text-white text-left"
              >
               <RiLogoutBoxRLine />
               Sign Out
              </button>
            </div>
          )}
          <div className="flex items-center space-x-4">
            {user?.imageUrl && (
              <Image
                src={user?.imageUrl || "/default-profile.png"}
                alt="User Picture"
                width={48}
                height={48}
                className="rounded-full cursor-pointer"
                onClick={toggle}
              />
            )}
          </div>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <button>Sign In</button>
          </Link>
          <Link href="/sign-up">
            <button>Sign Up</button>
          </Link>
        </SignedOut>
      </div>

      {isOpen && (
        <div
          className={`absolute rounded-b-lg top-20 h-screen left-0 right-0 z-50 bg-orange-400 flex flex-col justify-start pt-24 gap-20 items-center text-6xl text-main md:hidden transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <SignedIn>
            <div className="flex items-center space-x-4">
              {user?.imageUrl && (
                <Image
                  src={user?.imageUrl || "/default-profile.png"}
                  alt="User Picture"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <span>{user?.username ?? "User"}</span>
            </div>
            <Link href="/write" onClick={closeMenu} className="hover:underline">
              Write
            </Link>
            <Link href="/people" onClick={closeMenu} className="hover:underline">
              People
            </Link>
            <Link href="/places" onClick={closeMenu} className="hover:underline">
              Places
            </Link>
            <Link href="/pages" onClick={closeMenu} className="hover:underline">
              Pages
            </Link>
            <button onClick={async () => { 
              await signOut(); 
              closeMenu(); 
            }}>
              Sign Out
            </button>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <button onClick={closeMenu}>Sign In</button>
            </Link>
            <Link href="/sign-up">
              <button onClick={closeMenu}>Sign Up</button>
            </Link>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}
