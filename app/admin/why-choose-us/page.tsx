
import { Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HeartHandshake } from 'lucide-react';
import dbConnect from '@/lib/db';

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

export default function AdminWhyChooseUsPage() {
  return <div>Why Choose Us admin page removed.</div>;
}
