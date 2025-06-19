import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, HeartHandshake, BadgeDollarSign, Clock, RefreshCcw, Zap } from 'lucide-react';
import type { USP } from '@/lib/types';

const uspData: USP[] = [
  {
    id: 'team',
    title: 'Experienced & Certified Team',
    description: 'Our professionals bring years of expertise and industry certifications to deliver top-quality solutions.',
    icon: Users,
  },
  {
    id: 'client-centric',
    title: 'Client-Centric Approach',
    description: 'We prioritize your needs, ensuring tailored solutions and transparent communication throughout the project.',
    icon: HeartHandshake,
  },
  {
    id: 'pricing',
    title: 'Affordable Pricing',
    description: 'Competitive and transparent pricing models designed to provide maximum value for your investment.',
    icon: BadgeDollarSign,
  },
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Dedicated support team available around the clock to assist you with any queries or issues.',
    icon: Clock,
  },
  {
    id: 'agile',
    title: 'Agile Development',
    description: 'Flexible and iterative development process to adapt to changes and deliver results efficiently.',
    icon: RefreshCcw,
  },
  {
    id: 'innovation',
    title: 'Innovative Solutions',
    description: 'We leverage the latest technologies to provide cutting-edge solutions that drive business growth.',
    icon: Zap,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Why Partner with InfiniTech?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the advantages of choosing us as your trusted IT services provider. We are committed to your success.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {uspData.map((item) => (
            <Card key={item.id} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-4">
                  <item.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl font-semibold text-primary">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
