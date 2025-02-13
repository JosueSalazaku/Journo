"use client";
import React, { useEffect, useState } from "react";
import { getAllPosts } from "~/service/posts-service";
import { type Post } from "~/types";
import { useCustomSession } from "./SessionProvider";

export default function DisplayPosts() {
  const session = useCustomSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const user = session.data?.user;

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

  if (loading) {
    <div>Loading...</div>;
  }

  if (error) {
    <div>Sorry something went wrong</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      {posts.map((post) => (
        <div key={post.id} className="mb-4 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-2 text-xl font-bold">{post.title}</h2>
          <p className="mb-4 text-gray-700">{post.content}</p>
          <div className="text-sm text-gray-500">
            <p>By: {user?.name}</p>
            <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
