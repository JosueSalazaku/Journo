import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { comments, user } from "~/server/db/auth-schema";

export async function GET() {
  try {
    const data = await db
      .select({
        id: comments.id,
        content: comments.content,
        userId: comments.userId,
        postId: comments.postId,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
      })
      .from(comments)
      .leftJoin(user, eq(comments.userId, comments.id));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Error fetching comments" },{ status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
      const content = formData.get('content') as string;
      const userId = formData.get('userId') as string;
      const postId = formData.get('postId') as string

    // Check if required fields are present
    if (!content || !userId || !postId) {
      console.error('Missing required fields:', { content, userId, postId });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert the new post into the database
    const [newComment] = await db.insert(comments).values({
      id: crypto.randomUUID(),
      content,
      userId,
      postId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    return NextResponse.json({ message: 'Post created successfully', comment: newComment });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}