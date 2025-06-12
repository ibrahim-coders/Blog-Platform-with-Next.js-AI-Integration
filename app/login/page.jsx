'use client';

import axios from 'axios';
import { House } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        window.location.href = '/';
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Internal Server Error');
    }
  };

  return (
    <div className="flex flex-wrap gap-20 items-center justify-center ">
      <Image
        src="/ai.avif"
        alt="Login background"
        fill
        className="object-cover bg-black opacity-20"
        priority
      />

      {/* ✅ Login Form Centered */}
      <div className="absolute inset-0 flex items-center justify-end px-4  ">
        <div className=" bg-slate-400/50  w-full max-w-md p-4 rounded shadow">
          <div className="flex justify-between items-center mb-6">
            {' '}
            <h1 className="text-2xl font-bold text-center text-white">
              Login to Your Blog
            </h1>
            <Link href="/" className="flex items-center gap-2 text-white">
              <House className="w-6 h-6" />
              <span> Home</span>
            </Link>
          </div>
          <form onSubmit={handleLogin} className="space-y-4  ">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-white mr-2">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="text-emerald-300 font-bold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
