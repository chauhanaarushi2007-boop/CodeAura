
"use server";

import { generalQuery } from "@/ai/flows/chatbot-programming-language-query";
import { runCode as runCodeFlow } from "@/ai/flows/run-code";
import { debugCode as debugCodeFlow } from "@/ai/flows/debug-code";

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
        // Simple heuristic to detect if the output is an error message
        const isError = /error|exception|fatal|undefined|unresolved|panic/i.test(result.output);
        return {
            output: result.output,
            isError: isError
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
