"use client"
import DisplayPosts from "~/components/DisplayPosts";
import { useCustomSession } from "./../components/SessionProvider";


export default function HomePage() {

  const session = useCustomSession();
  const name = session?.data?.user?.name;
  const isLoggedIn = !!session?.data?.user;

  return (
    <main className="h-screen flex flex-col items-center justify-start text-white p-4 sm:p-8">
      <section className="mt-10 gap-7 text-center sm:text-left">
        {isLoggedIn ? (
          <>
            <h1>Welcome, {name}!</h1>
            <p>Feel free to share your travel experiences.</p>
          </>
        ) : (
          <p>Please sign in to create a post.</p>
        )}
      </section>

      <section className="w-full sm:w-auto mt-4">
        {isLoggedIn ? <DisplayPosts /> : <p>Log in to write about your travels.</p>}
      </section>
    </main>
  );
}