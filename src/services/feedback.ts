'use client';

import {
  collection,
  addDoc,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import { analyzeFeedback } from '@/ai/flows/analyze-feedback';
import { errorEmitter } from '@/firebase/error-emitter';
import type { SecurityRuleContext } from '@/firebase/errors';
import { FirestorePermissionError } from '@/firebase/errors';

export interface Feedback {
  id?: string;
  rating: number;
  message: string;
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

// Service to add feedback
export async function addFeedback(db: Firestore, data: { rating: number; message: string }) {
  if (!db) {
    throw new Error('Firestore is not initialized.');
  }
  
  // Analyze sentiment before saving
  const analysis = await analyzeFeedback({ message: data.message });

  if (analysis.isAbusive) {
      throw new Error("Feedback contains inappropriate content and was not submitted.");
  }

  const feedbackCollection = collection(db, 'feedback');
  addDoc(feedbackCollection, {
    ...data,
    sentiment: analysis.sentiment,
    createdAt: serverTimestamp(),
  }).catch(async (serverError) => {
    const permissionError = new FirestorePermissionError({
      path: feedbackCollection.path,
      operation: 'create',
      requestResourceData: data,
    } satisfies SecurityRuleContext);
    errorEmitter.emit('permission-error', permissionError);
  });
}

// Hook to get feedback
export function useFeedback() {
  const db = useFirestore();
  const feedbackCollection = db ? collection(db, 'feedback') : null;
  const { data, error, loading } = useCollection(feedbackCollection);

  const feedbackData = data ? data.docs.map(doc => ({ id: doc.id, ...doc.data() } as Feedback)) : [];

  // Sort by creation date, newest first
  feedbackData.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  return { feedback: feedbackData, error, loading };
}
