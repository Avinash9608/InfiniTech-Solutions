
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import HeroContent from '@/models/HeroContent';
import { initialSlides, initialTaglines } from '@/lib/initialData';


// GET hero content
export async function GET() {
  await dbConnect();
  try {
    let heroContent = await HeroContent.findOne();
    if (!heroContent) {
      // If no content exists, create it with the initial static data
      heroContent = await HeroContent.create({
        taglines: initialTaglines,
        slides: initialSlides
      });
    }
    return NextResponse.json(heroContent);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
