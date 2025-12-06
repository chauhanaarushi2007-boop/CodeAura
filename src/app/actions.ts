"use server";

import { programmingLanguageQuery } from "@/ai/flows/chatbot-programming-language-query";
import { runCode as runCodeFlow } from "@/ai/flows/run-code";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { headers } from "next/headers";

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export async function askMIA(query: string) {
    const ip = headers().get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if(!success) {
        return {
            answer: "You've reached the request limit. Please try again later.",
            error: true,
        };
    }

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
    const ip = headers().get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if(!success) {
        return {
            output: "You've reached the request limit. Please try again later.",
            error: true,
        };
    }

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
