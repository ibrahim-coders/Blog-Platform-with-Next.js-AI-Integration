'use client';

import axios from 'axios';
import { BookOpen, MessageCircle, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const Recent_Articles = () => {
  const [bolgs, setBolg] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/posts');
        setBolg(res.data?.posts || []);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 py-6 gap-6 bg-white">
      {bolgs.map(bolg => (
        <div
          key={bolg._id}
          className="shadow-md rounded-lg p-4 border border-gray-100 bg-gray-50"
        >
          {/* User info */}
          <div className="flex gap-3 items-center mb-3">
            <p className="bg-emerald-500 rounded-full text-white w-12 h-12 flex justify-center items-center font-bold">
              {bolg.userName?.charAt(0) || 'A'}
            </p>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-slate-700">
                {bolg.userName}
              </p>
              <span className="text-sm text-slate-500">
                {new Date(bolg.createdAt).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                })}
              </span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            {bolg.title}
          </h2>

          {/* Content */}
          <p className="text-slate-600 text-sm mb-3">{bolg.content}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2 ">
            {bolg.tags.slice(0, 2).map((tag, index) => (
              <p
                key={index}
                className="text-slate-800 bg-emerald-100 rounded px-2 py-1 text-xs shadow"
              >
                {tag}
              </p>
            ))}
            {bolg.tags.length > 2 && (
              <p className="text-slate-600 bg-slate-200 rounded px-2 py-1 text-xs shadow">
                +{bolg.tags.length - 2} more
              </p>
            )}
          </div>
          <div className="flex justify-between items-center  border-t mt-4 border-slate-950 ">
            <div className="flex gap-4 mt-4">
              {' '}
              <ThumbsUp className="text-slate-800" />
              <MessageCircle className="text-slate-800" />
            </div>
            <BookOpen className="text-slate-800 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recent_Articles;
