'use client';

import Link from 'next/link';
import { useUser } from '../context/useProvider';
import axios from 'axios';

export default function Navbar() {
  const { user } = useUser();
  console.log(user);

  const { setUser } = useUser();

  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    setUser(null);
    window.location.href = '/login';
  };

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
    <>
      <header className="fixed top-0 left-0 right-0 z-20 w-full  border-slate-200 bg-white/90 shadow">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav className="flex h-[5.5rem] items-stretch justify-between font-medium ">
            {/*      <!-- Brand logo --> */}

            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-3xl font-black bg-slate-400 px-2 rounded-full text-white">
                B
              </h1>{' '}
              <span className="text-emerald-500 text-xl font-bold">Post</span>
            </Link>

            <div className="flex items-center px-6 ml-auto gap-2 lg:ml-0 lg:p-0">
              {user?.email ? (
                <>
                  <h3 className="py-2 px-4 bg-emerald-100 text-emerald-600 rounded-full text-2xl font-bold">
                    {fasword(user?.name)}
                  </h3>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 text-white bg-emerald-500 rounded hover:bg-emerald-700 cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="inline-flex items-center py-2 px-5  text-slate-700  text-sm font-medium tracking-widehover:bg-slate-300 hover:text-slate-950 transition-colors duration-300 rounded cursor-pointer"
                  >
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded shadow-md whitespace-nowrap bg-emerald-500 shadow-emerald-200 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none cursor-pointer"
                  >
                    <span>Sign up</span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
