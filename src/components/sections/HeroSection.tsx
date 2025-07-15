"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 items-center min-h-[calc(100vh-5rem)] pt-20 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10 text-center lg:text-left"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight"
            >
              Engineering the Future, <br />
              <span className="text-foreground">One Solution at a Time.</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0"
            >
              We provide cutting-edge web design, digital marketing, and software development services to help your business thrive in the digital age.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button size="lg" asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link href="/contact">Get a Free Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-primary border-primary hover:bg-primary hover:text-primary-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-96 lg:h-full w-full mt-12 lg:mt-0"
          >
            <Image 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Futuristic technology dashboard"
              fill
              className="object-contain"
              priority
              data-ai-hint="futuristic technology"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
