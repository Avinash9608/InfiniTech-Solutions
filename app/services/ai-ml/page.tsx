"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';
import {
  BrainCircuit,
  Bot,
  ScanText,
  Eye,
  BarChart,
  Layers3,
  FlaskConical,
  Rocket,
  Shield,
  Scale,
  Handshake,
  CheckCircle,
  TrendingUp,
  Lightbulb,
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
  { title: "Custom AI Model Development", description: "Tailor-made AI models designed to solve your specific business challenges and integrate seamlessly.", icon: BrainCircuit },
  { title: "Natural Language Processing (NLP)", description: "Enable machines to understand, interpret, and respond to human language for chatbots, sentiment analysis, and more.", icon: ScanText },
  { title: "Computer Vision", description: "Implement AI that can 'see' and interpret visual information from images and videos for automation and analysis.", icon: Eye },
  { title: "Predictive Analytics", description: "Use machine learning to forecast future trends, behaviors, and outcomes based on your historical data.", icon: TrendingUp },
];

const aiProcess = [
    { title: "Discovery & Strategy", description: "Understanding your goals and identifying the best AI opportunities for your business.", icon: Lightbulb },
    { title: "Data Preparation", description: "Collecting, cleaning, and preparing your data to ensure the highest quality inputs for AI models.", icon: Layers3 },
    { title: "Model Development", description: "Building, training, and validating custom machine learning models on your prepared data.", icon: FlaskConical },
    { title: "Deployment & Integration", description: "Integrating the trained model into your existing systems and workflows for real-world impact.", icon: Rocket },
];

const whyChooseUs = [
  { title: "Ethical & Responsible AI", description: "We build fair, transparent, and accountable AI systems you can trust.", icon: Shield },
  { title: "Scalable Solutions", description: "Our AI models are designed to grow with your business, from pilot to production.", icon: Scale },
  { title: "Industry-Specific Expertise", description: "We have experience applying AI to solve unique challenges across various sectors.", icon: Handshake },
];


export default function AiMlPage() {
  return (
    <>
      <PageHeader
        title="AI & Machine Learning Services"
        description="Unlock the power of intelligent automation and data-driven insights. We build bespoke AI and ML solutions that drive innovation, efficiency, and growth for your business."
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
              <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><BrainCircuit className="w-8 h-8 mr-3 text-accent" /> Harness the Power of Intelligent Technology</h2>
              <p className="text-muted-foreground mb-6">
                InfiniTech Solutions is at the forefront of the AI revolution. We help businesses like yours leverage Artificial Intelligence and Machine Learning to not just solve complex problems, but to redefine what's possible. From automating mundane tasks to uncovering predictive insights, our AI solutions are your key to a smarter future.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Automate and optimize business processes.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Gain deep, predictive insights from your data.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Create personalized and intelligent user experiences.</span></li>
              </ul>
            </div>
             <motion.div 
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="AI and robotics concept"
                fill
                className="object-cover"
                data-ai-hint="ai robotics"
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
            <h2 className="text-3xl font-bold text-primary mb-4">Our AI & ML Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We offer end-to-end services to bring your AI vision to life, from strategy to deployment.</p>
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
            <h2 className="text-3xl font-bold text-primary mb-4">Our AI Implementation Journey</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A structured, collaborative process to ensure your AI project delivers tangible business value.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {aiProcess.map((step, i) => (
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
                src="https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Abstract AI network"
                fill
                className="object-cover"
                data-ai-hint="ai network"
              />
            </motion.div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">The InfiniTech AI Advantage</h2>
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
                "InfiniTech's AI-powered forecasting model has revolutionized our inventory management, reducing waste by 40% and improving our bottom line. They are true innovators and essential partners."
              </blockquote>
              <p className="text-right mt-6 font-semibold text-primary">— COO, National Retail Chain</p>
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
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center"><Handshake className="w-8 h-8 mr-3" /> Ready to Build Your Intelligent Future?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's explore how AI can unlock new opportunities for your business. Schedule a consultation with our AI specialists today.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/contact">Discuss Your AI Project</Link>
          </Button>
        </div>
      </motion.section>

      <ContactForm />
    </>
  );
}
