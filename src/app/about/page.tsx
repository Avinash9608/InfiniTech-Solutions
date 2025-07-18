"use client";
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About InfiniTech Solutions"
        description="We are a passionate team of innovators and problem-solvers dedicated to creating technology that drives progress and transforms industries. Our mission is to empower businesses with cutting-edge IT solutions that are not only powerful but also intuitive and accessible."
      />
      
      <motion.section 
        className="py-16 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2015, InfiniTech Solutions started with a simple yet powerful idea: to make enterprise-level technology accessible to businesses of all sizes. We saw a gap in the market for a partner who could provide not just services, but true solutions tailored to the unique challenges of each client.
              </p>
              <p className="text-muted-foreground">
                From our humble beginnings, we've grown into a full-service IT powerhouse, but our core values remain the same. We believe in building long-term partnerships based on trust, transparency, and a relentless pursuit of excellence.
              </p>
            </div>
            <motion.div 
              className="relative h-80 rounded-lg overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
               <Image
                src="https://placehold.co/600x400.png"
                alt="Our team working"
                fill
                className="object-cover"
                data-ai-hint="team collaboration office"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <WhyChooseUsSection />
      </motion.div>

      <motion.section 
        className="py-16 md:py-24 bg-primary text-primary-foreground"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our growing team. If you're passionate about technology and innovation, we'd love to hear from you.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="/careers">View Open Positions</Link>
          </Button>
        </div>
      </motion.section>
    </>
  );
}
