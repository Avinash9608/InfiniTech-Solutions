"use client";

import PortfolioSection from "@/components/sections/PortfolioSection";
import PageHeader from "@/components/shared/PageHeader";
import StatsSection from "@/components/sections/StatsSection";
import CtaBanner from "@/components/sections/CtaBanner";
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader 
        title="Our Digital Showcase"
        description="We don't just build solutions; we build partnerships and success stories. Dive into our portfolio to see the tangible impact we've made for businesses across diverse industries. Each project is a testament to our commitment to quality, innovation, and results."
      />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <StatsSection />
      </motion.div>
      
      <PortfolioSection />
      
      <CtaBanner />
    </>
  );
}
