import axios from "axios";
import { type Post } from "~/types";

export const addPosts = async (title: string, content: string, userId: string) => {
  try {
    const data = { title, content, userId };
    const response = await axios.post("/api/posts", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      console.log("Post added succesfully", response.data);
    }
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get("/api/posts");
    if (response.status === 200 || response.status === 201) {
      return response.data as Post[];
    }
  } catch (error) {
    console.error("Error Fetching all post:", error);
    throw error;
  }
};

export const getPostById = async (id: string) => {
  if (!id) {
    console.error("No id found", id);
  }
  try {
    const response = await axios.get(`/api/posts/${id}`);
    if (response.status === 200 || response.status === 201) {
      return response.data as Post;
    }
  } catch (error) {
    console.error("Error Fetching post by id:", error);
    throw error;
  }
};

export const deletePost = async (id: string) => {
  if (!id) {
    console.error("No postId found", id);
  }

  try {
    const response = await axios.delete(`/api/posts/${id}`, {
      method: 'DELETE'
    });
    if (response.status === 200 || response.status === 204) {
      return true;

    } else {
      console.error("Failed to delete post", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const updatePost = async (id: string, updatedData: Partial<Post>) => {
  if (!id) {
    console.error("No id found", id);
    return null;
  }

  try {
    const response = await axios.patch(`/api/posts/${id}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 204) {
      return response.data as Post;
    } else {
      console.error("Failed to update post", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};