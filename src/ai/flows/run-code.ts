'use server';
/**
 * @fileOverview Executes a code snippet and returns the output.
 *
 * - runCode - A function that executes a code snippet.
 * - RunCodeInput - The input type for the runCode function.
 * - RunCodeOutput - The return type for the runCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RunCodeInputSchema = z.object({
  code: z.string().describe('The code snippet to execute.'),
  language: z.string().describe('The programming language of the code snippet.'),
  input: z.string().optional().describe('Optional user-provided input for the code execution.'),
});
export type RunCodeInput = z.infer<typeof RunCodeInputSchema>;

const RunCodeOutputSchema = z.object({
  output: z.string().describe('The output of the executed code snippet.'),
});
export type RunCodeOutput = z.infer<typeof RunCodeOutputSchema>;

export async function runCode(input: RunCodeInput): Promise<RunCodeOutput> {
  return runCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'runCodePrompt',
  input: {schema: RunCodeInputSchema},
  output: {schema: RunCodeOutputSchema},
  prompt: `You are a code execution engine. You will be given a code snippet, its programming language, and optional user input.
Your task is to determine the output of the code when it is executed.

If the language is 'php', 'html', or 'css', you must act as a web server.
This means if the code is PHP, you will execute it. If the code is HTML or CSS, you will render it. The code may contain a mix of HTML, CSS, and JavaScript. Your output should be the final rendered HTML that a browser would receive after the code has been processed. Do not output anything other than the final HTML.

For all other languages, execute the code. If user input is provided, use it as the standard input (stdin) for the program. Return only the text output that would be printed to the console or terminal.

Do not provide any surrounding text, explanations, or markdown formatting like \`\`\`.

Language: {{{language}}}
{{#if input}}
User Input:
'''
{{{input}}}
'''
{{/if}}
Code:
'''
{{{code}}}
'''
`,
});

const runCodeFlow = ai.defineFlow(
  {
    name: 'runCodeFlow',
    inputSchema: RunCodeInputSchema,
    outputSchema: RunCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
