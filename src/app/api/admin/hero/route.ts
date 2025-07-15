
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import HeroContent from '@/models/HeroContent';

// The initial data to seed the database with if it's empty
const initialSlides = [
  {
    image: "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?w=1920&auto=format&fit=crop&q=80",
    text: "Pioneering Web Solutions",
    dataAiHint: "it company"
  },
  {
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&auto=format&fit=crop&q=80",
    text: "Creative Digital Marketing",
    dataAiHint: "creative workspace"
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&auto=format&fit=crop&q=80",
    text: "Robust Software Development",
    dataAiHint: "team meeting"
  },
  {
    image: "https://images.unsplash.com/photo-1554232456-8727aae0cfa4?w=1920&auto=format&fit=crop&q=80",
    text: "Intuitive Mobile Applications",
    dataAiHint: "developer working"
  }
];

const initialTaglines = [
    "Pioneering Your Digital Future",
    "Building Tomorrow's Technology",
    "Innovate, Create, Elevate",
    "Your Vision, Engineered"
];


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
