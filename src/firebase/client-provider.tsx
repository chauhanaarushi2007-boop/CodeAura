'use client';

import { useMemo, type ReactNode } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider, type Firebase } from './provider';

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
