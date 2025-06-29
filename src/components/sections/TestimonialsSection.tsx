"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/src/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star } from 'lucide-react';
import type { Testimonial } from '@/src/lib/types';

const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah L.',
    company: 'Tech Solutions Inc.',
    rating: 5,
    review: 'InfiniTech Solutions transformed our online presence! Their web design team was incredibly creative and responsive. Our new website is both beautiful and functional.',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman smiling'
  },
  {
    id: '2',
    name: 'John B.',
    company: 'Growth Co.',
    rating: 5,
    review: 'The digital marketing services provided by InfiniTech have significantly boosted our leads. Their SEO strategies are top-notch. Highly recommended!',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'man professional'
  },
  {
    id: '3',
    name: 'Emily K.',
    company: 'Innovate App Studios',
    rating: 4,
    review: 'We partnered with InfiniTech for our mobile app development, and they delivered an excellent product on time and within budget. Great communication throughout.',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'person developer'
  },
  {
    id: '4',
    name: 'Michael P.',
    company: 'Enterprise Software Ltd.',
    rating: 5,
    review: 'Their custom software development team understood our complex requirements perfectly and built a solution that has streamlined our operations significantly.',
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'ceo portrait'
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from businesses like yours who have achieved remarkable results with InfiniTech Solutions.
          </p>
        </div>
        
        <Carousel 
          opts={{ align: "start", loop: true }} 
          plugins={[ Autoplay({ delay: 5000, stopOnInteraction: true }) ]}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonialsData.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col shadow-lg rounded-lg overflow-hidden">
                    <CardHeader className="flex flex-row items-center space-x-4 p-6 bg-card">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                        <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-primary">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-accent fill-accent' : 'text-muted-foreground/50'}`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic flex-grow">&ldquo;{testimonial.review}&rdquo;</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-50px] text-primary border-primary hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="right-[-50px] text-primary border-primary hover:bg-primary hover:text-primary-foreground" />
        </Carousel>
      </div>
    </section>
  );
}
