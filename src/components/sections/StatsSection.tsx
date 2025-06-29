"use client";
import { Briefcase, Heart, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { value: '50+', label: 'Projects Delivered', icon: Briefcase },
  { value: '98%', label: 'Client Satisfaction', icon: Heart },
  { value: '30+', label: 'Happy Clients', icon: Users },
  { value: '8+', label: 'Years of Expertise', icon: Award }
];

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={statVariants}
              className="flex flex-col items-center"
            >
              <div className="flex justify-center items-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full text-primary">
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
              <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
