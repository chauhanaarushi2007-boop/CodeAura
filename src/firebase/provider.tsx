'use client';

import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import React, { createContext, useContext } from 'react';

// Define the shape of the context data
interface FirebaseContextValue {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

// Create the context with an initial null value
const FirebaseContext = createContext<FirebaseContextValue | null>(null);

/**
 * A provider component that makes Firebase services available to the rest of the app.
 */
export function FirebaseProvider({
  children,
  ...value
}: React.PropsWithChildren<FirebaseContextValue>) {
  return (
    <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
  );
}

/**
 * A hook to access the Firebase services.
 * Throws an error if used outside of a FirebaseProvider.
 */
export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }
  return context;
}
