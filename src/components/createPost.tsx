"use client";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function CreatePost() {
 

  return (
    <div className="w-screen flex justify-center mt-8 px-12">
      <form 
        className="w-screen h-fit  flex flex-col space-y-6 p-4 bg-white text-black shadow-lg "
      >
        <Textarea
          className="w-full text-4xl font-bold border-none focus:outline-none placeholder-orange-400 py-4 border-b border-black"
          placeholder="Title"
        />

        <Textarea
          className="w-full h-[500px] text-xl leading-relaxed border-none focus:outline-none placeholder-gray-500"
          placeholder="Write your story..."
        />

        <Button
          type="submit"
          className="w-full md:w-[200px] h-[50px] bg-primary text-white text-xl font-normal rounded-lg">
        </Button>
      </form>
    </div>
  );
}
