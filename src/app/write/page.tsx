import React, { Suspense } from "react";
import WritePost from "~/components/WritePost";

export default function page() {
  return (
    <main className="flex h-screen flex-col items-center justify-start  text-white">
      <section>
        <Suspense fallback={<div>Loading...</div>}>
          <WritePost />
        </Suspense>
      </section>
      <section>
      </section>
    </main>
  );
}
