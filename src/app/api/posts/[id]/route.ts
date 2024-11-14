import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema'; 
import { eq } from 'drizzle-orm';


// GET method to fetch a post by ID
export async function GET(
  request: NextRequest,  // Use NextRequest for consistency
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const data = await db.select().from(posts).where(eq(posts.id, id));

    if (data.length === 0) {
      console.log(`Post with ID ${id} not found.`);
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    console.log('Fetched post:', data[0]);
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
  }
}

// PUT method to update a post by ID
export async function PUT(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Ensure user authentication
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the form data
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as Blob | null;

    // Fetch the post to ensure it exists and the user is the owner
    const post = await db
      .select({ userId: posts.userId, imageUrl: posts.imageUrl })
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);

    if (post.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Ensure the current user is the owner of the post
    if (!post[0] || post[0].userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Handle image upload if provided
    let imageUrl: string | null = post[0].imageUrl; // Keep current image if none provided
    if (imageFile && imageFile instanceof Blob) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const fileName = `${nanoid()}.png`;
      const filePath = `./public/uploads/${fileName}`;
      const buffer = Buffer.from(arrayBuffer);
      await fs.writeFile(filePath, buffer);
      await fs.writeFile(filePath, buffer);
      imageUrl = `/uploads/${fileName}`; // Update the imageUrl
    }

    // Update post details and set updatedAt to current time
    const updatedPost = await db
      .update(posts)
      .set({
        title,
        content,
        imageUrl,  // If a new image was uploaded, save it
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .returning();

    return NextResponse.json(updatedPost[0]);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
  }
}



// DELETE method to delete a post by ID
export async function DELETE(
  request: NextRequest,  // Use NextRequest for consistency
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get the current authenticated user from Clerk
    const { userId } =  getAuth(request); 

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the post to check ownership
    const post = await db
      .select({
        userId: posts.userId,
      })
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);

    if (post.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check if the current user is the owner of the post
    if (!post[0] || post[0].userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Perform the deletion if the user is the owner
    const deletedPost = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();

    if (deletedPost.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    console.log('Deleted post:', deletedPost[0]);
    return NextResponse.json({ message: 'Post deleted successfully', deletedPost: deletedPost[0] });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}
