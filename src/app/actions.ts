
"use server";

import { generalQuery } from "@/ai/flows/chatbot-programming-language-query";
import { runCode as runCodeFlow } from "@/ai/flows/run-code";
import { debugCode as debugCodeFlow } from "@/ai/flows/debug-code";
import { headers } from "next/headers";

export async function askMIA(query: string) {
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

export async function runAndDebugCode(code: string, language: string, input: string) {
    if (!code || code.trim().length === 0) {
        return {
            runOutput: { output: "Please enter some code to run.", error: true },
            debugOutput: null
        };
    }

    try {
        const [runResult, debugResult] = await Promise.all([
            runCodeFlow({ code, language, input }),
            debugCodeFlow({ code, language })
        ]);

        return {
            runOutput: { output: runResult.output, error: false },
            debugOutput: debugResult,
        };
    } catch (e) {
        console.error(e);
        return {
            runOutput: {
                output: "Sorry, I couldn't run your code right now. Please try again.",
                error: true
            },
            debugOutput: null
        };
    }
}
