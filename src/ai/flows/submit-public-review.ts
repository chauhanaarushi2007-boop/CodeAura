
'use server';

/**
 * @fileOverview Accepts a public, unauthenticated review, analyzes its sentiment, and saves it to Firestore.
 *
 * - submitPublicReview - A function that handles the public review submission process.
 * - SubmitPublicReviewInput - The input type for the submitPublicReview function.
 * - SubmitPublicReviewOutput - The return type for the submitPublicReview function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { initializeFirebase } from '@/firebase/init';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { analyzeReview } from './analyze-review';

const SubmitPublicReviewInputSchema = z.object({
  name: z.string().describe('The name of the user leaving the review.'),
  message: z.string().describe('The content of the review message.'),
});
export type SubmitPublicReviewInput = z.infer<typeof SubmitPublicReviewInputSchema>;

const SubmitPublicReviewOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type SubmitPublicReviewOutput = z.infer<typeof SubmitPublicReviewOutputSchema>;

// This is the main function that will be called from our public feedback.html page.
// Genkit automatically creates an API endpoint for this flow.
export const submitPublicReview = ai.defineFlow(
  {
    name: 'submitPublicReview',
    inputSchema: SubmitPublicReviewInputSchema,
    outputSchema: SubmitPublicReviewOutputSchema,
  },
  async (input) => {
    const { name, message } = input;

    if (!message) {
        return { success: false, message: 'Message is required.' };
    }

    try {
      // 1. Analyze sentiment with our existing Genkit flow
      const { sentiment } = await analyzeReview({ review: message });
  
      // 2. Add to Firestore. This runs on the server with admin privileges.
      const { firestore } = initializeFirebase();
      const reviewCollection = collection(firestore, 'reviews');
  
      await addDoc(reviewCollection, {
        name: name || 'Anonymous',
        message,
        rating: 5, // Defaulting rating to 5 as per the old form
        sentiment,
        createdAt: serverTimestamp(),
      });
  
      return { success: true, message: 'Review submitted successfully.' };

    } catch (e: any) {
      console.error('Error submitting public review:', e);
      return { success: false, message: 'An unexpected error occurred.' };
    }
  }
);
