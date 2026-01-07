'use server';
/**
 * @fileOverview An AI agent to analyze user feedback for sentiment.
 *
 * - analyzeFeedback - A function that analyzes feedback.
 * - AnalyzeFeedbackInput - The input type for the analyzeFeedback function.
 * - AnalyzeFeedbackOutput - The return type for the analyzeFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeFeedbackInputSchema = z.object({
  message: z.string().describe('The user feedback message to analyze.'),
});
export type AnalyzeFeedbackInput = z.infer<typeof AnalyzeFeedbackInputSchema>;

const AnalyzeFeedbackOutputSchema = z.object({
  sentiment: z
    .enum(['Positive', 'Neutral', 'Negative'])
    .describe('The overall sentiment of the feedback.'),
  isAbusive: z
    .boolean()
    .describe('Whether the message contains toxic, abusive, or profane language.'),
});
export type AnalyzeFeedbackOutput = z.infer<
  typeof AnalyzeFeedbackOutputSchema
>;

export async function analyzeFeedback(
  input: AnalyzeFeedbackInput
): Promise<AnalyzeFeedbackOutput> {
  return analyzeFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeFeedbackPrompt',
  input: { schema: AnalyzeFeedbackInputSchema },
  output: { schema: AnalyzeFeedbackOutputSchema },
  prompt: `You are a sentiment analysis expert. Analyze the following user feedback.

Determine the overall sentiment (Positive, Neutral, or Negative).
Also, determine if the message contains any abusive, toxic, or profane language.

Feedback:
'''
{{{message}}}
'''
`,
});

const analyzeFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeFeedbackFlow',
    inputSchema: AnalyzeFeedbackInputSchema,
    outputSchema: AnalyzeFeedbackOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
