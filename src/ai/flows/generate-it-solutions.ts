'use server';

/**
 * @fileOverview AI-powered tool to generate personalized IT solution recommendations based on user-provided business details via contact form.
 *
 * - generateItSolutions - A function that handles the generation of IT solutions.
 * - GenerateItSolutionsInput - The input type for the generateItSolutions function.
 * - GenerateItSolutionsOutput - The return type for the generateItSolutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateItSolutionsInputSchema = z.object({
  businessDetails: z
    .string()
    .describe('Details about the business, its needs, and its goals.'),
});
export type GenerateItSolutionsInput = z.infer<typeof GenerateItSolutionsInputSchema>;

const GenerateItSolutionsOutputSchema = z.object({
  solutions: z.string().describe('Personalized IT solution recommendations for the business.'),
});
export type GenerateItSolutionsOutput = z.infer<typeof GenerateItSolutionsOutputSchema>;

export async function generateItSolutions(input: GenerateItSolutionsInput): Promise<GenerateItSolutionsOutput> {
  return generateItSolutionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateItSolutionsPrompt',
  input: {schema: GenerateItSolutionsInputSchema},
  output: {schema: GenerateItSolutionsOutputSchema},
  prompt: `You are an AI-powered IT solutions expert.

  Based on the business details provided, generate personalized IT solution recommendations.

  Business Details: {{{businessDetails}}}
  `,
});

const generateItSolutionsFlow = ai.defineFlow(
  {
    name: 'generateItSolutionsFlow',
    inputSchema: GenerateItSolutionsInputSchema,
    outputSchema: GenerateItSolutionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
