
'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import FooterContent from '@/models/FooterContent';

function verifyAdmin(secret: string | null) {
  const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET;
  if (!adminSecret || secret !== adminSecret) {
    throw new Error('Unauthorized');
  }
}

async function revalidate() {
    revalidatePath('/', 'layout');
    revalidatePath('/admin/footer');
}

// General Info Actions
export async function updateCompanyInfo(formData: FormData) {
    try {
      verifyAdmin(formData.get('secret') as string | null);
      await dbConnect();
      const companyInfo = {
        companyName: formData.get('companyName') as string,
        companyDescription: formData.get('companyDescription') as string,
      };
      await FooterContent.findOneAndUpdate({}, { companyInfo }, { upsert: true });
      await revalidate();
      return { success: true, message: 'Company info updated.' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
}

export async function updateContactInfo(formData: FormData) {
    try {
        verifyAdmin(formData.get('secret') as string | null);
        await dbConnect();
        const contactInfo = {
          email: formData.get('email') as string,
          phone: formData.get('phone') as string,
          address: formData.get('address') as string,
        };
        await FooterContent.findOneAndUpdate({}, { contactInfo }, { upsert: true });
        await revalidate();
        return { success: true, message: 'Contact info updated.' };
      } catch (error: any) {
        return { success: false, message: error.message };
      }
}

// Quick Link Actions
export async function addQuickLink(formData: FormData) {
  try {
    verifyAdmin(formData.get('secret') as string | null);
    await dbConnect();
    const newLink = {
      label: formData.get('label') as string,
      href: formData.get('href') as string,
    };
    await FooterContent.findOneAndUpdate({}, { $push: { quickLinks: newLink } }, { upsert: true });
    await revalidate();
    return { success: true, message: 'Quick link added.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function editQuickLink(formData: FormData) {
  try {
    verifyAdmin(formData.get('secret') as string | null);
    await dbConnect();
    const id = formData.get('id') as string;
    const updatedLink = {
      label: formData.get('label') as string,
      href: formData.get('href') as string,
    };
    await FooterContent.updateOne({ 'quickLinks._id': id }, { $set: { 'quickLinks.$': { ...updatedLink, _id: id } } });
    await revalidate();
    return { success: true, message: 'Quick link updated.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteQuickLink(id: string, secret: string | null) {
  try {
    verifyAdmin(secret);
    await dbConnect();
    await FooterContent.updateOne({}, { $pull: { quickLinks: { _id: id } } });
    await revalidate();
    return { success: true, message: 'Quick link deleted.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// Social Link Actions
export async function addSocialLink(formData: FormData) {
    try {
      verifyAdmin(formData.get('secret') as string | null);
      await dbConnect();
      const newLink = {
        label: formData.get('label') as string,
        href: formData.get('href') as string,
      };
      await FooterContent.findOneAndUpdate({}, { $push: { socialLinks: newLink } }, { upsert: true });
      await revalidate();
      return { success: true, message: 'Social link added.' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
  
  export async function editSocialLink(formData: FormData) {
    try {
      verifyAdmin(formData.get('secret') as string | null);
      await dbConnect();
      const id = formData.get('id') as string;
      const updatedLink = {
        label: formData.get('label') as string,
        href: formData.get('href') as string,
      };
      await FooterContent.updateOne({ 'socialLinks._id': id }, { $set: { 'socialLinks.$': { ...updatedLink, _id: id } } });
      await revalidate();
      return { success: true, message: 'Social link updated.' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
  
  export async function deleteSocialLink(id: string, secret: string | null) {
    try {
      verifyAdmin(secret);
      await dbConnect();
      await FooterContent.updateOne({}, { $pull: { socialLinks: { _id: id } } });
      await revalidate();
      return { success: true, message: 'Social link deleted.' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
