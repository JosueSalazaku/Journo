"use client"
import { signIn } from "lib/auth-client";
import React from 'react'
import { Button } from "~/components/ui/button";

export default function Login() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col gap-2">
              <Button onClick={async () => {
                await signIn.social({
                    provider: 'google',
                    callbackURL: "/"
                })
              }} className="w-72 h-14 rounded-xl">Sign in with Google</Button>
              <Button onClick={async () => {
                await signIn.social({
                    provider: 'github',
                    callbackURL: "/"
                })
              }} className="w-72 h-14 rounded-xl">Sign in with Github</Button>
        </div>
    </div>
  )
}