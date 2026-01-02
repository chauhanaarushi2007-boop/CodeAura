
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import {
  getFirestore,
  type Firestore,
} from 'firebase/firestore';
import { firebaseConfig } from './config';

// This function is in a separate file to avoid circular dependencies
// when used by server-side services like the rate-limiter.
export function initializeFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  const app =
    getApps().length > 0
      ? getApp()
      : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore };
}
