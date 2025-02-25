import { deletePost } from "~/service/posts-service";
import { Button } from "./ui/button";

interface DeletePostProps {
  id: string;
}

export default function DeletePost({ id }: DeletePostProps) {
  async function handleDeletePost() {
    try {
      await deletePost(id);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  }

  return (
    <Button
      onClick={() => handleDeletePost()}
      className="bg-red-800 hover:bg-primary"
    >
      Delete
    </Button>
  );
}
