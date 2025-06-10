'use client';

import Link from 'next/link';
import { useUser } from '../context/useProvider';

export default function Navbar() {
  const { user } = useUser();
  console.log(user);
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
              <Link
                href="/login"
                className="inline-flex items-center py-2 px-5  text-slate-700  text-sm font-medium tracking-widehover:bg-slate-300 hover:text-slate-950 transition-colors duration-300 rounded"
              >
                <span>Login</span>
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded shadow-md whitespace-nowrap bg-emerald-500 shadow-emerald-200 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
              >
                <span>Sign up</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
