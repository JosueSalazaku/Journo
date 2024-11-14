
import React from 'react'
import CreatePost from '~/components/createPost'

export default function page() {
  return (
    <main className="h-screen flex flex-col items-center justify-start bg-primary text-white">
      <section>
        <CreatePost />
      </section>
      <section>
        <p>Please sign in to create a post.</p>
      </section>
  </main>
  )
}

