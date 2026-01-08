
'use server';

import {
  collection,
  query,
  where,
  type Firestore,
  addDoc,
  serverTimestamp,
  getDocs,
  limit,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

// This is a server-side only file.

async function userHasReviewed(db: Firestore, userId: string): Promise<string | null> {
    const q = query(collection(db, 'reviews'), where('userId', '==', userId), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
    }
    return null;
}

export async function addReview(
    db: Firestore,
    userId: string,
    data: {
        rating: number;
        text: string;
        userName: string;
        userPhotoURL?: string | null;
    }
) {
  try {

    // For this app, we allow users to update their existing review
    const existingReviewId = await userHasReviewed(db, userId);

    if (existingReviewId) {
        // Update existing review
        const reviewRef = doc(db, 'reviews', existingReviewId);
        await updateDoc(reviewRef, {
            ...data,
            status: 'pending', // Re-submit for approval
            updatedAt: serverTimestamp(),
        });
    } else {
        // Add new review
        await addDoc(collection(db, 'reviews'), {
            ...data,
            userId,
            status: 'pending', // All new reviews are pending approval
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    }
    
    // Revalidate the reviews page to show the user their pending review
    revalidatePath('/reviews');
    return { success: true, error: null };
  } catch (e: any) {
    console.error("Error adding review: ", e);
    return { success: false, error: e.message || 'Could not submit review due to a server error.' };
  }
}
