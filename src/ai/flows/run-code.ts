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
  prompt: `You are a code execution engine. You will be given a code snippet and its programming language.
Your task is to determine the output of the code when it is executed.

If the language is 'php', 'html', or 'css', you must act as a web server.
This means if the code is PHP, you will execute it. The PHP code may contain HTML, CSS, and JavaScript. Your output should be the final rendered HTML that a browser would receive after the PHP code has been processed by the server. Do not output anything other than the final HTML.

For all other languages, execute the code and return only the text output that would be printed to the console or terminal.

Do not provide any surrounding text, explanations, or markdown formatting like \`\`\`.

Language: {{{language}}}
Code:
\'\'\'
{{{code}}}
\'\'\'
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
