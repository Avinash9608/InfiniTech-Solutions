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
  { id: '1', title: 'E-commerce Platform', description: 'A full-featured online store for a fashion brand.', imageUrl: 'https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Web', dataAiHint: 'ecommerce fashion' },
  { id: '2', title: 'Mobile Banking App', description: 'Secure and intuitive banking app for iOS and Android.', imageUrl: 'https://plus.unsplash.com/premium_photo-1661306416293-e3ab553eb73a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TW9iaWxlJTIwQmFua2luZyUyMEFwcHxlbnwwfHwwfHx8MA%3D%3D', category: 'App', dataAiHint: 'mobile banking' },
  { id: '3', title: 'SEO Campaign for SaaS', description: 'Improved search rankings and organic traffic for a tech startup.', imageUrl: 'https://plus.unsplash.com/premium_photo-1685283298465-e52e933a3312?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VvfGVufDB8fDB8fHww', category: 'Marketing', dataAiHint: 'seo analytics' },
  { id: '4', title: 'CRM Software', description: 'Custom CRM solution for managing client relationships.', imageUrl: 'https://plus.unsplash.com/premium_photo-1733306696471-807493ff845b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3JtfGVufDB8fDB8fHww', category: 'Software', dataAiHint: 'crm dashboard' },
  { id: '5', title: 'Restaurant Booking System', description: 'Web application for online table reservations.', imageUrl: 'https://images.unsplash.com/photo-1724426057815-a12b34f027c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlc3R1cmFudHxlbnwwfHwwfHx8MA%3D%3D', category: 'Web', dataAiHint: 'restaurant booking' },
  { id: '6', title: 'Fitness Tracker App', description: 'Mobile app to monitor workouts and health metrics.', imageUrl: 'https://plus.unsplash.com/premium_photo-1681495023390-f68740fa8fec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D', category: 'App', dataAiHint: 'fitness tracker' },
  { id: '7', title: 'Cybersecurity Audit', description: 'Comprehensive security audit for a financial firm.', imageUrl: 'https://plus.unsplash.com/premium_photo-1664297541167-9fd8e28c888d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3liZXJ8ZW58MHx8MHx8fDA%3D', category: 'Cybersecurity', dataAiHint: 'cybersecurity server' },
  { id: '8', title: 'Cloud Migration', description: 'Migrated on-premise infrastructure to AWS for a large enterprise.', imageUrl: 'https://media.istockphoto.com/id/1420039843/photo/cloud-computing-backup-cyber-security-fingerprint-identity-encryption-technology.webp?a=1&b=1&s=612x612&w=0&k=20&c=D3xbPlE1_xbU5K6MUUK8aZbgkyFAVQuCtxe53YUeZho=', category: 'Cloud', dataAiHint: 'cloud infrastructure' },
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
