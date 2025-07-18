
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
                src="https://media.istockphoto.com/id/1979289147/photo/data-analysis-science-and-big-data-with-ai-technology-analyst-or-scientist-uses-a-computer.jpg?s=2048x2048&w=is&k=20&c=CnYhOjeTPisYsN-OLYVp60ZNKK3jP3JCPZrCjxCqmto="
                alt="Data analysis and AI technology"
                fill
                className="object-cover"
                data-ai-hint="data analysis"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Team Section */}
      <motion.section
        className="py-16 md:py-24 bg-muted"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-10 flex items-center gap-2">
            <span role="img" aria-label="tools">🔧</span> Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Avinash Kumar */}
            <div className="bg-card rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
              <Image
                src="https://images.unsplash.com/photo-1570215171424-f74325192b55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbiUyMGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Avinash Kumar - Full Stack Developer"
                width={120}
                height={120}
                className="mb-4 border-4 border-primary"
                style={{ borderRadius: '50%', objectFit: 'cover', width: 120, height: 120, overflow: 'hidden', display: 'block' }}
              />
              <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                <span role="img" aria-label="developer">👨‍💻</span> Avinash Kumar
              </h3>
              <p className="text-primary font-medium mb-2">Full Stack Developer | Technical Lead</p>
              <p className="text-muted-foreground text-sm">
                Avinash specializes in designing and implementing scalable end-to-end web applications. He plays a pivotal role in system architecture, API development, and deployment strategies, ensuring robust technical performance across the platform.
              </p>
            </div>
            {/* Sagar Patel */}
            <div className="bg-card rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
              <Image
                src="https://plus.unsplash.com/premium_photo-1661371243525-d02768a7feee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Sagar Patel - Full Stack Developer"
                width={120}
                height={120}
                className="mb-4 border-4 border-primary"
                style={{ borderRadius: '50%', objectFit: 'cover', width: 120, height: 120, overflow: 'hidden', display: 'block' }}
              />
              <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                <span role="img" aria-label="brain">🧠</span> Sagar Patel
              </h3>
              <p className="text-primary font-medium mb-2">Full Stack Developer | Project Manager</p>
              <p className="text-muted-foreground text-sm">
                Sagar brings a balanced mix of technical expertise and leadership. He oversees the full development lifecycle, manages cross-functional teams, and ensures timely delivery of high-quality software solutions while maintaining agile practices.
              </p>
            </div>
            {/* Aman Singh */}
            <div className="bg-card rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwcHJvZmVzc2lvbmFsfGVufDB8fDB8fHww"
                alt="Aman Singh - CEO"
                width={120}
                height={120}
                className="mb-4 border-4 border-primary"
                style={{ borderRadius: '50%', objectFit: 'cover', width: 120, height: 120, overflow: 'hidden', display: 'block' }}
              />
              <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                <span role="img" aria-label="briefcase">💼</span> Aman Singh
              </h3>
              <p className="text-primary font-medium mb-2">Chief Executive Officer (CEO) | Business Analyst</p>
              <p className="text-muted-foreground text-sm">
                Aman drives the strategic vision of the organization and bridges the gap between technical execution and business goals. He conducts market analysis, defines KPIs, and ensures that business requirements align with technical capabilities for optimal outcomes.
              </p>
            </div>
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
