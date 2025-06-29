"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';
import { 
  CloudCog,
  Server,
  Scaling,
  ShieldCheck,
  RefreshCw,
  Rocket,
  Wrench,
  Layers3,
  CheckCircle,
  Handshake,
  TrendingUp,
  CloudLightning
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
  { title: "Cloud Migration", description: "Seamlessly migrate your applications and data to the cloud with minimal downtime.", icon: CloudCog },
  { title: "Infrastructure as a Service (IaaS)", description: "We design, build, and manage scalable and secure cloud infrastructure.", icon: Server },
  { title: "DevOps & Automation", description: "Accelerate your development lifecycle with CI/CD pipelines and automation.", icon: Wrench },
  { title: "Cloud-Native Development", description: "Build modern, resilient, and scalable applications designed for the cloud.", icon: Rocket },
];

const cloudProcess = [
    { title: "Assessment & Strategy", description: "Analyzing your current infrastructure and creating a tailored cloud roadmap.", icon: Layers3 },
    { title: "Planning & Design", description: "Architecting a secure, scalable, and cost-effective cloud environment.", icon: Scaling },
    { title: "Migration & Implementation", description: "Executing the migration plan and deploying your workloads to the cloud.", icon: CloudLightning },
    { title: "Optimization & Management", description: "Continuously monitoring, managing, and optimizing your cloud resources.", icon: RefreshCw },
];

const whyChooseUs = [
  { title: "Cost Efficiency", description: "Optimize your spending with our cost-management strategies and pay-as-you-go models.", icon: TrendingUp },
  { title: "Enhanced Security", description: "Protect your cloud environment with best-in-class security practices and compliance.", icon: ShieldCheck },
  { title: "Scalability & Flexibility", description: "Scale your resources up or down on demand to meet your business needs.", icon: Scaling },
];


export default function CloudServicesPage() {
  return (
    <>
      <PageHeader
        title="Cloud Services"
        description="Harness the power of the cloud. We provide scalable, secure, and efficient cloud solutions to drive innovation and business agility."
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
              <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><CloudLightning className="w-8 h-8 mr-3 text-accent" /> Elevate Your Business to the Cloud</h2>
              <p className="text-muted-foreground mb-6">
                Unlock unparalleled flexibility, scalability, and performance with our end-to-end cloud services. Whether you're just starting your cloud journey or looking to optimize your existing setup, our certified experts are here to guide you every step of the way.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Reduce IT costs and improve efficiency.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Enhance security and data protection.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Accelerate innovation with on-demand resources.</span></li>
              </ul>
            </div>
             <motion.div 
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Abstract cloud computing concept"
                fill
                className="object-cover"
                data-ai-hint="cloud computing"
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
            <h2 className="text-3xl font-bold text-primary mb-4">Our Comprehensive Cloud Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">From strategy to execution, we offer a complete range of services to support your cloud adoption.</p>
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

      {/* Our Process Section */}
      <motion.section 
        className="py-16 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Cloud Adoption Journey</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A structured, four-step process to ensure a successful and smooth transition to the cloud.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {cloudProcess.map((step, i) => (
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
                src="https://images.unsplash.com/photo-1607798734342-3e2b6408c8e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Cloud infrastructure"
                fill
                className="object-cover"
                data-ai-hint="cloud infrastructure"
              />
            </motion.div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">The InfiniTech Cloud Advantage</h2>
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
                "Migrating to the cloud with InfiniTech was a seamless experience. Our infrastructure is now more reliable and scalable than ever, and we've seen a 30% reduction in our IT operational costs. Their team is knowledgeable and incredibly supportive."
              </blockquote>
              <p className="text-right mt-6 font-semibold text-primary">— CTO, Fast-Growing E-commerce Startup</p>
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
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center"><Handshake className="w-8 h-8 mr-3" /> Ready for Your Cloud Transformation?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let our cloud experts help you design and implement a strategy that aligns with your business objectives.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/contact">Schedule a Cloud Consultation</Link>
          </Button>
        </div>
      </motion.section>

      <ContactForm />
    </>
  );
}
