"use client"
import { motion } from 'framer-motion';

const logos = [
  { alt: 'TechCorp' },
  { alt: 'InnovateIO' },
  { alt: 'NextGen Solutions' },
  { alt: 'QuantumLeap' },
  { alt: 'Stellar Systems' },
  { alt: 'Apex Digital' },
];

const PlaceholderLogo = ({ alt }: { alt: string }) => (
  <svg className="w-32 h-12 text-muted-foreground/60 dark:text-muted-foreground/40" fill="currentColor" viewBox="0 0 120 40">
    <text x="60" y="25" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600">{alt}</text>
  </svg>
);


const marqueeVariants = {
  animate: {
    x: [0, -1090],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    },
  },
};

export default function BrandsSection() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-lg font-semibold text-muted-foreground mb-8">
          Trusted by Innovative Companies Worldwide
        </h3>
        <div className="relative w-full overflow-hidden group">
          <motion.div
            className="flex group-hover:[animation-play-state:paused]"
            variants={marqueeVariants}
            animate="animate"
          >
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-8 flex items-center justify-center">
                <PlaceholderLogo alt={logo.alt} />
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
