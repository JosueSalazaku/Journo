"use server";
import { eq } from "drizzle-orm";
import { db } from "../src/server/db/index";
import { post } from "~/server/db/auth-schema";
import type { Post } from "~/types";

export const getAllPosts = async () => {
  try {
    const data = await db.select().from(post);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error, posts not found");
  }
};

export const getPost = async (postId: string) => {
  try {
    const data = await db.select().from(post).where(eq(post.id, postId));
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

export const addPost = async (newPost: Post) => {
  try {
    const result = await db
      .insert(post)
      .values({
        id: newPost.id,
        title: newPost.title,
        content: newPost.content,
        authorId: newPost.authorId,
        createdAt: newPost.createdAt,
        updatedAt: newPost.updatedAt,
      })
      .returning();

    console.log("Inserted post:", result);
    return result;
  } catch (error) {
    console.error("Error adding new post:", error);
    throw error;
  }
};
