"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';
import {
  TrendingUp,
  CheckCircle,
  Target,
  MousePointerClick,
  Share2,
  FileText,
  Mail,
  AreaChart,
  Lightbulb,
  PencilRuler,
  Rocket,
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
  { title: "SEO (Search Engine Optimization)", description: "Increase your organic visibility on search engines and attract high-quality traffic.", icon: Target },
  { title: "PPC (Pay-Per-Click) Advertising", description: "Run targeted ad campaigns on Google, Bing, and social media to drive immediate results.", icon: MousePointerClick },
  { title: "Social Media Marketing", description: "Build and engage your community on platforms like LinkedIn, Facebook, Instagram, and more.", icon: Share2 },
  { title: "Content Marketing", description: "Create valuable content that attracts, educates, and converts your target audience.", icon: FileText },
  { title: "Email Marketing", description: "Nurture leads and retain customers with personalized email campaigns and automation.", icon: Mail },
  { title: "Analytics & Reporting", description: "Track your performance, measure ROI, and make data-driven decisions for continuous growth.", icon: AreaChart },
];

const marketingProcess = [
    { title: "Strategy & Planning", description: "We analyze your brand, audience, and goals to build a custom marketing roadmap.", icon: Lightbulb },
    { title: "Campaign Creation & Execution", description: "Our team creates compelling content and launches targeted campaigns across channels.", icon: PencilRuler },
    { title: "Optimization & Management", description: "We continuously monitor and optimize campaigns to maximize performance and ROI.", icon: Rocket },
    { title: "Reporting & Insights", description: "Receive transparent reports with actionable insights to track your success.", icon: ClipboardCheck },
];

const whyChooseUs = [
  { title: "Data-Driven Decisions", description: "Every strategy is backed by data to ensure maximum impact and efficiency.", icon: AreaChart },
  { title: "Transparent Reporting", description: "You'll always know how your campaigns are performing with our clear, detailed reports.", icon: ClipboardCheck },
  { title: "Holistic Approach", description: "We combine various channels to create a unified marketing strategy that delivers results.", icon: TrendingUp },
];


export default function DigitalMarketingPage() {
  return (
    <>
      <PageHeader
        title="Digital Marketing Services"
        description="Drive growth with our data-driven marketing strategies. We create tailored campaigns that boost your brand visibility, attract qualified leads, and maximize your return on investment."
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
              <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><TrendingUp className="w-8 h-8 mr-3 text-accent" /> Amplify Your Brand's Reach</h2>
              <p className="text-muted-foreground mb-6">
                In the digital age, a strong online presence is non-negotiable. Our digital marketing services are designed to connect your brand with the right audience at the right time. We blend creativity with analytics to launch campaigns that not only engage but also convert.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Increase website traffic and generate qualified leads.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Boost brand awareness and build a loyal community.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Achieve measurable results and a clear ROI.</span></li>
              </ul>
            </div>
             <motion.div 
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="https://media.istockphoto.com/id/853188888/photo/the-text-build-your-brand-appearing-behind-torn-brown-paper.jpg?s=2048x2048&w=is&k=20&c=XmMypE5F7SV-SQSCDYUDFOATTUZCwqFDaLdYjaXXzPI="
                alt="Digital marketing strategy session"
                fill
                className="object-cover"
                data-ai-hint="brand building"
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
            <h2 className="text-3xl font-bold text-primary mb-4">Our Digital Marketing Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A full suite of services to build a powerful and cohesive online marketing presence.</p>
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
            <h2 className="text-3xl font-bold text-primary mb-4">Our Marketing Approach</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A proven, four-step process for delivering marketing campaigns that drive real results.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {marketingProcess.map((step, i) => (
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
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team working on a marketing plan"
                fill
                className="object-cover"
                data-ai-hint="marketing plan"
              />
            </motion.div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">The InfiniTech Marketing Advantage</h2>
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
                "InfiniTech's SEO and content strategy skyrocketed our organic traffic by 200% in six months. They are masters of digital marketing and have become an indispensable part of our growth."
              </blockquote>
              <p className="text-right mt-6 font-semibold text-primary">— Marketing Director, SaaS Company</p>
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
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center"><Handshake className="w-8 h-8 mr-3" /> Ready to Dominate the Digital Space?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's create a winning marketing strategy for your business. Contact us today for a free consultation and let's start growing together.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/contact">Get a Free Marketing Consultation</Link>
          </Button>
        </div>
      </motion.section>

      <ContactForm />
    </>
  );
}
