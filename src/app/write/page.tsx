import React, { Suspense } from "react";
import WritePost from "~/components/WritePost";

export default function page() {
  return (
    <main className="flex h-screen flex-col items-center justify-start bg-primary text-white">
      <section>
        <Suspense fallback={<div>Loading...</div>}>
          <WritePost />
        </Suspense>
      </section>
      <section>
        <p>Please sign in to create a post.</p>
      </section>
    </main>
  );
}
