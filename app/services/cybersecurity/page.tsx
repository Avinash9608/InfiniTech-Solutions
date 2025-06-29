"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';
import { 
  ShieldCheck,
  ArrowRight,
  ScanSearch,
  Network,
  FileLock,
  Siren,
  GanttChartSquare,
  Target,
  ShieldAlert,
  Rocket,
  RefreshCw,
  Users,
  Clock,
  BrainCircuit,
  ClipboardCheck,
  Handshake,
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
  { title: "Threat Intelligence", description: "Proactively identify and analyze potential threats before they impact your business.", icon: Target },
  { title: "Vulnerability Assessment", description: "We conduct in-depth scans to find and fix security weaknesses in your systems.", icon: ScanSearch },
  { title: "Network Security", description: "Implementing firewalls, IDS/IPS, and secure configurations to protect your network.", icon: Network },
  { title: "Data Encryption & Protection", description: "Securing your sensitive data, both at rest and in transit, with robust encryption.", icon: FileLock },
  { title: "Incident Response", description: "A dedicated team ready to manage and mitigate security incidents 24/7.", icon: Siren },
  { title: "Compliance & Audits", description: "Ensuring your organization meets industry standards like GDPR, HIPAA, and ISO 27001.", icon: GanttChartSquare },
];

const securityApproach = [
    { title: "Proactive Monitoring", description: "Constant surveillance of your digital environment to detect anomalies.", icon: ShieldAlert },
    { title: "Rapid Detection", description: "Utilizing advanced AI tools to identify threats in real-time.", icon: BrainCircuit },
    { title: "Swift Response", description: "Executing a pre-planned strategy to contain and neutralize threats instantly.", icon: Rocket },
    { title: "Continuous Improvement", description: "Learning from every event to strengthen your defenses over time.", icon: RefreshCw },
];

const whyChooseUs = [
  { title: "Certified Experts", description: "Our team holds top industry certifications (CISSP, CISM, CEH).", icon: Users },
  { title: "24/7 Security Operations", description: "A dedicated Security Operations Center (SOC) guards your assets around the clock.", icon: Clock },
  { title: "Cutting-Edge Technology", description: "We leverage AI and machine learning for superior threat detection.", icon: BrainCircuit },
  { title: "Compliance-Focused", description: "We help you navigate the complex landscape of security regulations.", icon: ClipboardCheck },
];


export default function CybersecurityPage() {
  return (
    <>
      <PageHeader
        title="Cybersecurity Services"
        description="In an era of evolving digital threats, we provide comprehensive, multi-layered security solutions to protect your most valuable assets, ensure business continuity, and build trust."
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
              <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><ShieldCheck className="w-8 h-8 mr-3 text-accent" /> Fortify Your Digital Fortress</h2>
              <p className="text-muted-foreground mb-6">
                Our cybersecurity services are designed to be a proactive shield for your organization. We move beyond basic protection, offering a dynamic and intelligent defense system that anticipates threats, protects against attacks, and ensures your operational resilience.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Reduce risk with proactive threat hunting.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Ensure compliance with industry regulations.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Gain peace of mind with 24/7 monitoring.</span></li>
              </ul>
            </div>
             <motion.div 
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="https://media.istockphoto.com/id/1445961658/photo/cybersecurity-and-data-protection-concept-fingerprint-and-biometric-authentication-to-access.jpg?s=2048x2048&w=is&k=20&c=6BwzIeX1uG5oHZqT9d821r0uLd0W2PauZg1_FqKx12M="
                alt="Cybersecurity concept with digital lock"
                fill
                className="object-cover"
                data-ai-hint="cybersecurity lock"
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
            <h2 className="text-3xl font-bold text-primary mb-4">Our Core Cybersecurity Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A complete suite of services to cover every aspect of your digital security.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Our Approach Section */}
      <motion.section 
        className="py-16 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Security Approach</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A systematic, four-pronged approach to ensure robust and resilient protection.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {securityApproach.map((step, i) => (
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
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Why Trust InfiniTech with Your Security?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                className="h-full"
              >
                <Card className="text-center p-6 bg-card h-full">
                  <item.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                   <CardTitle className="text-lg font-semibold text-primary mb-2">{item.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        className="py-16 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Client Success Story</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <blockquote className="text-xl text-center text-muted-foreground italic border-l-4 border-accent pl-6">
                "InfiniTech's cybersecurity team has been a game-changer for us. Their proactive approach prevented a major breach, saving us from potential financial and reputational disaster. We feel completely secure under their watch."
              </blockquote>
              <p className="text-right mt-6 font-semibold text-primary">— CFO, Major Financial Institution</p>
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
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center"><Handshake className="w-8 h-8 mr-3" /> Secure Your Business Today</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Don't wait for a security incident to happen. Let our experts assess your vulnerabilities and build a defense strategy tailored to your needs.
          </p>
          <Button size="lg" variant="outline" asChild className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/contact">Request a Free Security Consultation</Link>
          </Button>
        </div>
      </motion.section>

      <ContactForm />
    </>
  );
}
