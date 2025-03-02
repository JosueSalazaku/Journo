"use client";
import { useEffect, useState } from "react";
import { type Post } from "~/types";
import { getAllPosts } from "~/service/posts-service";
import FadeLoader from "react-spinners/FadeLoader";
interface DynamicPostProps {
    params: {
        id: string;
    };
}

export default function Page({ params }: DynamicPostProps) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { id } = params;

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await getAllPosts();
                console.log(response);
                
                const post = response?.find((p) => p.id === id) ?? null;
                setPost(post);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch post");
                setLoading(false);
            }
        }

        if (id) {
           void fetchPost();
        }
    }, [id]);

    if (!post || loading) {
        return <div><FadeLoader /></div>;
    }

    return (
        <div className="container mx-auto p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div>{post.content}</div>
            <p>{post.createdAt.toString()}</p>
        </div>
    );
}
