import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "~/server/db";
import { posts } from "~/server/db/auth-schema";
import { eq } from "drizzle-orm";
import { getSession, useSession } from "lib/auth-client";

export async function GET(
  req: NextRequest,
  { param }: { param: { userId: string } },
) {
  try {
    const { userId } = param;

    const data = await db.select().from(posts).where(eq(posts.userId, userId));

    if (data.length === 0) {
      console.log(`No posts found for user with ID ${userId}.`);
      return NextResponse.json({ error: "No posts found" }, { status: 404 });
    }
    console.log("Fetched posts:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 },
    );
  }
}

// PUT method to update a post by ID
export async function PUT() {
  //
}

// DELETE method to delete a post by ID
export async function DELETE(req: NextRequest, { param }: { param: { postId: string } }) {
  try {
    const { postId } = param;
    const session = await getSession();
    const userId = session?.data?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the post to check ownership
    const post = await db
      .select({ userId: posts.userId })
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (post.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if the current user is the owner of the post
    if (!post[0] || post[0].userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Perform the deletion if the user is the owner
    const deletedPost = await db.delete(posts).where(eq(posts.id, postId)).returning();
    
    if (deletedPost.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    console.log("Deleted post:", deletedPost[0]);
    return NextResponse.json({ message: "Post deleted successfully", deletedPost: deletedPost[0]});
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
  }
}