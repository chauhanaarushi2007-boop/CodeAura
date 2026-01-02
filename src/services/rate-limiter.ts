'use server';
/**
 * @fileOverview A service for rate-limiting user requests using Firestore.
 */

import {getFirestore, Timestamp, getDocs, collection, query, where, addDoc, orderBy, limit} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const { firestore } = initializeFirebase();

// Configuration for rate limits
const RATE_LIMIT_CONFIG = {
  chatbot: {
    limit: 15, // requests
    window: 60, // seconds
  },
  codeRunner: {
    limit: 5,
    window: 60,
  },
};

type Feature = keyof typeof RATE_LIMIT_CONFIG;

/**
 * Checks if a user has exceeded the rate limit for a specific feature.
 *
 * @param userId - A unique identifier for the user.
 * @param feature - The feature being rate-limited ('chatbot' or 'codeRunner').
 * @returns A promise that resolves to an object indicating if the request is allowed.
 */
export async function checkRateLimit(
  userId: string,
  feature: Feature
): Promise<{ allowed: boolean; error?: string }> {
  if (!firestore) {
    // If firestore is not available, allow the request to pass through.
    // This is a fallback for local development or misconfiguration.
    console.warn('Firestore not available, rate limiting is disabled.');
    return { allowed: true };
  }

  const config = RATE_LIMIT_CONFIG[feature];
  const now = Timestamp.now();
  const windowStart = new Timestamp(
    now.seconds - config.window,
    now.nanoseconds
  );

  const requestsRef = collection(firestore, 'requests');

  const q = query(
    requestsRef,
    where('userId', '==', userId),
    where('feature', '==', feature),
    where('timestamp', '>=', windowStart),
    orderBy('timestamp', 'desc'),
    limit(config.limit)
  );

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size >= config.limit) {
      return {
        allowed: false,
        error: `Rate limit exceeded for ${feature}. Please try again later.`,
      };
    }

    // Log the new request
    await addDoc(requestsRef, {
      userId,
      feature,
      timestamp: now,
    });

    return { allowed: true };
  } catch (error) {
    console.error('Error checking rate limit:', error);
    // In case of a Firestore error, fail open to not block the user.
    return { allowed: true };
  }
}
