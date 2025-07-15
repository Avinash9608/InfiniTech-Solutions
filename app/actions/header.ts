
'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import HeaderContent from '@/models/HeaderContent';

function verifyAdmin(secret: string | null) {
  const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET;
  if (!adminSecret || secret !== adminSecret) {
    throw new Error('Unauthorized');
  }
}

async function revalidate() {
    revalidatePath('/', 'layout');
    revalidatePath('/admin/header');
}

export async function updateLogoText(formData: FormData) {
  try {
    verifyAdmin(formData.get('secret') as string | null);
    await dbConnect();
    const logoText = formData.get('logoText') as string;
    await HeaderContent.findOneAndUpdate({}, { logoText }, { upsert: true });
    await revalidate();
    return { success: true, message: 'Logo text updated.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateCtaButton(formData: FormData) {
    try {
      verifyAdmin(formData.get('secret') as string | null);
      await dbConnect();
      const ctaButton = {
        label: formData.get('label') as string,
        href: formData.get('href') as string,
      };
      await HeaderContent.findOneAndUpdate({}, { ctaButton }, { upsert: true });
      await revalidate();
      return { success: true, message: 'CTA button updated.' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
}

// Nav Link Actions
export async function addNavLink(formData: FormData) {
  try {
    verifyAdmin(formData.get('secret') as string | null);
    await dbConnect();
    const newLink = {
      label: formData.get('label') as string,
      href: formData.get('href') as string,
    };
    await HeaderContent.findOneAndUpdate({}, { $push: { navLinks: newLink } }, { upsert: true });
    await revalidate();
    return { success: true, message: 'Navigation link added.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function editNavLink(formData: FormData) {
  try {
    verifyAdmin(formData.get('secret') as string | null);
    await dbConnect();
    const id = formData.get('id') as string;
    const updatedLink = {
      label: formData.get('label') as string,
      href: formData.get('href') as string,
    };
    await HeaderContent.updateOne({ 'navLinks._id': id }, { $set: { 'navLinks.$': { ...updatedLink, _id: id } } });
    await revalidate();
    return { success: true, message: 'Navigation link updated.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteNavLink(id: string, secret: string | null) {
  try {
    verifyAdmin(secret);
    await dbConnect();
    await HeaderContent.updateOne({}, { $pull: { navLinks: { _id: id } } });
    await revalidate();
    return { success: true, message: 'Navigation link deleted.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// Service Link Actions
export async function addServiceLink(formData: FormData) {
    try {
      verifyAdmin(formData.get('secret') as string | null);
      await dbConnect();
      const newLink = {
        label: formData.get('label') as string,
        href: formData.get('href') as string,
      };
      await HeaderContent.findOneAndUpdate({}, { $push: { serviceLinks: newLink } }, { upsert: true });
      await revalidate();
      return { success: true, message: 'Service link added.' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
  
  export async function editServiceLink(formData: FormData) {
    try {
      verifyAdmin(formData.get('secret') as string | null);
      await dbConnect();
      const id = formData.get('id') as string;
      const updatedLink = {
        label: formData.get('label') as string,
        href: formData.get('href') as string,
      };
      await HeaderContent.updateOne({ 'serviceLinks._id': id }, { $set: { 'serviceLinks.$': { ...updatedLink, _id: id } } });
      await revalidate();
      return { success: true, message: 'Service link updated.' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
  
  export async function deleteServiceLink(id: string, secret: string | null) {
    try {
      verifyAdmin(secret);
      await dbConnect();
      await HeaderContent.updateOne({}, { $pull: { serviceLinks: { _id: id } } });
      await revalidate();
      return { success: true, message: 'Service link deleted.' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
