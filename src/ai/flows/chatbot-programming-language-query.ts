'use server';
/**
 * @fileOverview An AI agent to answer user queries.
 *
 * - generalQuery - A function that handles a general user query.
 * - GeneralQueryInput - The input type for the generalQuery function.
 * - GeneralQueryOutput - The return type for the generalQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneralQueryInputSchema = z.object({
  query: z.string().describe('The query from the user.'),
});
export type GeneralQueryInput = z.infer<typeof GeneralQueryInputSchema>;

const GeneralQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the query.'),
});
export type GeneralQueryOutput = z.infer<typeof GeneralQueryOutputSchema>;

export async function generalQuery(input: GeneralQueryInput): Promise<GeneralQueryOutput> {
  return generalQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generalQueryPrompt',
  input: {schema: GeneralQueryInputSchema},
  output: {schema: GeneralQueryOutputSchema},
  prompt: `You are a helpful chatbot named Aurix.

  Here is the user's query: {{{query}}}

  Please provide a concise and informative answer. `,
});

const generalQueryFlow = ai.defineFlow(
  {
    name: 'generalQueryFlow',
    inputSchema: GeneralQueryInputSchema,
    outputSchema: GeneralQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
