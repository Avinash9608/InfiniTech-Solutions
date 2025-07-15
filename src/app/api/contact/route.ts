import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Contact from '@/models/Contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    const { name, email, projectDetails } = body;
    if (!name || !email || !projectDetails) {
      return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }

    await dbConnect();
    
    const newContact = await Contact.create(body);

    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
  } catch (error: any) {
    console.error('API Error:', error);
    // Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      let errors: { [key: string]: string } = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return NextResponse.json({ success: false, message: 'Validation failed', errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Server Error', error: error.message }, { status: 500 });
  }
}
