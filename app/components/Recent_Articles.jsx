'use client';

import { BookOpen, ThumbsUp } from 'lucide-react';
import { useGetPostsQuery, useLikePostMutation } from '../services/postsApi';
import LoadingSpinner from './LoadingSpinner';
import { useGetMeQuery } from '../services/userApi';

const Recent_Articles = () => {
  const { data, isLoading } = useGetPostsQuery();
  const blogs = data?.posts || [];
  const { data: user } = useGetMeQuery();
  const userId = user?.user?._id;
  const [likePost] = useLikePostMutation();

  const handleLike = async postId => {
    if (!userId) return;
    console.log(postId);
    await likePost({ id: postId, userId });
  };

  if (isLoading) return <LoadingSpinner />;

  const fasword = name => {
    if (!name) return '';
    const words = name.trim().split(' ');
    let initials = '';
    for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0];
    }
    return initials.toUpperCase();
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 py-6 gap-6 bg-slate-900">
      {blogs.map(blog => (
        <div
          key={blog._id}
          className="shadow-md rounded-lg p-4 border border-gray-400 bg-slate-700"
        >
          {/* User info */}
          <div className="flex gap-3 items-center mb-3">
            <p className="bg-emerald-500 rounded-full text-white w-12 h-12 flex justify-center items-center font-bold">
              {fasword(blog?.userName)}
            </p>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-white ">
                {blog.userName}
              </p>
              <span className="text-sm text-white ">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                })}
              </span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-white  mb-2">
            {blog.title.slice(0, 30)}...
          </h2>

          {/* Content */}
          <p className="text-white  text-sm mb-3">{blog.content}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2 ">
            {blog.tags.slice(0, 2).map((tag, index) => (
              <p
                key={index}
                className="text-white  bg-slate-400 rounded px-2 py-1 text-xs shadow"
              >
                {tag}
              </p>
            ))}
            {blog.tags.length > 2 && (
              <p className="text-white  bg-slate-400 rounded px-2 py-1 text-xs shadow">
                +{blog.tags.length - 2} more
              </p>
            )}
          </div>
          <div className="flex justify-between items-center  border-t mt-4 border-slate-950 ">
            <div className="flex gap-2 mt-4 items-center">
              {' '}
              <ThumbsUp
                onClick={() => handleLike(blog._id)}
                className={
                  blog.likedUsers?.includes(userId)
                    ? 'text-emerald-500'
                    : 'text-white'
                }
              />
              <span>
                {blog.likedUsers?.length > 0 ? blog.likedUsers?.length : ''}
              </span>
            </div>
            <BookOpen className="text-white  mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recent_Articles;
