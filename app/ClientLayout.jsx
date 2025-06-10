'use client';

import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/login' || pathname === '/signup';

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
