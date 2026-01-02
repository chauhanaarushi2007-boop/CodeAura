'use server';
/**
 * @fileOverview An AI agent to debug code snippets.
 *
 * - debugCode - A function that debugs a code snippet.
 * - DebugCodeInput - The input type for the debugCode function.
 * - DebugCodeOutput - The return type for the debugCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DebugCodeInputSchema = z.object({
  code: z.string().describe('The code snippet to debug.'),
  language: z.string().describe('The programming language of the code snippet.'),
  error: z
    .string()
    .optional()
    .describe(
      'The error message or a description of the problem with the code.'
    ),
});
export type DebugCodeInput = z.infer<typeof DebugCodeInputSchema>;

const DebugCodeOutputSchema = z.object({
  fixedCode: z.string().describe('The corrected code snippet.'),
  explanation: z
    .string()
    .describe(
      'A detailed explanation of what was wrong and how the code was fixed.'
    ),
});
export type DebugCodeOutput = z.infer<typeof DebugCodeOutputSchema>;

export async function debugCode(
  input: DebugCodeInput
): Promise<DebugCodeOutput> {
  return debugCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'debugCodePrompt',
  input: {schema: DebugCodeInputSchema},
  output: {schema: DebugCodeOutputSchema},
  prompt: `You are an expert programmer and debugger. Your task is to analyze a code snippet, identify the issue based on the provided error or description, and provide a corrected version of the code along with a clear explanation.

Language: {{{language}}}
{{#if error}}
Error/Problem Description:
'''
{{{error}}}
'''
{{/if}}
Original Code:
'''
{{{code}}}
'''

Analyze the code and the error. Provide the fixed code and a step-by-step explanation of the changes.

Your response must be in the following format:
  "fixedCode": "The corrected code snippet goes here.",
  "explanation": "A detailed explanation of what was wrong and how the code was fixed."
`,
});

const debugCodeFlow = ai.defineFlow(
  {
    name: 'debugCodeFlow',
    inputSchema: DebugCodeInputSchema,
    outputSchema: DebugCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
