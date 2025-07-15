
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LayoutTemplate } from 'lucide-react';
import dbConnect from '@/lib/db';
import HeaderContent, { IHeaderContent } from '@/models/HeaderContent';
import HeaderAdminDashboard from '@/components/admin/HeaderAdminDashboard';

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

async function getHeaderContent() {
  await dbConnect();
  let content = await HeaderContent.findOne().lean();

  if (!content) {
    content = await HeaderContent.create(initialHeaderData);
    content = content.toObject();
  }
  
  return JSON.parse(JSON.stringify(content)) as IHeaderContent & { 
    _id: string; 
    navLinks: { _id: string }[],
    serviceLinks: { _id: string }[],
  };
}

export default async function HeaderAdminPage() {
  const content = await getHeaderContent();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <LayoutTemplate className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold text-primary">Manage Header</CardTitle>
              <CardDescription>Edit logo, navigation links, and call-to-action button.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Suspense fallback={<div>Loading dashboard...</div>}>
         <HeaderAdminDashboard initialContent={content} />
      </Suspense>
    </div>
  );
}
