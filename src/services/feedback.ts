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
import { useMemo } from 'react';

export interface Feedback {
  id?: string;
  username: string;
  rating: number;
  message: string;
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

// Service to add feedback
export async function addFeedback(db: Firestore, data: { rating: number; message: string, username: string; }) {
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
  const feedbackCollection = useMemo(() => (db ? collection(db, 'feedback') : null), [db]);
  const { data: snapshot, error, loading } = useCollection(feedbackCollection);

  const feedback = useMemo(() => {
    if (!snapshot) return [];
    
    const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Feedback))
        .filter(item => item.createdAt); // Filter out items where createdAt is null

    // Sort by creation date, newest first
    data.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
    return data;
  }, [snapshot]);

  return { feedback, error, loading };
}
