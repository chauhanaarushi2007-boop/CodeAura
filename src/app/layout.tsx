import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import Chatbot from '@/components/chatbot';
import { Providers } from './providers';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

export const metadata: Metadata = {
  title: 'CodeAura - The Aura of Programmers Begins Here.',
  description: 'Your personal AI-powered guide to the world of code. A skill that sparks a career.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const firebaseApp = initializeFirebase();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background flex flex-col")}>
        <FirebaseProvider {...firebaseApp}>
          <Providers>
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <Chatbot />
              <Toaster />
          </Providers>
        </FirebaseProvider>
      </body>
    </html>
  );
}
