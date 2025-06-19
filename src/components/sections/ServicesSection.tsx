"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutGrid, TrendingUp, Cpu, Smartphone, ArrowRight } from 'lucide-react';
import type { Service } from '@/lib/types';

const servicesData: Service[] = [
  {
    id: 'web',
    title: 'Website Design & Development',
    icon: LayoutGrid,
    description: 'Crafting responsive, SEO-friendly websites tailored to your brand. Utilizing modern CMS platforms like WordPress, Shopify, and custom solutions.',
    details: ['Responsive Design', 'SEO Optimization', 'CMS Development (WordPress, Shopify)', 'E-commerce Solutions', 'Custom Web Applications'],
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    icon: TrendingUp,
    description: 'Elevating your online presence with strategic digital marketing. Driving growth through SEO, PPC, social media, and compelling content.',
    details: ['Search Engine Optimization (SEO)', 'Pay-Per-Click (PPC) Advertising', 'Social Media Marketing', 'Content Marketing', 'Email Marketing'],
  },
  {
    id: 'software',
    title: 'Software Development',
    icon: Cpu,
    description: 'Building robust custom software, SaaS applications, ERP, and CRM systems to streamline your business operations and enhance productivity.',
    details: ['Custom Software Solutions', 'SaaS Application Development', 'ERP & CRM Integration', 'API Development', 'Database Design'],
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    icon: Smartphone,
    description: 'Developing high-performance Android & iOS applications. Creating engaging user experiences with native and cross-platform solutions.',
    details: ['Native iOS App Development', 'Native Android App Development', 'Cross-Platform App Development (React Native, Flutter)', 'UI/UX Design for Mobile', 'App Maintenance & Support'],
  },
];

export default function ServicesSection() {
  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Core Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive suite of IT services designed to empower your business and drive success in the digital landscape.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service) => (
            <Card key={service.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
              <CardHeader className="bg-card p-6">
                <div className="flex items-center space-x-4">
                   <service.icon className="w-12 h-12 text-primary" />
                   <CardTitle className="text-xl font-semibold text-primary">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6 flex flex-col">
                <CardDescription className="text-muted-foreground mb-4 flex-grow">{service.description}</CardDescription>
                {/* Removed list of details for brevity in card, can be on a dedicated page */}
                {/* <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-6">
                  {service.details.slice(0, 3).map(detail => <li key={detail}>{detail}</li>)}
                </ul> */}
                <Button onClick={scrollToContact} variant="outline" className="mt-auto w-full group">
                  Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
