"use client"
import React from 'react'
import { useCustomSession } from '~/components/SessionProvider'

export default function Page() {

const session = useCustomSession()

  if (!session.data?.user) {
    return (
      <div>You are not logged in</div>
    )
  } else if (session.data.user) {

    const { name, email, image } = session.data.user;

    return (
      <div> Welcome back {name}</div>
    )
  }

  return (
    <div>page</div>
  )
}
