import Script from "next/script";
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import Chatbot from '@/components/chatbot';
import { Providers } from './providers';
import { FirebaseProvider } from '@/firebase';
import FirebaseErrorListener from '@/components/FirebaseErrorListener';
import { Analytics } from '@vercel/analytics/next';


import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://codeaurix.vercel.app"),
  alternates: {
    canonical: "https://codeaurix.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background flex flex-col")}>
        <Providers>
          <FirebaseProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Chatbot />
            <Toaster />
            <FirebaseErrorListener />
          </FirebaseProvider>
        </Providers>
                <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B3SHTQF2SN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B3SHTQF2SN');
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
