import { NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  // In a real app, verify token validity. Here we just check presence.
  if (!token || token.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    // Basic validation
    if (!body.title || !body.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate slug if not present
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
    }

    const newPost = await createPost(body);
    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
