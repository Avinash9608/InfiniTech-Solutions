"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Project } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

const allProjects: Project[] = [
  { id: '1', title: 'E-commerce Platform', description: 'A full-featured online store for a fashion brand.', imageUrl: 'https://placehold.co/600x400.png', category: 'Web', dataAiHint: 'ecommerce fashion' },
  { id: '2', title: 'Mobile Banking App', description: 'Secure and intuitive banking app for iOS and Android.', imageUrl: 'https://placehold.co/600x400.png', category: 'App', dataAiHint: 'mobile banking' },
  { id: '3', title: 'SEO Campaign for SaaS', description: 'Improved search rankings and organic traffic for a tech startup.', imageUrl: 'https://placehold.co/600x400.png', category: 'Marketing', dataAiHint: 'seo analytics' },
  { id: '4', title: 'CRM Software', description: 'Custom CRM solution for managing client relationships.', imageUrl: 'https://placehold.co/600x400.png', category: 'Software', dataAiHint: 'crm dashboard' },
  { id: '5', title: 'Restaurant Booking System', description: 'Web application for online table reservations.', imageUrl: 'https://placehold.co/600x400.png', category: 'Web', dataAiHint: 'restaurant booking' },
  { id: '6', title: 'Fitness Tracker App', description: 'Mobile app to monitor workouts and health metrics.', imageUrl: 'https://placehold.co/600x400.png', category: 'App', dataAiHint: 'fitness tracker' },
];

const categories: Project['category'][] = ['Web', 'App', 'Marketing', 'Software'];

export default function PortfolioSection() {
  const [filter, setFilter] = useState<Project['category'] | 'All'>('All');

  const filteredProjects = filter === 'All' ? allProjects : allProjects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a selection of our finest projects, showcasing our expertise across various industries and technologies.
          </p>
        </div>

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

        {filteredProjects.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">No projects found for this category.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg flex flex-col">
                <div className="relative w-full h-60">
                  <Image 
                    src={project.imageUrl} 
                    alt={project.title} 
                    layout="fill" 
                    objectFit="cover"
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
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
