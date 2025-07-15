
import { Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CornerDownLeft } from 'lucide-react';
import dbConnect from '@/lib/db';
import FooterContent, { IFooterContent } from '@/models/FooterContent';
import FooterAdminDashboard from '@/components/admin/FooterAdminDashboard';

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

async function getFooterContent() {
  await dbConnect();
  let content = await FooterContent.findOne().lean();

  if (!content) {
    content = await FooterContent.create(initialFooterData);
    content = content.toObject();
  }
  
  return JSON.parse(JSON.stringify(content)) as IFooterContent & { 
    _id: string; 
    quickLinks: { _id: string }[],
    socialLinks: { _id: string }[],
  };
}

export default async function FooterAdminPage() {
  const content = await getFooterContent();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <CornerDownLeft className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold text-primary">Manage Footer</CardTitle>
              <CardDescription>Edit company details, contact info, and various links.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Suspense fallback={<div>Loading dashboard...</div>}>
         <FooterAdminDashboard initialContent={content} />
      </Suspense>
    </div>
  );
}
