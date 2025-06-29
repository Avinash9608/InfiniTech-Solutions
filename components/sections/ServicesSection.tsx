"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutGrid, TrendingUp, Cpu, Smartphone, ArrowRight, ShieldCheck, BarChart2, Cloud, BrainCircuit, BriefcaseBusiness, Settings2 } from 'lucide-react';
import type { Service } from '@/lib/types';
import Link from 'next/link';
import { motion } from 'framer-motion';

const servicesData: Omit<Service, 'details' | 'subServices' | 'caseStudies'>[] = [
  {
    id: 'web',
    title: 'Web Development',
    href: '/services/web-development',
    icon: LayoutGrid,
    description: 'Crafting responsive, high-performance websites and applications tailored to your brand.',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    href: '/services/cybersecurity',
    icon: ShieldCheck,
    description: 'Protecting your digital assets with robust security protocols and threat mitigation.',
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    href: '/services/data-analytics',
    icon: BarChart2,
    description: 'Turning raw data into actionable insights to drive business growth and strategy.',
  },
  {
    id: 'cloud',
    title: 'Cloud Services',
    href: '/services/cloud-services',
    icon: Cloud,
    description: 'Leveraging cloud platforms for scalable, efficient, and resilient infrastructure.',
  },
  {
    id: 'ai-ml',
    title: 'AI & ML',
    href: '/services/ai-ml',
    icon: BrainCircuit,
    description: 'Integrating intelligent automation and predictive models to enhance your operations.',
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    href: '/services/it-consulting',
    icon: BriefcaseBusiness,
    description: 'Providing expert strategic advice to align your technology with your business goals.',
  },
  {
    id: 'managed-services',
    title: 'Managed Services',
    href: '/services/managed-services',
    icon: Settings2,
    description: 'Proactive IT management and support to ensure your systems run smoothly 24/7.',
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    href: '/services/digital-marketing',
    icon: TrendingUp,
    description: 'Elevating your online presence and driving growth through data-driven marketing strategies.',
  },
];


interface ServicesSectionProps {
  showTitle?: boolean;
}

export default function ServicesSection({ showTitle = false }: ServicesSectionProps) {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Our Core Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer a comprehensive suite of IT services designed to empower your business and drive success in the digital landscape.
            </p>
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="h-full"
            >
              <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden h-full">
                <CardHeader className="bg-card p-6">
                  <div className="flex items-center space-x-4">
                     <service.icon className="w-10 h-10 text-primary" />
                     <CardTitle className="text-xl font-semibold text-primary">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-6 flex flex-col">
                  <CardDescription className="text-muted-foreground mb-4 flex-grow">{service.description}</CardDescription>
                  <Button asChild variant="outline" className="mt-auto w-full group">
                    <Link href={service.href}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
