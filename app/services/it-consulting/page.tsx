
"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';
import { 
  BriefcaseBusiness,
  CheckCircle,
  Lightbulb,
  GanttChartSquare,
  Wrench,
  TrendingUp,
  ShieldCheck,
  Users,
  Scale,
  Handshake,
  ArrowRight,
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
  { title: "Digital Transformation", description: "Guiding your business through technology-driven change to enhance value and efficiency.", icon: TrendingUp },
  { title: "IT Strategy & Roadmap", description: "Developing a clear technology roadmap that aligns with your long-term business objectives.", icon: GanttChartSquare },
  { title: "Cybersecurity Consulting", description: "Assessing risks and architecting robust security frameworks to protect your assets.", icon: ShieldCheck },
  { title: "Cloud Strategy", description: "Helping you choose and implement the right cloud solutions to drive agility and growth.", icon: BriefcaseBusiness },
];

const consultingProcess = [
    { title: "Discovery & Assessment", description: "We start by understanding your business, goals, and current IT landscape.", icon: Lightbulb },
    { title: "Strategic Planning", description: "We craft a detailed, actionable strategy and technology roadmap.", icon: GanttChartSquare },
    { title: "Implementation Guidance", description: "We oversee the execution of the plan, ensuring a smooth and successful rollout.", icon: Wrench },
    { title: "Performance Optimization", description: "We monitor results and provide ongoing advice to ensure continuous improvement.", icon: TrendingUp },
];

const whyChooseUs = [
  { title: "Strategic Partnership", description: "We act as an extension of your team, dedicated to your long-term success.", icon: Handshake },
  { title: "Industry Expertise", description: "Our consultants have deep experience across a wide range of industries.", icon: Users },
  { title: "Vendor-Agnostic Advice", description: "We provide unbiased recommendations focused solely on what's best for your business.", icon: Scale },
];


export default function ItConsultingPage() {
  return (
    <>
      <PageHeader
        title="IT Consulting Services"
        description="Leverage our expertise to create a technology strategy that drives innovation, optimizes performance, and fuels sustainable growth. We are your trusted advisors in the digital age."
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
              <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><BriefcaseBusiness className="w-8 h-8 mr-3 text-accent" /> Strategic Guidance for a Digital World</h2>
              <p className="text-muted-foreground mb-6">
                Navigating the complexities of the modern technology landscape is a challenge. InfiniTech Solutions provides the expert, forward-thinking IT consulting you need to make informed decisions, mitigate risks, and seize new opportunities. We bridge the gap between your business goals and your technology capabilities.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Align your IT infrastructure with your business goals.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Maximize the ROI of your technology investments.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Stay ahead of the curve with emerging technologies.</span></li>
              </ul>
            </div>
             <motion.div 
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Business strategy meeting"
                fill
                className="object-cover"
                data-ai-hint="strategy meeting"
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
            <h2 className="text-3xl font-bold text-primary mb-4">Our Consulting Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We provide strategic advice across key areas to ensure your technology serves your business effectively.</p>
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
            <h2 className="text-3xl font-bold text-primary mb-4">Our Consulting Approach</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A collaborative, four-step process designed to deliver clear, actionable, and impactful advice.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {consultingProcess.map((step, i) => (
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
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team of professionals collaborating"
                fill
                className="object-cover"
                data-ai-hint="team collaboration"
              />
            </motion.div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">The InfiniTech Consulting Advantage</h2>
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
                "InfiniTech's IT consulting team provided us with a roadmap that has been instrumental in our digital transformation. Their insights were invaluable, and their guidance has saved us significant time and money."
              </blockquote>
              <p className="text-right mt-6 font-semibold text-primary">— CEO, Logistics & Supply Chain Co.</p>
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
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center"><Handshake className="w-8 h-8 mr-3" /> Ready to Build Your Technology Roadmap?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how our strategic IT consulting can help you achieve your business objectives. Schedule a consultation with our experts today.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/contact">Book Your Free Consultation</Link>
          </Button>
        </div>
      </motion.section>

      <ContactForm />
    </>
  );
}

    