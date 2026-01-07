'use client';

import { initializeFirebase } from '@/firebase/init';
import { FirebaseProvider } from '@/firebase/provider';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// This provider is intended to be used in a Client Component
// that is a child of a Server Component.
// This is to ensure that the Firebase app is initialized only once.
export default function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [firebase, setFirebase] = useState<{
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
  } | null>(null);

  useEffect(() => {
    const { app, auth, firestore } = initializeFirebase();
    setFirebase({ app, auth, firestore });
  }, []);

  if (!firebase) {
    // TODO: Add a loading spinner
    return null;
  }

  return <FirebaseProvider {...firebase}>{children}</FirebaseProvider>;
}
