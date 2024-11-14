import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Notion from "next-auth/providers/notion"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Notion]

})