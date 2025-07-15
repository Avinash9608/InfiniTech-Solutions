
import { Suspense } from 'react';
import dbConnect from '@/lib/db';
import HeroContent, { IHeroContent } from '@/models/HeroContent';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Tag, Image as ImageIcon, Eye } from 'lucide-react';
import { HeroAdminDashboard } from '@/components/sections/HeroAdminDashboard';
import { initialSlides, initialTaglines } from '@/lib/initialData';
import HeroSection from '@/components/sections/HeroSection';

async function getHeroContent() {
  await dbConnect();
  let content = await HeroContent.findOne().lean();

  if (!content) {
    // If no content exists, create it with the initial static data
    content = await HeroContent.create({
      taglines: initialTaglines,
      slides: initialSlides
    });
    content = content.toObject();
  }
  
  // Need to serialize the data to pass from Server to Client Component
  return JSON.parse(JSON.stringify(content)) as IHeroContent & { _id: string; slides: { _id: string }[] };
}

export default async function HeroAdminPage() {
  const content = await getHeroContent();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Bot className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold text-primary">Manage Hero Section</CardTitle>
              <CardDescription>Edit taglines and background slides for the homepage hero.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Suspense fallback={<div>Loading dashboard...</div>}>
         <HeroAdminDashboard initialContent={content} />
      </Suspense>

      <Card>
        <CardHeader>
            <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                <CardTitle>Live Preview</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <div className="relative w-full h-[50vh] overflow-hidden rounded-lg border shadow-lg">
                <div className="absolute inset-0 transform scale-[0.5] origin-top-left" style={{ width: '200%', height: '200%' }}>
                    <HeroSection initialContent={content} />
                </div>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
