"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star } from 'lucide-react';
import type { Testimonial } from '@/lib/types';

const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Ankit Singh.',
    company: 'Tech Solutions Inc.',
    rating: 5,
    review: 'InfiniTech Solutions transformed our online presence! Their web design team was incredibly creative and responsive. Our new website is both beautiful and functional.',
    avatarUrl: 'https://images.unsplash.com/photo-1558154839-19f6ddb31384?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdvbWVuJTIwc21pbGVmYWNlfGVufDB8fDB8fHww',
    dataAiHint: 'woman smiling'
  },
  {
    id: '2',
    name: 'Aman Singh.',
    company: 'Growth Co.',
    rating: 5,
    review: 'The digital marketing services provided by InfiniTech have significantly boosted our leads. Their SEO strategies are top-notch. Highly recommended!',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwcHJvZmVzc2lvbmFsfGVufDB8fDB8fHww',
    dataAiHint: 'man professional'
  },
  {
    id: '3',
    name: 'Avinash Kumar',
    company: 'Innovate App Studios',
    rating: 4,
    review: 'We partnered with InfiniTech for our mobile app development, and they delivered an excellent product on time and within budget. Great communication throughout.',
    avatarUrl: 'https://images.unsplash.com/photo-1570215171424-f74325192b55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbiUyMGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D',
    dataAiHint: 'person developer'
  },
  {
    id: '4',
    name: 'Sagar Patel',
    company: 'Enterprise Software Ltd.',
    rating: 5,
    review: 'Their custom software development team understood our complex requirements perfectly and built a solution that has streamlined our operations significantly.',
    avatarUrl: 'https://images.unsplash.com/photo-1539025828301-b314ca222fa9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2VvJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
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
