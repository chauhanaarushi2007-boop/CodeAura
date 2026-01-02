
'use client';

import { useMemo, type ReactNode } from 'react';
import { initializeFirebase } from './init';
import { FirebaseProvider, type Firebase } from './provider';

// This is a singleton to ensure Firebase is only initialized once.
let firebaseApp: Firebase | undefined;

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const app = useMemo(() => {
    if (!firebaseApp) {
      firebaseApp = initializeFirebase();
    }
    return firebaseApp;
  }, []);

  return <FirebaseProvider {...app}>{children}</FirebaseProvider>;
}
