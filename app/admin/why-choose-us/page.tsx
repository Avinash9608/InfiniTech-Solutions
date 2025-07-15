
import { Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HeartHandshake } from 'lucide-react';
import dbConnect from '@/lib/db';
import WhyChooseUsContent, { IWhyChooseUsContent } from '@/models/WhyChooseUsContent';
import WhyChooseUsAdminDashboard from '@/components/admin/WhyChooseUsAdminDashboard';

const initialUspData = {
    uspItems: [
      { title: 'Experienced & Certified Team', description: 'Our professionals bring years of expertise and industry certifications to deliver top-quality solutions.', icon: 'Users' },
      { title: 'Client-Centric Approach', description: 'We prioritize your needs, ensuring tailored solutions and transparent communication throughout the project.', icon: 'HeartHandshake' },
      { title: 'Affordable Pricing', description: 'Competitive and transparent pricing models designed to provide maximum value for your investment.', icon: 'BadgeDollarSign' },
      { title: '24/7 Support', description: 'Dedicated support team available around the clock to assist you with any queries or issues.', icon: 'Clock' },
      { title: 'Agile Development', description: 'Flexible and iterative development process to adapt to changes and deliver results efficiently.', icon: 'RefreshCcw' },
      { title: 'Innovative Solutions', description: 'We leverage the latest technologies to provide cutting-edge solutions that drive business growth.', icon: 'Zap' },
    ]
};

async function getWhyChooseUsContent() {
  await dbConnect();
  let content = await WhyChooseUsContent.findOne().lean();

  if (!content) {
    content = await WhyChooseUsContent.create(initialUspData);
    content = content.toObject();
  }
  
  return JSON.parse(JSON.stringify(content)) as IWhyChooseUsContent & { 
    _id: string; 
    uspItems: { _id: string, title: string, description: string, icon: string }[]
  };
}

export default async function WhyChooseUsAdminPage() {
  const content = await getWhyChooseUsContent();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <HeartHandshake className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold text-primary">Manage 'Why Choose Us'</CardTitle>
              <CardDescription>Edit the unique selling propositions displayed on the homepage.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Suspense fallback={<div>Loading dashboard...</div>}>
         <WhyChooseUsAdminDashboard initialContent={content} />
      </Suspense>
    </div>
  );
}
