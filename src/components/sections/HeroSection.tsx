"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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

const marqueeVariants = {
  animate: {
    x: ['0%', '-100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 40, // Adjust duration for speed
        ease: 'linear',
      },
    },
  },
};

export default function HeroSection() {
  return (
    <section className="hero-slider">
      <div className="hero-marquee-container">
        <motion.div
          className="hero-marquee-track"
          variants={marqueeVariants}
          animate="animate"
        >
          {[...slides, ...slides].map((slide, index) => (
            <div key={index} className="hero-marquee-slide">
              <Image
                src={slide.image}
                alt={slide.text}
                fill
                priority={index < slides.length}
                className="object-cover"
                data-ai-hint={slide.dataAiHint}
              />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold text-primary-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Pioneering Your Digital Future
            </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
          >
            We build digital experiences that drive growth, engagement, and success for your business.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
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