import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/sections/ContactForm';

const subServices = [
  { title: 'Frontend Development', description: 'Engaging user interfaces with React, Next.js, and modern UI/UX principles.' },
  { title: 'Backend Development', description: 'Robust and scalable server-side logic with Node.js, Python, and Java.' },
  { title: 'CMS Development', description: 'Flexible content management using headless CMS like Strapi and Sanity.' },
  { title: 'Hosting & DevOps', description: 'Reliable deployments and infrastructure management on Vercel, AWS, and more.' },
];

const caseStudies = [
  { id: '1', title: 'E-commerce Platform', description: 'A full-featured online store for a fashion brand.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'ecommerce fashion' },
  { id: '5', title: 'Restaurant Booking System', description: 'Web application for online table reservations.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'restaurant booking' },
];

export default function WebDevelopmentPage() {
  return (
    <>
      <PageHeader
        title="Web Design & Development"
        description="We build modern, responsive, and secure web applications that drive user engagement and deliver exceptional business value. From sleek marketing sites to complex enterprise platforms, we bring your vision to life."
      />

      {/* Overview Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://placehold.co/600x450.png"
                alt="Web development process"
                fill
                objectFit="cover"
                data-ai-hint="web development ui"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Custom Solutions for the Modern Web</h2>
              <p className="text-muted-foreground mb-6">
                Our approach to web development is centered around your unique needs. We don't just build websites; we create digital experiences. By combining cutting-edge technology with user-centric design, we ensure your web presence is not only visually stunning but also fast, secure, and scalable.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-accent" />
                  <span>Performance-optimized and SEO-friendly code.</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-accent" />
                  <span>Mobile-first, responsive design for all devices.</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-accent" />
                  <span>Robust security measures to protect your data.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Services Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Web Development Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer a complete range of services to cover every aspect of your web project.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subServices.map((service) => (
              <Card key={service.title} className="text-center bg-card">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Related Case Studies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See our web development expertise in action.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {caseStudies.map((project) => (
              <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-60">
                   <Image 
                    src={project.imageUrl} 
                    alt={project.title} 
                    fill
                    objectFit="cover"
                    data-ai-hint={project.dataAiHint}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                  <p className="text-muted-foreground pt-2">{project.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
              <Button asChild>
                <Link href="/portfolio">
                  View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
        </div>
      </section>
      
      {/* AI Recommendation Form */}
      <ContactForm />
    </>
  );
}
