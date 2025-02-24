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

export const getPostById = async (userId: string) => {
  if (!userId) {
    console.error("No userId found", userId);
  }
  try {
    const response = await axios.get(`/api/posts/${userId}`);
    if (response.status === 200 || response.status === 201) {
      return response.data as Post[];
    }
  } catch (error) {
    console.error("Error Fetching post by id:", error);
    throw error;
  }
};

export const deletePost = async (postId: string) => {
  if (!postId) {
    console.error("No postId found", postId);
  }

  try {
    const response = await axios.delete(`/api/posts/${postId}`);
    if (response.status === 200 || response.status === 204) {
      console.log("Post deleted successfully");
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
