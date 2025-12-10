'use server';
/**
 * @fileOverview Analyzes and debugs a code snippet, providing an explanation and a corrected version.
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
});
export type DebugCodeInput = z.infer<typeof DebugCodeInputSchema>;

const DebugCodeOutputSchema = z.object({
  hasError: z.boolean().describe('Whether an error was found in the code.'),
  errorLine: z.number().optional().describe('The line number where the error is located.'),
  explanation: z.string().optional().describe('A detailed explanation of the error and the fix.'),
  correctedCode: z.string().optional().describe('The corrected version of the code snippet.'),
});
export type DebugCodeOutput = z.infer<typeof DebugCodeOutputSchema>;

export async function debugCode(input: DebugCodeInput): Promise<DebugCodeOutput> {
  return debugCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'debugCodePrompt',
  input: {schema: DebugCodeInputSchema},
  output: {schema: DebugCodeOutputSchema},
  prompt: `You are an expert code debugger. Your task is to analyze a code snippet, identify any errors (syntax or logic), and provide a corrected version.

  Language: {{{language}}}
  Code:
  '''
  {{{code}}}
  '''

  1.  **Analyze the Code**: Carefully review the code for any errors.
  2.  **Identify Errors**:
      *   If you find an error, you MUST set \`hasError\` to \`true\`.
      *   Determine the line number of the primary error and set \`errorLine\`.
      *   Write a clear \`explanation\` of what the error is and why it occurs.
      *   Provide the fully \`correctedCode\`.
  3.  **No Errors**:
      *   If the code is perfectly valid and has no errors, you MUST set \`hasError\` to \`false\` and leave all other fields empty. Do not provide any explanation or corrected code if there are no errors.
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
