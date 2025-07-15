
'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import WhyChooseUsContent, { IWhyChooseUsContent } from '@/models/WhyChooseUsContent';

function verifyAdmin(secret: string | null) {
  const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET;
  if (!adminSecret || secret !== adminSecret) {
    throw new Error('Unauthorized');
  }
}

async function revalidate() {
    revalidatePath('/', 'layout');
    revalidatePath('/admin/why-choose-us');
}

export async function addUspItem(formData: FormData) {
  try {
    verifyAdmin(formData.get('secret') as string | null);
    await dbConnect();
    const newItem = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
    };
    await WhyChooseUsContent.findOneAndUpdate({}, { $push: { uspItems: newItem } }, { upsert: true });
    await revalidate();
    return { success: true, message: 'Item added successfully.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function editUspItem(formData: FormData) {
  try {
    verifyAdmin(formData.get('secret') as string | null);
    await dbConnect();
    const id = formData.get('id') as string;
    const updatedItem = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
    };
    await WhyChooseUsContent.updateOne({ 'uspItems._id': id }, { $set: { 'uspItems.$': { ...updatedItem, _id: id } } });
    await revalidate();
    return { success: true, message: 'Item updated successfully.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteUspItem(id: string, secret: string | null) {
  try {
    verifyAdmin(secret);
    await dbConnect();
    await WhyChooseUsContent.updateOne({}, { $pull: { uspItems: { _id: id } } });
    await revalidate();
    return { success: true, message: 'Item deleted successfully.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
