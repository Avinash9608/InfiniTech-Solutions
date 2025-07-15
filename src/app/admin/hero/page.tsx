
import { Suspense } from 'react';
import dbConnect from '@/lib/db';
import HeroContent, { IHeroContent } from '@/models/HeroContent';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Tag, Image as ImageIcon } from 'lucide-react';
import { HeroAdminDashboard } from '@/components/sections/HeroAdminDashboard';

async function getHeroContent() {
  await dbConnect();
  let content = await HeroContent.findOne().lean();

  if (!content) {
    // Create default content if it doesn't exist
    content = await HeroContent.create({
      taglines: ["Default Tagline 1", "Default Tagline 2"],
      slides: [
        { image: "https://placehold.co/600x400.png", text: "Default Slide 1", dataAiHint: "default" }
      ]
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

    </div>
  );
}
