'use client';

import {
  Query,
  collection,
  onSnapshot,
  query,
  where,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useFirestore } from '@/firebase/provider';

interface UseCollectionResult<T> {
  data: QuerySnapshot<T> | null;
  loading: boolean;
  error: Error | null;
}

export function useCollection<T = DocumentData>(
  q: Query | null
): UseCollectionResult<T> {
  const [data, setData] = useState<QuerySnapshot<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const db = useFirestore();

  useEffect(() => {
    if (!db || !q) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      q as Query<T>,
      (snapshot) => {
        setData(snapshot);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching collection:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, q]);

  return { data, loading, error };
}
