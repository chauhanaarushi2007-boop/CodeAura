
'use server';

/**
 * @fileOverview Analyzes review text to determine its sentiment.
 *
 * - analyzeReview - A function that analyzes the sentiment of a review message.
 * - AnalyzeReviewInput - The input type for the analyzeReview function.
 * - AnalyzeReviewOutput - The return type for the analyzeReview function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeReviewInputSchema = z.object({
  review: z.string().describe('The user review text to analyze.'),
});
export type AnalyzeReviewInput = z.infer<typeof AnalyzeReviewInputSchema>;

const AnalyzeReviewOutputSchema = z.object({
  sentiment: z
    .enum(['Positive', 'Negative', 'Neutral'])
    .describe('The sentiment of the review.'),
});
export type AnalyzeReviewOutput = z.infer<
  typeof AnalyzeReviewOutputSchema
>;

export async function analyzeReview(
  input: AnalyzeReviewInput
): Promise<AnalyzeReviewOutput> {
  return analyzeReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeReviewPrompt',
  input: { schema: AnalyzeReviewInputSchema },
  output: { schema: AnalyzeReviewOutputSchema },
  prompt: `Analyze the sentiment of the following user review. Classify it as Positive, Negative, or Neutral.

Review:
'''
{{{review}}}
'''

Sentiment:`,
});

const analyzeReviewFlow = ai.defineFlow(
  {
    name: 'analyzeReviewFlow',
    inputSchema: AnalyzeReviewInputSchema,
    outputSchema: AnalyzeReviewOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
