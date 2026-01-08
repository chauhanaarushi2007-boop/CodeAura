
'use server';

/**
 * @fileOverview Analyzes feedback text to determine its sentiment.
 *
 * - analyzeFeedback - A function that analyzes the sentiment of a feedback message.
 * - AnalyzeFeedbackInput - The input type for the analyzeFeedback function.
 * - AnalyzeFeedbackOutput - The return type for the analyzeFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeFeedbackInputSchema = z.object({
  feedback: z.string().describe('The user feedback text to analyze.'),
});
export type AnalyzeFeedbackInput = z.infer<typeof AnalyzeFeedbackInputSchema>;

const AnalyzeFeedbackOutputSchema = z.object({
  sentiment: z
    .enum(['Positive', 'Negative', 'Neutral'])
    .describe('The sentiment of the feedback.'),
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
  prompt: `Analyze the sentiment of the following user feedback. Classify it as Positive, Negative, or Neutral.

Feedback:
'''
{{{feedback}}}
'''

Sentiment:`,
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
