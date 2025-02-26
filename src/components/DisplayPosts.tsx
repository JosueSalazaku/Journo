"use client";
import React, { useEffect, useState } from "react";
import { getAllPosts } from "~/service/posts-service";
import { type Post } from "~/types";
import { useCustomSession } from "./SessionProvider";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

export default function DisplayPosts() {
  const session = useCustomSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const user = session.data?.user;

  async function fetchPosts() {
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
    void fetchPosts();
  }, []);

  if (loading) {
    <div>Loading...</div>;
  }

  if (error) {
    <div>Sorry something went wrong</div>;
  }

  return (
    <div className="mx-auto max-w-5xl text-primary-dark dark:bg-dark px-4 sm:px-6 lg:px-8">
      {posts
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((post) => (
          <div key={post.id} className="mb-4 rounded-lg bg-border-light p-6 shadow-md">
            <h2 className="mb-2 text-xl  font-bold">{post.title}</h2>
            <p className="mb-4 ">{post.content}</p>
            <div className="text-sm ">
              <p>By: {user?.name}</p>
              <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
            <DeletePost id={post.id} />
            <EditPost post={post} />
          </div>
        ))}
    </div>
  );
}
