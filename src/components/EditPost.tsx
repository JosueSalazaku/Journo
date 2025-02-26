"use client";
import { type Post } from "~/types";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface EditPostProps {
  post: Post;
}

function EditPost({ post }: EditPostProps) {
  const router = useRouter();

  const handleEditClick = () => {
    if (!post) {
      console.error("Post is undefined");
      return;
    }

    router.push(
      `/write?id=${post.id}&title=${encodeURIComponent(post.title)}&content=${encodeURIComponent(post.content)}`
    );
  };

  return (
    <Button
      onClick={handleEditClick}
      className="bg-blue-800 hover:bg-blue-200"
    >
      Edit
    </Button>
  );
}

export default EditPost;