
'use server';

import { initializeFirebase } from "@/firebase/init";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";

const { firestore } = initializeFirebase();

const RATE_LIMIT_CONFIG = {
  chatbot: {
    limit: 10, // requests
    period: 60 * 1000, // 1 minute in milliseconds
  },
  codeRunner: {
    limit: 5, // requests
    period: 60 * 1000, // 1 minute in milliseconds
  },
};

export async function checkRateLimit(feature: 'chatbot' | 'codeRunner'): Promise<string | null> {
  const config = RATE_LIMIT_CONFIG[feature];
  // For now, we'll use a fixed userId. In a real app, this would come from the user's session.
  const userId = 'anonymous_user'; 

  const now = Timestamp.now();
  const periodStart = new Timestamp(now.seconds - config.period / 1000, now.nanoseconds);
  
  const requestsRef = collection(firestore, 'users', userId, 'requests');
  const q = query(requestsRef, where('timestamp', '>=', periodStart));

  try {
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.size >= config.limit) {
      return `Rate limit exceeded for ${feature}. Please try again later.`;
    }

    // Log the new request
    await addDoc(requestsRef, {
      feature,
      timestamp: now,
    });

    return null; // No error, rate limit not exceeded
  } catch (error) {
    console.error("Error checking rate limit:", error);
    // Fail open in case of Firestore error
    return null;
  }
}
