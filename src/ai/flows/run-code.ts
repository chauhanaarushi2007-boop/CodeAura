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
  prompt: `You are a code execution engine. Your task is to execute a given code snippet and return its output.

Follow these rules precisely:

1.  **Rendering vs. Executing**:
    *   If the language is 'php', 'html', or 'css', act as a web server. The code may be a mix of these. Your output MUST be only the final rendered HTML that a browser would display.
    *   For all other languages (like C, C++, Python, Java, JavaScript), you will act as a command-line execution environment.

2.  **Handling Input (CRITICAL for C, C++, Java, etc.)**:
    *   If user input is provided in the "User Input (stdin)" section, you MUST treat it as the program's standard input. The program will read from this input (e.g., via \`scanf\` in C, \`cin\` in C++, etc.).
    *   Do NOT invent your own input or ignore the provided input. The user's input is the ONLY source for stdin.
    *   If no user input is provided, execute the code as if it were run without any piped input.

3.  **Output Format**:
    *   For executed code (non-web), return ONLY the raw text that would be printed to the console/terminal (stdout).
    *   Do NOT provide any explanations, notes, or markdown formatting like \`\`\`. Your response must be only the code's direct output.
    *   Do not say "The output is:". Just provide the output itself.

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
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
