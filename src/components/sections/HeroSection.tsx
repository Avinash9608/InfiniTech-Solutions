
"use client";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/NewHero.css';
import { useEffect, useState } from 'react';
import type { Slide } from '@/lib/types';

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
    const [content, setContent] = useState<{ taglines: string[]; slides: Slide[] } | null>(null);
    const [currentTagline, setCurrentTagline] = useState(0);

    useEffect(() => {
        async function fetchHeroContent() {
            try {
                const res = await fetch('/api/admin/hero');
                if (!res.ok) throw new Error('Failed to fetch hero content');
                const data = await res.json();
                setContent(data);
            } catch (error) {
                console.error(error);
                // Set fallback content on error
                setContent({
                    taglines: ["Your Vision, Engineered"],
                    slides: [{ image: "https://placehold.co/1920x1080.png", text: "Fallback Slide", dataAiHint: "technology" }]
                });
            }
        }
        fetchHeroContent();
    }, []);

    useEffect(() => {
        if (content && content.taglines.length > 0) {
            const timer = setInterval(() => {
                setCurrentTagline((prev) => (prev + 1) % content.taglines.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [content]);

  if (!content) {
    return (
        <section className="hero-container">
            <div className="flex items-center justify-center w-full h-full">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        </section>
    );
  }

  const { taglines, slides } = content;
  const slidesForMarquee = [...slides, ...slides];

  return (
    <section className="hero-container">
      <div className="hero-background-marquee">
        <motion.div
          className="hero-marquee-track"
          variants={marqueeVariants}
          animate="animate"
        >
          {slidesForMarquee.map((slide, index) => (
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
                    className="text-5xl md:text-6xl font-extrabold text-primary-foreground mb-6"
                >
                    {taglines[currentTagline]}
                </motion.h1>
            </AnimatePresence>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-lg md:text-xl text-primary-foreground/80 max-w-lg"
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
