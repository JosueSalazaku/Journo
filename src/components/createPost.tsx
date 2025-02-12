"use client";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useCustomSession } from "./SessionProvider";

export default function CreatePost() {
  const session = useCustomSession();
  const userId = session.data?.user?.id;

  async function handlePost() {
    //
  }

  return (
    <div className="mt-8 flex w-screen justify-center px-12">
      <form className="flex h-fit  w-screen flex-col space-y-6 bg-white p-4 text-black shadow-lg ">
        <Textarea
          className="w-full border-b border-none border-black py-4 text-4xl font-bold placeholder-orange-400 focus:outline-none"
          placeholder="Title"
        />

        <Textarea
          className="h-[500px] w-full border-none text-xl leading-relaxed placeholder-gray-500 focus:outline-none"
          placeholder="Write your story..."
        />

        <Button
          type="submit"
          className="h-[50px] w-full rounded-lg bg-primary text-xl font-normal text-white md:w-[200px]"
        >Post</Button>
      </form>
    </div>
  );
}
