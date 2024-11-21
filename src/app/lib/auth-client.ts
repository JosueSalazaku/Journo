import { createAuthClient } from "better-auth/react";

export const { signIn, signOut, signUp, useSession, getSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
});

