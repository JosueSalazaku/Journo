import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '~/server/db';
import { posts } from '~/server/db/auth-schema'; 
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest, { param } : { param : { userId: string } }) {
  try {
    const { userId } = param;

    const data = await db.select().from(posts).where(eq(posts.userId, userId));

    if (data.length === 0) {
      console.log(`No posts found for user with ID ${userId}.`);
      return NextResponse.json({ error: 'No posts found' }, { status: 404 });
    } 
    console.log('Fetched posts:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

// PUT method to update a post by ID
export async function PUT() {
  //
}



// DELETE method to delete a post by ID
export async function DELETE() {
  //
}
