import ConnectDB from '@/app/lib/config/db';
import Blog from '@/app/lib/models/Blog';
import { NextResponse } from 'next/server';

export const POST = async (req, { params: { id } }) => {
  try {
    await ConnectDB();
    const { userId } = await req.json();
    const post = await Blog.findById(id);
    console.log('post........', post);
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    const alreadyLiked = post.likedUsers.includes(userId);

    if (alreadyLiked) {
      post.likedUsers = post.likedUsers.filter(id => id !== userId);
    } else {
      post.likedUsers.push(userId);
    }
    await post.save();
    return NextResponse.json({
      success: true,
      liked: !alreadyLiked,
      totalLikes: post.likedUsers.length,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
