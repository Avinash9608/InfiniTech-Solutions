
"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    } 
  },
};

export default function AboutSummarySection() {
  return (
    <motion.section 
      className="py-16 md:py-24 bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-sm font-bold tracking-wider uppercase text-primary">
              👨‍💼 About Us
            </span>
          </motion.div>
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6"
          >
            Turning Ideas Into Impactful Digital Realities
          </motion.h2>
          <motion.p 
            variants={itemVariants} 
            className="text-lg text-muted-foreground mb-8"
          >
            At our core, we are a forward-thinking IT solutions company, built to empower businesses and individuals in today’s rapidly evolving digital landscape. In an era where technology shapes every interaction and opportunity, we believe in making innovation accessible and meaningful.
          </motion.p>
          <motion.p 
            variants={itemVariants} 
            className="text-lg text-muted-foreground mb-12"
          >
            We specialize in delivering high-quality, customized IT services with a strong focus on AI, Machine Learning, and modern digital tools. Our mission is to bridge the gap between your vision and real-world digital execution — helping transform your ideas into intelligent, impactful solutions.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="bg-secondary p-8 rounded-lg shadow-md border border-border"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              💼 Our Perspective
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We don't just deliver services — we become your technology partner. By aligning your goals with cutting-edge digital strategies, we help you stay ahead in a competitive market.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12">
            <Button size="lg" asChild>
              <Link href="/contact">
                Connect With Us <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
