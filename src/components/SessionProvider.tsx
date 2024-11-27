"use client";
import { useSession } from "lib/auth-client";
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

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

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession(); // Fetch session data from better-auth
  const [sessionState, setSessionState] = useState(session);

  // Update session state when session changes
  useEffect(() => {
    setSessionState(session);
  }, [session]);

  return (
    <SessionContext.Provider value={sessionState}>
      {children}
    </SessionContext.Provider>
  );
}

export function useCustomSession(): Session {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useCustomSession must be used within a SessionProvider");
  }
  return context;
}
