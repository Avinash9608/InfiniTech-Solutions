"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/ImageSliderHero.css';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?w=1920&auto=format&fit=crop&q=80",
    text: "Pioneering Web Solutions",
    dataAiHint: "it company"
  },
  {
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&auto=format&fit=crop&q=80",
    text: "Creative Digital Marketing",
    dataAiHint: "creative workspace"
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&auto=format&fit=crop&q=80",
    text: "Robust Software Development",
    dataAiHint: "team meeting"
  },
  {
    image: "https://images.unsplash.com/photo-1554232456-8727aae0cfa4?w=1920&auto=format&fit=crop&q=80",
    text: "Intuitive Mobile Applications",
    dataAiHint: "developer working"
  }
];

const slideVariants = {
  enter: {
    x: '100%',
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: '-100%',
    opacity: 0,
  },
};

const transition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.5 }
};

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-slider">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={index}
          className="hero-slide"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
        >
          <Image
            src={slides[index].image}
            alt={slides[index].text}
            fill
            priority
            className="object-cover"
            data-ai-hint={slides[index].dataAiHint}
          />
        </motion.div>
      </AnimatePresence>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              className="text-5xl md:text-7xl font-extrabold text-primary-foreground mb-6"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              {slides[index].text}
            </motion.h1>
          </AnimatePresence>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
          >
            We build digital experiences that drive growth, engagement, and success for your business.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="space-x-4"
          >
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/services">Our Services</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
