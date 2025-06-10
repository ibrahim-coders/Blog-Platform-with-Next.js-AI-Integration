'use client';

import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [shouldShowNavbar, setShouldShowNavbar] = useState(false);

  useEffect(() => {
    const hideNavbar = pathname === '/login' || pathname === '/signup';
    setShouldShowNavbar(!hideNavbar);
  }, [pathname]);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
    </>
  );
}
