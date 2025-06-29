"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';
import { 
  ShieldHalf,
  CheckCircle,
  Activity,
  Headset,
  Network,
  DatabaseBackup,
  Ticket,
  Users,
  CheckSquare,
  BarChart,
  BadgeDollarSign,
  TrendingUp,
  Handshake
} from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/sections/ContactForm';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number = 1) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      type: 'spring',
      stiffness: 200
    },
  }),
};

const coreServices = [
  { title: "Proactive Monitoring & Maintenance", description: "We monitor your systems 24/7 to identify and resolve issues before they become problems.", icon: Activity },
  { title: "24/7 Help Desk Support", description: "Our friendly, expert help desk team is always available to provide rapid support to your employees.", icon: Headset },
  { title: "Network Management", description: "We ensure your network is fast, reliable, and secure, managing everything from firewalls to Wi-Fi.", icon: Network },
  { title: "Backup & Disaster Recovery", description: "Protect your critical data with automated backups and a robust disaster recovery plan.", icon: DatabaseBackup },
];

const supportProcess = [
    { title: "Ticket Submission", description: "Easily submit support requests via email, phone, or our client portal.", icon: Ticket },
    { title: "Triage & Assignment", description: "Our system automatically prioritizes and assigns your ticket to the right expert.", icon: Users },
    { title: "Resolution & Follow-up", description: "We work diligently to resolve your issue and keep you informed every step of the way.", icon: CheckSquare },
    { title: "Reporting & Review", description: "Gain insights into your IT performance with regular reports and strategic reviews.", icon: BarChart },
];

const whyChooseUs = [
  { title: "Predictable IT Costs", description: "Our flat-fee model eliminates surprise bills and allows for better budget planning.", icon: BadgeDollarSign },
  { title: "Increased Uptime & Productivity", description: "Proactive maintenance minimizes downtime, keeping your team productive.", icon: TrendingUp },
  { title: "A Dedicated Partnership", description: "We act as a true extension of your team, deeply invested in your success.", icon: Handshake },
];


export default function ManagedServicesPage() {
  return (
    <>
      <PageHeader
        title="Managed IT Services"
        description="Proactive, comprehensive IT support and management to keep your business running smoothly and securely, 24/7."
      />

      {/* Hero Section */}
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
              <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><ShieldHalf className="w-8 h-8 mr-3 text-accent" /> Your Outsourced IT Department</h2>
              <p className="text-muted-foreground mb-6">
                Focus on your core business while we handle your IT infrastructure. Our Managed IT Services provide peace of mind with proactive monitoring, rapid support, and strategic guidance, ensuring optimal performance and security.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Maximize uptime and productivity.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Reduce operational costs.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Enhance your cybersecurity posture.</span></li>
              </ul>
            </div>
             <motion.div 
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="https://media.istockphoto.com/id/1179188076/photo/website-design-developing-programming-and-coding-technologies.webp?a=1&b=1&s=612x612&w=0&k=20&c=gKr0NvivGA4vVIkjYNAI2eCcOrAWx-yvTlsdPBU3dbM="
                alt="Website design and coding technologies"
                fill
                className="object-cover"
                data-ai-hint="coding technologies"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

       {/* Core Services Section */}
      <motion.section 
        className="py-16 md:py-24 bg-secondary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Managed Services Portfolio</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A complete suite of services to ensure your technology works for you, not against you.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreServices.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                className="h-full"
              >
                <Card className="text-center p-6 bg-card h-full shadow-lg hover:shadow-primary/20">
                  <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl text-primary mb-2">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Support Process Section */}
      <motion.section 
        className="py-16 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Streamlined Support Process</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A clear and efficient process to ensure your IT issues are resolved quickly and effectively.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {supportProcess.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                className="h-full"
              >
                <Card className="bg-card h-full p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-accent/20 text-accent">
                            <step.icon className="w-8 h-8"/>
                        </div>
                        <CardTitle className="text-xl text-primary">{step.title}</CardTitle>
                    </div>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section 
        className="py-16 md:py-24 bg-secondary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
           <motion.div 
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team shaking hands"
                fill
                className="object-cover"
                data-ai-hint="team handshake"
              />
            </motion.div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">The InfiniTech Managed Services Advantage</h2>
            <div className="space-y-6">
              {whyChooseUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={cardVariants}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary mt-1">
                      <item.icon className="w-6 h-6"/>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        className="py-16 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount:0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Client Success Story</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <blockquote className="text-xl text-center text-muted-foreground italic border-l-4 border-accent pl-6">
                "Since partnering with InfiniTech for managed services, our IT headaches have disappeared. Their proactive approach and responsive support have been a game-changer for our business. We've had virtually zero downtime."
              </blockquote>
              <p className="text-right mt-6 font-semibold text-primary">— Director of Operations, Manufacturing Firm</p>
            </Card>
          </div>
        </div>
      </motion.section>
      
      {/* Lets Talk Section */}
      <motion.section 
        className="py-16 md:py-24 bg-primary text-primary-foreground"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center"><Handshake className="w-8 h-8 mr-3" /> Ready for Worry-Free IT?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let us take the burden of IT management off your shoulders. Contact us for a free assessment of your IT needs.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/contact">Get a Free IT Assessment</Link>
          </Button>
        </div>
      </motion.section>

      <ContactForm />
    </>
  );
}

    