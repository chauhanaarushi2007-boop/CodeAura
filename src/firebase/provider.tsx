'use client';

import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import {
  useContext,
  createContext,
  type ReactNode,
} from 'react';

export interface Firebase {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

const FirebaseContext = createContext<Firebase | undefined>(undefined);

export function FirebaseProvider({
  children,
  ...props
}: {
  children: ReactNode;
} & Firebase) {
  const context = { ...props };
  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const useFirebaseApp = () => {
  return useContext(FirebaseContext)?.app;
};

export const useFirestore = () => {
  return useContext(FirebaseContext)?.firestore;
};

export const useAuth = () => {
  return useContext(FirebaseContext)?.auth;
};
