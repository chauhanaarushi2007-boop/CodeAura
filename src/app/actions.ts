"use server";

import { programmingLanguageQuery } from "@/ai/flows/chatbot-programming-language-query";
import { runCode as runCodeFlow } from "@/ai/flows/run-code";
import { headers } from "next/headers";

export async function askMIA(query: string) {
    if (!query || query.trim().length === 0) {
        return {
            answer: "Please enter a question.",
            error: true
        };
    }

    try {
        const result = await programmingLanguageQuery({ query });
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

export async function runCode(code: string, language: string) {
    if (!code || code.trim().length === 0) {
        return {
            output: "Please enter some code to run.",
            error: true
        };
    }

    try {
        const result = await runCodeFlow({ code, language });
        return {
            output: result.output,
            error: false
        };
    } catch (e) {
        console.error(e);
        return {
            output: "Sorry, I couldn't run your code right now. Please try again.",
            error: true
        };
    }
}
