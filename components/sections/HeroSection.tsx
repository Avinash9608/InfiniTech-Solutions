"use client";
import { Button } from '@/src/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden -mt-20">
      <div className="absolute inset-0">
        <Image 
          src="https://media.istockphoto.com/id/1363104929/photo/multi-ethnic-office-conference-room-indian-ceo-does-presentation-for-diverse-young.jpg?s=612x612&w=0&k=20&c=xMl3le4J8C91NphAHfvCCl8A68qjd1rHSIChVLni6VE=" 
          alt="Office conference room meeting" 
          fill
          className="object-cover" 
          quality={80}
          priority
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.8)]" />
      </div>
      <div className="relative z-10 p-8 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6"
        >
          Innovative IT Solutions for Your Business Growth
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-primary-foreground/90 mb-10"
        >
          We provide cutting-edge web design, digital marketing, and software development services to help your business thrive.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-x-4"
        >
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="/contact">Get a Free Consultation</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-accent border-accent hover:bg-accent hover:text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="/services">Explore Our Services</Link>
          </Button>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
