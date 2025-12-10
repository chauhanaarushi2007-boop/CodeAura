'use server';

/**
 * @fileOverview Provides code explanations using the Aurix chatbot.
 *
 * - explainCode - A function that explains the code based on user query.
 * - ExplainCodeInput - The input type for the explainCode function.
 * - ExplainCodeOutput - The return type for the explainCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCodeInputSchema = z.object({
  query: z.string().describe('The user query about the code snippet.'),
  code: z.string().describe('The code snippet to be explained.'),
  language: z.string().describe('The programming language of the code snippet.'),
});
export type ExplainCodeInput = z.infer<typeof ExplainCodeInputSchema>;

const ExplainCodeOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the code snippet.'),
});
export type ExplainCodeOutput = z.infer<typeof ExplainCodeOutputSchema>;

export async function explainCode(input: ExplainCodeInput): Promise<ExplainCodeOutput> {
  return explainCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCodePrompt',
  input: {schema: ExplainCodeInputSchema},
  output: {schema: ExplainCodeOutputSchema},
  prompt: `You are Aurix, a chatbot designed to explain code snippets in various programming languages.

  The user will provide a code snippet and a query related to the code.
  Your task is to provide a clear and concise explanation of the code's functionality and purpose, based on the user's query.

  Language: {{{language}}}
  Code: {{{code}}}
  Query: {{{query}}}

  Explanation:`,
});

const explainCodeFlow = ai.defineFlow(
  {
    name: 'explainCodeFlow',
    inputSchema: ExplainCodeInputSchema,
    outputSchema: ExplainCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
