import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '~/server/db';
import { posts } from '~/server/db/auth-schema'; 
import { eq } from 'drizzle-orm';

// GET method to fetch a post by ID
export async function GET(req: NextRequest, { param } : { param : { id: string } }) {
  try {
    const { id } = param;

    const data = await db.select().from(posts).where(eq(posts.id, id));

    if (data.length === 0) {
      console.log(`Post with ID ${id} not found.`);
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    } 
    console.log('Fetched post:', data[0]);
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error ferching post:', error)
    return NextResponse.json({ error: 'Error fetching Post'}, { status: 500 })
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
