'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const adminSecret = process.env.ADMIN_SECRET;

// Helper function to check for admin secret
const verifyAdmin = (secret: string | undefined) => {
  if (!adminSecret || secret !== adminSecret) {
    throw new Error('Unauthorized');
  }
};

// Action to delete a contact
export async function deleteContact(id: string, secret: string) {
  verifyAdmin(secret);
  try {
    await dbConnect();
    await Contact.findByIdAndDelete(id);
    revalidatePath('/admin');
    return { success: true, message: 'Contact deleted successfully.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// Schema for reply form
const replySchema = z.object({
  id: z.string(),
  replyMessage: z.string().min(10, 'Reply must be at least 10 characters long.'),
  secret: z.string(),
  attachment: z.instanceof(File).optional(),
});

// Action to send a reply
export async function replyToContact(formData: FormData) {
  const validatedFields = replySchema.safeParse({
    id: formData.get('id'),
    replyMessage: formData.get('replyMessage'),
    secret: formData.get('secret'),
    attachment: formData.get('attachment'),
  });

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid data.' };
  }

  const { id, replyMessage, secret, attachment } = validatedFields.data;
  verifyAdmin(secret);

  try {
    await dbConnect();
    const contact = await Contact.findById(id);

    if (!contact) {
      throw new Error('Contact not found.');
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"InfiniTech Solutions" <${process.env.EMAIL_USER}>`,
      to: contact.email,
      subject: `Re: Your Inquiry to InfiniTech Solutions`,
      html: `
        <p>Hello ${contact.name},</p>
        <p>Thank you for contacting InfiniTech Solutions. Here is a reply regarding your message:</p>
        <blockquote style="border-left: 2px solid #ccc; padding-left: 1em; margin-left: 1em;">
          ${replyMessage}
        </blockquote>
        <p>We will be in touch with more details shortly.</p>
        <p>Best regards,<br/>The InfiniTech Team</p>
      `,
      attachments: [],
    };
    
    if (attachment && attachment.size > 0) {
      const buffer = Buffer.from(await attachment.arrayBuffer());
      mailOptions.attachments!.push({
        filename: attachment.name,
        content: buffer,
        contentType: attachment.type,
      });
    }

    // Send the email
    await transporter.sendMail(mailOptions);

    // Update the contact to mark as replied
    contact.replied = true;
    await contact.save();

    revalidatePath('/admin');
    return { success: true, message: 'Reply sent successfully.' };
  } catch (error: any) {
    console.error('Reply Error:', error);
    return { success: false, message: `Failed to send reply: ${error.message}` };
  }
}
