
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import HeaderContent from '@/models/HeaderContent';

const initialHeaderData = {
    logoText: 'InfiniTech',
    navLinks: [
      { label: 'Home', href: '/' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'About Us', href: '/about' },
    ],
    serviceLinks: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Cybersecurity', href: '/services/cybersecurity' },
      { label: 'Data Analytics', href: '/services/data-analytics' },
      { label: 'Cloud Services', href: '/services/cloud-services' },
      { label: 'AI & ML', href: '/services/ai-ml' },
      { label: 'IT Consulting', href: '/services/it-consulting' },
      { label: 'Managed Services', href: '/services/managed-services' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
    ],
    ctaButton: { label: 'Contact Us', href: '/contact' },
  };

export async function GET() {
  await dbConnect();
  try {
    let headerContent = await HeaderContent.findOne();
    if (!headerContent) {
      headerContent = await HeaderContent.create(initialHeaderData);
    }
    return NextResponse.json(headerContent);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
