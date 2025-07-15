
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IWhyChooseUsContent } from '@/models/WhyChooseUsContent';
import * as LucideIcons from 'lucide-react';

const renderIcon = (iconName: string, props = {}) => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent ? <IconComponent {...props} /> : <HeartHandshake {...props} />;
};

const defaultContent: IWhyChooseUsContent = {
    uspItems: [
      { title: 'Experienced & Certified Team', description: 'Our professionals bring years of expertise and industry certifications to deliver top-quality solutions.', icon: 'Users' },
      { title: 'Client-Centric Approach', description: 'We prioritize your needs, ensuring tailored solutions and transparent communication throughout the project.', icon: 'HeartHandshake' },
      { title: 'Affordable Pricing', description: 'Competitive and transparent pricing models designed to provide maximum value for your investment.', icon: 'BadgeDollarSign' },
    ]
} as IWhyChooseUsContent;


export default function WhyChooseUsSection() {
  const [content, setContent] = useState<IWhyChooseUsContent>(defaultContent);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('/api/admin/why-choose-us');
        if (res.ok) {
          const data = await res.json();
          if (data && data.uspItems) {
            setContent(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch Why Choose Us content", error);
      }
    }
    fetchContent();
  }, []);

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
          {content.uspItems.map((item, index) => (
            <motion.div
              key={(item as any)._id || index}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="h-full"
            >
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg h-full">
                <CardHeader className="pb-4">
                  <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-4">
                    {renderIcon(item.icon, {className: 'w-8 h-8'})}
                  </div>
                  <CardTitle className="text-xl font-semibold text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
