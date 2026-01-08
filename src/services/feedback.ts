
'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { useMemo } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Feedback } from '@/lib/types';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';

export function useFeedback() {
    const db = useFirestore();

    const feedbackQuery = useMemo(() => {
        if (!db) return null;
        return query(collection(db, 'feedback'), orderBy('createdAt', 'desc'));
    }, [db]);
    
    const { data: snapshot, loading } = useCollection<Feedback>(feedbackQuery);

    const data = useMemo(() => {
        if (!snapshot) return [];
        
        const feedbackList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Filter out items where createdAt is null, which can happen briefly on new additions
        return feedbackList.filter(item => !!item.createdAt);

    }, [snapshot]);

    return { data, loading };
}
