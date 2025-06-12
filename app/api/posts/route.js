import ConnectDB from '@/app/lib/config/db';
import Post from '@/app/lib/models/Blog';
import { NextResponse } from 'next/server';

export const POST = async req => {
  try {
    await ConnectDB();
    const { title, content, tags, userName, userEmail } = await req.json();

    const post = new Post({
      title,
      content,
      tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()),
      userName,
      userEmail,
    });

    await post.save();

    return NextResponse.json({
      success: true,
      message: 'Blog post successfully!',
      post,
    });
  } catch (error) {
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

// all blog post get

export const GET = async () => {
  try {
    await ConnectDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
