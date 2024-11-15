import DisplayPosts from "~/components/DisplayPosts";

export default function HomePage() {
  return (
    <main className="h-screen flex flex-col items-center justify-start text-white p-4 sm:p-8">
      <section className="mt-10 gap-7 text-center sm:text-left">
        The 3 P
      </section>

        <section className="w-full sm:w-auto mt-4">
          <DisplayPosts />
        </section>

        <section className="w-full sm:w-auto mt-4">
          <p>Please sign in to create a post.</p>
        </section>

    </main>
  );
}
