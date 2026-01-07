
"use server";

import { generalQuery } from "@/ai/flows/chatbot-programming-language-query";
import { runCode as runCodeFlow } from "@/ai/flows/run-code";
import { debugCode as debugCodeFlow } from "@/ai/flows/debug-code";
import { findFreeCourses as findFreeCoursesFlow } from "@/ai/flows/find-free-courses";
import { collection, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore';
import { initializeFirebase } from "@/firebase/init";
import { analyzeFeedback } from "@/ai/flows/analyze-feedback";

export async function askAurix(query: string) {
    if (!query || query.trim().length === 0) {
        return {
            answer: "Please enter a question.",
            error: true
        };
    }

    try {
        const result = await generalQuery({ query });
        return {
            answer: result.answer,
            error: false
        };
    } catch (e) {
        console.error(e);
        return {
            answer: "Sorry, I couldn't process your request right now. Please try again.",
            error: true
        };
    }
}

export async function runCode(code: string, language: string, input: string) {
    if (!code || code.trim().length === 0) {
        return {
            output: "Please enter some code to run.",
            isError: true
        };
    }

    try {
        const result = await runCodeFlow({ code, language, input });
        
        if (result.error) {
            return {
                output: "there is an error in your code ....try to debug it",
                isError: true,
                rawError: result.error,
            };
        }
        
        return {
            output: result.output || "",
            isError: false
        };
    } catch (e: any) {
        console.error(e);
        return {
            output: e.message || "Sorry, I couldn't run your code right now. Please try again.",
            isError: true
        };
    }
}


export async function debugCode(code: string, language: string, error: string) {
    if (!code || code.trim().length === 0) {
        return {
            fixedCode: "",
            explanation: "Please enter some code to debug.",
            error: true
        };
    }

    try {
        const result = await debugCodeFlow({ code, language, error });
        return {
            ...result,
            error: false
        };
    } catch (e) {
        console.error(e);
        return {
            fixedCode: "",
            explanation: "Sorry, I couldn't debug your code right now. Please try again.",
            error: true
        };
    }
}


export async function findFreeCourses(topic: string) {
    if (!topic || topic.trim().length === 0) {
        return {
            courses: [],
            error: "Please enter a topic to search for."
        };
    }

    try {
        const result = await findFreeCoursesFlow({ topic });
        return {
            courses: result.courses,
            error: null
        };
    } catch (e: any) {
        console.error("Error in findFreeCourses action:", e);
        return {
            courses: [],
            error: e.message || "Sorry, I couldn't find courses right now. Please try again."
        };
    }
}

export async function addFeedback(data: { rating: number; message: string; username: string; }) {
  try {
    // This is a server action, so we can initialize Firebase here
    const { firestore } = initializeFirebase();
    
    // 1. Analyze sentiment before saving
    const analysis = await analyzeFeedback({ message: data.message });

    // 2. Block abusive messages
    if (analysis.isAbusive) {
        return { error: "Feedback contains inappropriate content and was not submitted." };
    }

    // 3. Add to Firestore
    const feedbackCollection = collection(firestore, 'feedback');
    await addDoc(feedbackCollection, {
      ...data,
      sentiment: analysis.sentiment,
      createdAt: serverTimestamp(),
    });

    return { error: null };
  } catch (e: any) {
    console.error("Error in addFeedback action:", e);
    return { error: e.message || 'Could not submit feedback due to a server error.' };
  }
}
