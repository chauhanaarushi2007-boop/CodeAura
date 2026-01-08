'use client';

import {
  collection,
  query,
  type Firestore,
} from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
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

// Hook to get feedback
export function useFeedback() {
  const db = useFirestore();
  const feedbackQuery = useMemo(() => (db ? query(collection(db, 'feedback')) : null), [db]);
  const { data: snapshot, error, loading } = useCollection(feedbackQuery);

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
