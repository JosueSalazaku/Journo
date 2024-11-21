"use client";
import { useSession } from "lib/auth-client";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

// Define the type for the session returned by `useSession`
export interface Session {
  data?: {
    session?: {
      id: string;
      userId: string;
      expiresAt: Date;
      ipAddress?: string | null;
      userAgent?: string | null;
    } | null;
    user?: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
    } | null;
  } | null;
  isPending: boolean;
}

// Create a context with a default value of null
const SessionContext = createContext<Session | null>(null);

// Custom provider component
export function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession(); // This returns a value matching the `Session` type.

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

// Custom hook to access session data
export function useCustomSession(): Session {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useCustomSession must be used within a SessionProvider");
  }
  return context;
}
