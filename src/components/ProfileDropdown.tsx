"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { signOut } from "lib/auth-client";

interface ProfileDropdownProps {
  image: string | null; // URL of the profile image
  name: string | null; // Optional user name (for further enhancement)
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ image, name }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Profile button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2"
      >
        <Image
          src={image ?? "/default-profile.png"}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-52 rounded-md bg-white shadow-lg"
        >
          <ul className="py-1">
            <li className="px-4 py-2 border-b"><h1>{name ?? 'user'}</h1></li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link href="/profile" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link href="/settings" onClick={() => setIsOpen(false)}>
                Settings
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <button
                onClick={async () => {
                  try {
                    await signOut(); // Use Better Auth's `signOut` function
                    setIsOpen(false);
                    window.location.href = "/"; // Redirect after signing out
                  } catch (error) {
                    console.error("Failed to sign out:", error);
                  }
                }}
                className="py-2 hover:text-red-500"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
