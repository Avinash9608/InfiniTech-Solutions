"use client";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import '@/styles/NewHero.css';
import { useEffect, useState } from 'react';

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

const taglines = [
    "Pioneering Your Digital Future",
    "Building Tomorrow's Technology",
    "Innovate, Create, Elevate",
    "Your Vision, Engineered"
]

const marqueeVariants = {
  animate: {
    x: ['0%', '-100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 40,
        ease: 'linear',
      },
    },
  },
};

export default function HeroSection() {
    const [currentTagline, setCurrentTagline] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTagline((prev) => (prev + 1) % taglines.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);


  return (
    <section className="hero-container">
      <div className="hero-background-marquee">
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
      
      <div className="hero-content-split">
         <div className="hero-text-content">
            <AnimatePresence mode="wait">
                <motion.h1
                    key={currentTagline}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="text-5xl md:text-6xl font-extrabold text-primary mb-6"
                >
                    {taglines[currentTagline]}
                </motion.h1>
            </AnimatePresence>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-lg md:text-xl text-foreground/80 max-w-lg"
            >
                We build digital experiences that drive growth, engagement, and success for your business.
            </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="hero-buttons-container"
        >
          <Link href="/contact" className="ui-btn">
            <span>
              Get Started
            </span>
          </Link>
          <Link href="/services" className="ui-btn">
             <span>
              Our Services
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
