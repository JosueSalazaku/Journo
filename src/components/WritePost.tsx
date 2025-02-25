"use client";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useCustomSession } from "./SessionProvider";
import { useEffect, useState } from "react";
import { addPosts, updatePost } from "~/service/posts-service";
import { useRouter, useSearchParams } from "next/navigation";

export default function WritePost() {
  const session = useCustomSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const initialTitle = searchParams.get("title");
  const initialContent = searchParams.get("content");

  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>(initialTitle! || "");
  const [content, setContent] = useState<string>(initialContent! || "");
  const [loading, setLoading] = useState<boolean>(false);

  const userId = session.data?.user?.id;
  const user = session.data?.user;

  useEffect(() => {
    if (initialTitle && initialContent) {
      setTitle(initialTitle);
      setContent(initialContent);
    }
  }, [initialTitle, initialContent])

  async function handlePost(event: React.FormEvent) {
    event.preventDefault();

    if (!user) {
      setError("User not authenticated.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (userId) {
      formData.append("user", userId);
    } else {
      setError("User ID is missing.");
      return;
    }

    if (!title || !content || !userId) {
      setError("Missing required fields");
      console.log("Missing required fields:", { title, content, userId });
      return;
    }

    try {
      setLoading(true);
      if (id) {
        // Update existing post
        await updatePost(id);
      } else {
        // Create new post
        await addPosts(title, content, userId);
      }
      router.push("/");
      await addPosts(title, content, userId);
    } catch (error) {
      setError("Failed to add post. Please try again.");
      console.error("Error adding post:", error);
    }
  }

  return (
    <div className="mt-8 flex w-screen justify-center px-12">
      <form
        onSubmit={handlePost}
        className="flex h-fit  w-screen flex-col space-y-6 bg-white p-4 text-black shadow-lg "
      >
        <Textarea
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={title}
          className="w-full border-b border-none border-black py-4 text-4xl font-bold placeholder-orange-400 focus:outline-none"
          placeholder="Title"
        />

        <Textarea
          onChange={(e) => setContent(e.target.value)}
          defaultValue={content}
          className="h-[500px] w-full border-none text-xl leading-relaxed placeholder-gray-500 focus:outline-none"
          placeholder="Write your story..."
        />

        <Button
          type="submit"
          className="h-[50px] w-full rounded-lg bg-primary text-xl font-normal text-white md:w-[200px]"
        >
          Post
        </Button>
      </form>
    </div>
  );
}
