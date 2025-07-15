
'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import HeroContent from '@/models/HeroContent';

function verifyAdmin(secret: string | null) {
  const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET;
  if (!adminSecret || secret !== adminSecret) {
    throw new Error('Unauthorized');
  }
}

export async function addTagline(formData: FormData) {
  try {
    verifyAdmin(formData.get('secret') as string | null);
    await dbConnect();
    const heroContent = await HeroContent.findOne();
    if (!heroContent) throw new Error('Hero content not found');
    
    heroContent.taglines.push(formData.get('tagline') as string);
    await heroContent.save();

    revalidatePath('/admin/hero');
    return { success: true, message: 'Tagline added successfully.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function editTagline(formData: FormData) {
  try {
    verifyAdmin(formData.get('secret') as string | null);
    const index = parseInt(formData.get('index') as string, 10);
    const tagline = formData.get('tagline') as string;

    await dbConnect();
    const heroContent = await HeroContent.findOne();
    if (!heroContent) throw new Error('Hero content not found');

    heroContent.taglines[index] = tagline;
    await heroContent.save();

    revalidatePath('/admin/hero');
    return { success: true, message: 'Tagline updated successfully.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteTagline(index: number, secret: string | null) {
  try {
    verifyAdmin(secret);
    await dbConnect();
    const heroContent = await HeroContent.findOne();
    if (!heroContent) throw new Error('Hero content not found');

    heroContent.taglines.splice(index, 1);
    await heroContent.save();

    revalidatePath('/admin/hero');
    return { success: true, message: 'Tagline deleted successfully.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function addSlide(formData: FormData) {
    try {
        verifyAdmin(formData.get('secret') as string | null);
        await dbConnect();
        const heroContent = await HeroContent.findOne();
        if (!heroContent) throw new Error('Hero content not found');

        const newSlide = {
            image: formData.get('image') as string,
            text: formData.get('text') as string,
            dataAiHint: formData.get('dataAiHint') as string,
        };

        heroContent.slides.push(newSlide);
        await heroContent.save();

        revalidatePath('/admin/hero');
        revalidatePath('/');
        return { success: true, message: 'Slide added successfully.' };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function editSlide(formData: FormData) {
    try {
        verifyAdmin(formData.get('secret') as string | null);
        const id = formData.get('id') as string;
        
        await dbConnect();
        const heroContent = await HeroContent.findOne();
        if (!heroContent) throw new Error('Hero content not found');

        const slide = heroContent.slides.id(id);
        if (slide) {
            slide.image = formData.get('image') as string;
            slide.text = formData.get('text') as string;
            slide.dataAiHint = formData.get('dataAiHint') as string;
        } else {
            throw new Error('Slide not found');
        }

        await heroContent.save();

        revalidatePath('/admin/hero');
        revalidatePath('/');
        return { success: true, message: 'Slide updated successfully.' };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function deleteSlide(id: string, secret: string | null) {
    try {
        verifyAdmin(secret);
        await dbConnect();
        const heroContent = await HeroContent.findOne();
        if (!heroContent) throw new Error('Hero content not found');
        
        const slide = heroContent.slides.id(id);
        if (slide) {
            await slide.deleteOne();
        } else {
            throw new Error('Slide not found');
        }

        await heroContent.save();

        revalidatePath('/admin/hero');
        revalidatePath('/');
        return { success: true, message: 'Slide deleted successfully.' };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
