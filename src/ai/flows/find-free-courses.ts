'use server';
/**
 * @fileOverview An AI agent to find free certificate courses on a given topic.
 *
 * - findFreeCourses - A function that finds free courses.
 * - FindFreeCoursesInput - The input type for the findFreeCourses function.
 * - FindFreeCoursesOutput - The return type for the findFreeCourses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { certificatePlatforms } from '@/lib/certificate-data';

const FindFreeCoursesInputSchema = z.object({
  topic: z.string().describe('The topic the user wants to find free courses for.'),
});
export type FindFreeCoursesInput = z.infer<typeof FindFreeCoursesInputSchema>;


const CourseSchema = z.object({
    platform: z.string().describe('The platform offering the course (e.g., Coursera, freeCodeCamp).'),
    courseName: z.string().describe('The full name of the course.'),
    url: z.string().url().describe('The direct URL to the course page.'),
    description: z.string().describe('A brief, one-sentence description of what the course covers.'),
});

const FindFreeCoursesOutputSchema = z.object({
  courses: z.array(CourseSchema).describe('An array of 3 to 5 relevant free courses with certificates.'),
});
export type FindFreeCoursesOutput = z.infer<typeof FindFreeCoursesOutputSchema>;

export async function findFreeCourses(input: FindFreeCoursesInput): Promise<FindFreeCoursesOutput> {
  return findFreeCoursesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findFreeCoursesPrompt',
  input: {schema: FindFreeCoursesInputSchema},
  output: {schema: FindFreeCoursesOutputSchema},
  prompt: `You are an expert at finding educational resources. The user wants to find free courses that offer certificates on a specific topic.

Topic: {{{topic}}}

Based on the topic, search through the following list of platforms. Identify the 3 to 5 most relevant courses that are free and provide a certificate. Return only the courses that are highly relevant to the user's topic.

Available Platforms and their descriptions:
'''
{{#each platforms}}
- {{name}} ({{url}}): {{description}}. Relevant tags: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.
{{/each}}
'''

Provide your answer in a structured format with the platform, course name, a direct URL, and a brief description for each course. Do not make up courses; only use information that can be inferred from the platform descriptions and tags. If a platform seems like a good fit but you can't identify a specific course, create a plausible but generic course name that fits the platform's offerings.`,
});


const findFreeCoursesFlow = ai.defineFlow(
  {
    name: 'findFreeCoursesFlow',
    inputSchema: FindFreeCoursesInputSchema,
    outputSchema: FindFreeCoursesOutputSchema,
  },
  async input => {
    const {output} = await prompt({
        ...input,
        platforms: certificatePlatforms,
    });
    return output!;
  }
);
