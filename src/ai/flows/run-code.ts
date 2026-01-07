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
  output: z.string().optional().describe('The output of the executed code snippet. This should only be present if there are no errors.'),
  error: z.string().optional().describe('A description of any syntax or runtime error found in the code. If an error is found, the output field should be empty.'),
});
export type RunCodeOutput = z.infer<typeof RunCodeOutputSchema>;

export async function runCode(input: RunCodeInput): Promise<RunCodeOutput> {
  return runCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'runCodePrompt',
  input: {schema: RunCodeInputSchema},
  output: {schema: RunCodeOutputSchema},
  prompt: `You are a code execution engine. Your task is to analyze and execute a given code snippet and return its output.

Follow these rules precisely:

1.  **Analyze First**: Before executing, analyze the code for any obvious syntax errors or logical issues that would prevent it from running correctly. If you find an error, respond with a description of the error in the "error" field and leave the "output" field empty.
2.  **Rendering vs. Executing**:
    *   If the language is 'php', 'html', or 'css', and the code is valid, act as a web server. Your output MUST be only the final rendered HTML that a browser would display.
    *   For all other languages (like C, C++, Python, Java, JavaScript), and if the code is valid, act as a command-line execution environment.
3.  **Handling Input (CRITICAL for C, C++, Java, etc.)**:
    *   If user input is provided in the "User Input (stdin)" section, you MUST treat it as the program's standard input.
    *   If no user input is provided, execute the code as if it were run without any piped input.
4.  **Output Format**:
    *   If there are NO errors, return ONLY the raw text that would be printed to the console/terminal (stdout) or the final rendered HTML in the "output" field.
    *   If you detect an error, return a description of it in the "error" field and nothing in the "output" field.
    *   Do NOT provide any extra explanations, notes, or markdown formatting like \`\`\`. Your response must be only the code's direct output or an error message in the correct field.

---
**Language**: {{{language}}}

{{#if input}}
**User Input (stdin)**:
'''
{{{input}}}
'''
{{/if}}

**Code to Execute**:
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
    config: {
        maxOutputTokens: 500,
    }
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
