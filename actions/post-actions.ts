"use server";
import { eq } from "drizzle-orm";
import { db } from "../src/server/db/index";
import { posts } from "~/server/db/schema";
import type { Post } from "~/types";

export const getAllPosts = async () => {
  try {
    const data = await db.select().from(posts);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error, posts not found");
  }
};

export const getPost = async (postId: string) => {
  try {
    const data = await db.select().from(posts).where(eq(posts.id, postId));
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

export const addPost = async (post: Post) => {
  try {
    const result = await db
      .insert(posts)
      .values({
        title: post.title,
        content: post.content,
        userId: post.userId,
      })
      .returning(); 

    console.log("Inserted post:", result);
    return result;
  } catch (error) {
    console.error("Error adding new post:", error);
    throw error;
  }
};
