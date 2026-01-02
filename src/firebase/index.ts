import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from './config';

/**
 * Initializes and returns the Firebase app, Auth, and Firestore instances.
 *
 * This function ensures that Firebase is initialized only once.
 */
export function initializeFirebase() {
  const apps = getApps();
  const firebaseApp =
    apps.length > 0 ? apps[0]! : initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  return { firebaseApp, auth, firestore };
}
