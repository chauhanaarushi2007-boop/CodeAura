'use server';
/**
 * @fileOverview Finds free online courses based on a user's query.
 *
 * - findFreeCourses - A function that searches for free courses.
 * - FindFreeCoursesInput - The input type for the findFreeCourses function.
 * - FindFreeCoursesOutput - The return type for the findFreeCourses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindFreeCoursesInputSchema = z.object({
  query: z.string().describe('The topic or skill the user wants to learn.'),
});
export type FindFreeCoursesInput = z.infer<typeof FindFreeCoursesInputSchema>;

const CourseSchema = z.object({
    title: z.string().describe('The full title of the course.'),
    url: z.string().url().describe('The direct URL to the course landing page.'),
    platform: z.string().describe('The name of the platform offering the course (e.g., Coursera, Udemy, freeCodeCamp).'),
});

const FindFreeCoursesOutputSchema = z.object({
  courses: z.array(CourseSchema).describe('A list of free courses found.'),
});
export type FindFreeCoursesOutput = z.infer<typeof FindFreeCoursesOutputSchema>;

export async function findFreeCourses(input: FindFreeCoursesInput): Promise<FindFreeCoursesOutput> {
  return findFreeCoursesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findFreeCoursesPrompt',
  input: {schema: FindFreeCoursesInputSchema},
  output: {schema: FindFreeCoursesOutputSchema},
  prompt: `You are an expert at finding educational resources. The user is looking for free online courses about a specific topic.

  Your task is to find a list of 5 to 10 high-quality, free online courses related to the user's query.

  For each course, you MUST provide:
  1. The full title of the course.
  2. The direct URL to the course.
  3. The name of the platform offering the course.

  Do not include paid courses or courses that only offer a free trial. Focus on reputable platforms like Coursera (with free options), edX, freeCodeCamp, Google, Microsoft Learn, etc.

  User Query: {{{query}}}
  `,
});

const findFreeCoursesFlow = ai.defineFlow(
  {
    name: 'findFreeCoursesFlow',
    inputSchema: FindFreeCoursesInputSchema,
    outputSchema: FindFreeCoursesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
