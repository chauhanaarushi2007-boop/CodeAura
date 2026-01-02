'use client';

import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const LAST_VISITED_PAGE_KEY = 'lastVisitedPage';

function LastVisitedPageManager() {
  const pathname = usePathname();
  const router = useRouter();

  // Save the last visited page to localStorage
  useEffect(() => {
    // We only want to save actual page routes, not the root
    if (pathname !== '/') {
      localStorage.setItem(LAST_VISITED_PAGE_KEY, pathname);
    }
  }, [pathname]);

  // On initial load, check for a saved page and redirect
  useEffect(() => {
    const savedPath = localStorage.getItem(LAST_VISITED_PAGE_KEY);
    // Only redirect if there's a saved path and we are currently on the homepage.
    // This prevents a redirect loop if the saved path is the homepage.
    if (savedPath && savedPath !== '/' && pathname === '/') {
      router.replace(savedPath);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on component mount

  return null; // This component does not render anything
}


export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render nothing on the server to avoid hydration mismatch,
    // as localStorage logic is client-side only.
    return null;
  }

  return (
    <ThemeProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <LastVisitedPageManager />
      {children}
    </ThemeProvider>
  );
}
