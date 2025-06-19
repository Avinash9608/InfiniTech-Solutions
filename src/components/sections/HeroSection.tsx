"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-secondary">
      <div className="absolute inset-0 opacity-10">
        <Image 
          src="https://placehold.co/1920x1080.png" 
          alt="Abstract technology background" 
          layout="fill" 
          objectFit="cover" 
          quality={80}
          data-ai-hint="abstract technology"
          priority
        />
      </div>
      <div className="relative z-10 p-8 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 shadow-sm">
          Innovative IT Solutions for Your Business Growth
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10">
          We provide cutting-edge web design, digital marketing, and software development services to help your business thrive.
        </p>
        <div className="space-x-4">
          <Button size="lg" onClick={scrollToContact} className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
            Get a Free Consultation
          </Button>
          <Button size="lg" variant="outline" onClick={scrollToServices} className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary shadow-lg transform hover:scale-105 transition-transform duration-300">
            Explore Our Services
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
