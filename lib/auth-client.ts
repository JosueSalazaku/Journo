import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL // the base url of your auth server
})

export const { signIn, signUp, signOut, useSession, getSession } = createAuthClient()
