
'use server';
/**
 * @fileOverview A simple chatbot flow for customer support.
 *
 * - chatFlow - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chatFlow function.
 * - ChatOutput - The return type for the chatFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChatInputSchema = z.object({
  query: z.string().describe('The user\'s question or message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  answer: z.string().describe('The chatbot\'s response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chatFlow(input: ChatInput): Promise<ChatOutput> {
  const prompt = ai.definePrompt({
    name: 'chatPrompt',
    input: { schema: ChatInputSchema },
    output: { schema: ChatOutputSchema },
    prompt: `You are a friendly and helpful customer support assistant for a company called InfiniTech Solutions, a modern IT services company.

Your goal is to answer the user's questions accurately and concisely. Keep your answers brief and to the point.

User's question: {{{query}}}`,
  });

  const { output } = await prompt(input);
  return output!;
}
