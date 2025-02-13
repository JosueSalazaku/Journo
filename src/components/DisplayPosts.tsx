"use client";
import React, { useEffect, useState } from "react";
import { getAllPosts } from "~/service/posts";
import { type Post } from "~/types";

export default function DisplayPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  async function showPosts() {
    try {
      setLoading(true);
      const usersPosts = await getAllPosts();
      if (usersPosts) {
        setPosts(usersPosts);
      } else {
        setError("No posts found");
      }
    } catch (error) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void showPosts();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
