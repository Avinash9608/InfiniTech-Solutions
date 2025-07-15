
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import FooterContent from '@/models/FooterContent';

const initialFooterData = {
    companyName: 'InfiniTech Solutions',
    companyDescription: 'Delivering innovative IT solutions to power your business growth. We specialize in web development, digital marketing, software, and mobile app creation.',
    quickLinks: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    contactInfo: {
      email: 'info@infinitech.com',
      phone: '+1 (234) 567-890',
      address: '123 Tech Avenue, Silicon Valley, CA 94000',
    },
    socialLinks: [
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Facebook', href: 'https://facebook.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'Twitter', href: 'https://twitter.com' },
    ]
  };

export async function GET() {
  await dbConnect();
  try {
    let footerContent = await FooterContent.findOne();
    if (!footerContent) {
      footerContent = await FooterContent.create(initialFooterData);
    }
    return NextResponse.json(footerContent);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
