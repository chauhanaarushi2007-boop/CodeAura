'use client';

import {
  DocumentReference,
  onSnapshot,
  type DocumentData,
  type DocumentSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useFirestore } from '@/firebase/provider';

interface UseDocResult<T> {
  data: DocumentSnapshot<T> | null;
  loading: boolean;
  error: Error | null;
}

export function useDoc<T = DocumentData>(
  ref: DocumentReference | null
): UseDocResult<T> {
  const [data, setData] = useState<DocumentSnapshot<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const db = useFirestore();

  useEffect(() => {
    if (!db || !ref) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      ref as DocumentReference<T>,
      (snapshot) => {
        setData(snapshot);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching document:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, ref]);

  return { data, loading, error };
}
