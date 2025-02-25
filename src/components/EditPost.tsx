import { useState } from "react";
import { useCustomSession } from "./SessionProvider";
import { getPostById } from "~/service/posts-service";
import { type Post } from "~/types";
import { Button } from "./ui/button";

interface EditPostProps {
  id: string;
}

function EditPost({ id }: EditPostProps) {
  const session = useCustomSession();
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const userId = session.data?.user?.id;

  // fetch the current Post
  // then create a handle to edit it

  async function getCurrentPost() {
    if (userId) {
      console.error("Not a user, login", userId);
    }
    try {
      const postById = await getPostById(id);
      if (postById) {
          setPost(postById);
          console.log(postById)
      }
    } catch (error) {}
  }

  return (
    <Button
      className="bg-blue-800 hover:bg-blue-200"
    >
      Edit
    </Button>
  );
}

export default EditPost;
