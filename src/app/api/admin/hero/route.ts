
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import HeroContent from '@/models/HeroContent';

// GET hero content
export async function GET() {
  await dbConnect();
  try {
    let heroContent = await HeroContent.findOne();
    if (!heroContent) {
      // If no content exists, create some default content
      heroContent = await HeroContent.create({
        taglines: [
            "Pioneering Your Digital Future",
            "Building Tomorrow's Technology",
            "Innovate, Create, Elevate",
            "Your Vision, Engineered"
        ],
        slides: [
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
        ]
      });
    }
    return NextResponse.json(heroContent);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST (add a tagline or a slide)
export async function POST(request: Request) {
  await dbConnect();
  try {
    const { type, data } = await request.json();
    const heroContent = await HeroContent.findOne();

    if (!heroContent) {
      return NextResponse.json({ error: "Hero content not found" }, { status: 404 });
    }

    if (type === 'tagline') {
      heroContent.taglines.push(data.tagline);
    } else if (type === 'slide') {
      heroContent.slides.push(data);
    } else {
      return NextResponse.json({ error: "Invalid type specified" }, { status: 400 });
    }

    await heroContent.save();
    return NextResponse.json(heroContent, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT (update a tagline or a slide)
export async function PUT(request: Request) {
  await dbConnect();
  try {
    const { type, id, data } = await request.json();
    const heroContent = await HeroContent.findOne();

    if (!heroContent) {
      return NextResponse.json({ error: "Hero content not found" }, { status: 404 });
    }

    if (type === 'tagline') {
      const taglineIndex = heroContent.taglines.findIndex((t, index) => index.toString() === id);
      if (taglineIndex > -1) {
        heroContent.taglines[taglineIndex] = data.tagline;
      }
    } else if (type === 'slide') {
      const slide = heroContent.slides.id(id);
      if (slide) {
        slide.set(data);
      }
    } else {
      return NextResponse.json({ error: "Invalid type specified" }, { status: 400 });
    }

    await heroContent.save();
    return NextResponse.json(heroContent);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE (remove a tagline or a slide)
export async function DELETE(request: Request) {
    await dbConnect();
    try {
      const { type, id } = await request.json();
      const heroContent = await HeroContent.findOne();
  
      if (!heroContent) {
        return NextResponse.json({ error: "Hero content not found" }, { status: 404 });
      }
  
      if (type === 'tagline') {
        heroContent.taglines.splice(parseInt(id), 1);
      } else if (type === 'slide') {
         const slide = heroContent.slides.id(id);
         if(slide) {
            slide.deleteOne();
         }
      } else {
        return NextResponse.json({ error: "Invalid type specified" }, { status: 400 });
      }
  
      await heroContent.save();
      return NextResponse.json({ message: 'Item deleted successfully' });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
