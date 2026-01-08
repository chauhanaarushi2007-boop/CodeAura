
'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { useMemo } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Review } from '@/lib/types';

export function useReviews() {
    const db = useFirestore();

    const reviewQuery = useMemo(() => {
        if (!db) return null;
        return query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    }, [db]);
    
    const { data: snapshot, loading } = useCollection<Review>(reviewQuery);

    const data = useMemo(() => {
        if (!snapshot) return [];
        
        const reviewList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Filter out items where createdAt is null, which can happen briefly on new additions
        return reviewList.filter(item => !!item.createdAt);

    }, [snapshot]);

    return { data, loading };
}
