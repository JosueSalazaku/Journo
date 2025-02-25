import React from 'react'
import WritePost from '~/components/WritePost'

export default function page() {
  return (
    <main className="h-screen flex flex-col items-center justify-start bg-primary text-white">
      <section>
        <WritePost />
      </section>
      <section>
        <p>Please sign in to create a post.</p>
      </section>
  </main>
  )
}

