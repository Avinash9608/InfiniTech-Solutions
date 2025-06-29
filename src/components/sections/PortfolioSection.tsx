"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Project } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const allProjects: Project[] = [
  { id: '1', title: 'E-commerce Platform', description: 'A full-featured online store for a fashion brand.', imageUrl: 'https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZSUyMGNvbW1lcmNlJTIwcGxhdGZvcm18ZW58MHx8MHx8fDA%3D', category: 'Web', dataAiHint: 'ecommerce fashion' },
  { id: '2', title: 'Mobile Banking App', description: 'Secure and intuitive banking app for iOS and Android.', imageUrl: 'https://plus.unsplash.com/premium_photo-1661306416293-e3ab553eb73a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'App', dataAiHint: 'mobile banking' },
  { id: '3', title: 'SEO Campaign for SaaS', description: 'Improved search rankings and organic traffic for a tech startup.', imageUrl: 'https://media.istockphoto.com/id/1218283380/photo/saas-software-as-a-service-concept-with-person-using-a-laptop.jpg?s=1024x1024&w=is&k=20&c=uthmNr7XmIiwqhzd6oyYwymLeWSRj1Dx8KGAtUanK6k=', category: 'Marketing', dataAiHint: 'seo analytics' },
  { id: '4', title: 'CRM Software', description: 'Custom CRM solution for managing client relationships.', imageUrl: 'https://media.istockphoto.com/id/1502436764/photo/crm-customer-relationship-management-concept-businessman-using-crm-software-for-business.jpg?s=2048x2048&w=is&k=20&c=__tj33aOCCzVgzQGFKGderUIZKYI_KI9Ai6xtGlM1aA=', category: 'Software', dataAiHint: 'crm dashboard' },
  { id: '5', title: 'Restaurant Booking System', description: 'Web application for online table reservations.', imageUrl: 'https://images.unsplash.com/photo-1723985860719-dfcb45214606?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Web', dataAiHint: 'restaurant booking' },
  { id: '6', title: 'Fitness Tracker App', description: 'Mobile app to monitor workouts and health metrics.', imageUrl: 'https://media.istockphoto.com/id/1339594011/photo/over-shoulder-view-asian-chinese-man-using-fitness-tracker-mobile-app-connecting-to-fitness.jpg?s=612x612&w=0&k=20&c=qrjknUWRhFrDmd5wuinX4uJnYBoTuf2gXbC_sx1LtsQ=', category: 'App', dataAiHint: 'fitness tracker' },
  { id: '7', title: 'Cybersecurity Audit', description: 'Comprehensive security audit for a financial firm.', imageUrl: 'https://plus.unsplash.com/premium_photo-1701179596614-9c64f50cda76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEN5YmVyc2VjdXJpdHklMjBBdWRpdHxlbnwwfHwwfHx8MA%3D%3D', category: 'Cybersecurity', dataAiHint: 'cybersecurity server' },
  { id: '8', title: 'Cloud Migration', description: 'Migrated on-premise infrastructure to AWS for a large enterprise.', imageUrl: 'https://media.istockphoto.com/id/1930821680/photo/internet-infrastructure-concept-abstract-technology-background.jpg?s=2048x2048&w=is&k=20&c=ssggRVFmm7ImVFh_OYjvWgd2B21VFxhv5fpJaAuRthQ=', category: 'Cloud', dataAiHint: 'cloud infrastructure' },
];

const categories: Project['category'][] = ['Web', 'App', 'Marketing', 'Software', 'Cybersecurity', 'Cloud'];

interface PortfolioSectionProps {
  summary?: boolean;
}

export default function PortfolioSection({ summary = false }: PortfolioSectionProps) {
  const [filter, setFilter] = useState<Project['category'] | 'All'>('All');

  const projectsToShow = summary ? allProjects.slice(0, 3) : allProjects;
  const filteredProjects = filter === 'All' ? projectsToShow : projectsToShow.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a selection of our finest projects, showcasing our expertise across various industries and technologies.
          </p>
        </div>

        {!summary && (
          <div className="flex justify-center mb-8">
            <Select value={filter} onValueChange={(value: Project['category'] | 'All') => setFilter(value)}>
              <SelectTrigger className="w-[180px] bg-card shadow">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">No projects found for this category.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="h-full"
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg flex flex-col h-full">
                  <div className="relative w-full h-60">
                    <Image 
                      src={project.imageUrl} 
                      alt={project.title} 
                      fill 
                      className="object-cover"
                      data-ai-hint={project.dataAiHint || project.category.toLowerCase()}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-primary">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                     <Button variant="link" className="text-primary p-0 group">
                      View Case Study <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {summary && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/portfolio">View All Projects</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
