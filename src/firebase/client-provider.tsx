'use client';

import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';

const { firebaseApp, auth, firestore } = initializeFirebase();

/**
 * Provides the Firebase app, Auth, and Firestore instances to the client.
 *
 * This provider is responsible for initializing Firebase on the client side
 * and should be used as a wrapper around the root of the application.
 */
export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
