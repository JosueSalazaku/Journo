import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '~/server/db';
import { posts, user } from '~/server/db/auth-schema'; 
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const data = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        userId: posts.userId,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .leftJoin(user, eq(posts.userId, user.id));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const userId = formData.get('userId') as string;

    // Check if required fields are present
    if (!title || !content || !userId) {
      console.error('Missing required fields:', { title, content, userId });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert the new post into the database
    const [newPost] = await db.insert(posts).values({
      id: crypto.randomUUID(),
      title,
      content,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    return NextResponse.json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}