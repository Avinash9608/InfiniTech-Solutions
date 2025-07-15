
'use server';

import { z } from 'zod';
import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';
import { generateItSolutions } from '@/ai/flows/generate-it-solutions';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  projectDetails: z.string().min(10, "Please provide some details about your project."),
});

export interface FormSubmissionState {
  success: boolean;
  message: string | null;
  solutions: string | null;
}

export async function submitContactForm(
  prevState: FormSubmissionState,
  formData: FormData
): Promise<FormSubmissionState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    projectDetails: formData.get('projectDetails'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check your entries.',
      solutions: null,
    };
  }
  
  const { name, email, phone, projectDetails } = validatedFields.data;

  try {
    await dbConnect();
    await Contact.create({ name, email, phone, projectDetails });

    const aiResult = await generateItSolutions({ businessDetails: projectDetails });

    if (!aiResult || !aiResult.solutions) {
        return {
            success: true,
            message: "Your message has been sent successfully! We will get back to you shortly.",
            solutions: "Could not generate AI recommendations at this time."
        }
    }

    return {
      success: true,
      message: "Message sent and solutions generated!",
      solutions: aiResult.solutions
    };
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    return {
      success: false,
      message: `An unexpected error occurred: ${error.message || 'Please try again later.'}`,
      solutions: null,
    };
  }
}
