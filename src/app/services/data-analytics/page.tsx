
"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';
import { 
  BarChartBig,
  CheckCircle,
  DatabaseZap,
  BrainCircuit,
  Lightbulb,
  PieChart,
  Layers,
  GanttChartSquare,
  Filter,
  Presentation,
  TrendingUp,
  Target,
  DollarSign,
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
  { title: "Business Intelligence", description: "Transform raw data into beautiful, interactive dashboards that tell a story.", icon: PieChart },
  { title: "Predictive Analytics", description: "Leverage machine learning to forecast trends and predict future outcomes.", icon: BrainCircuit },
  { title: "Data Warehousing", description: "Build a robust, scalable single source of truth for all your business data.", icon: DatabaseZap },
  { title: "Actionable Insights", description: "We don't just give you data; we provide clear, actionable recommendations.", icon: Lightbulb },
];

const analyticsProcess = [
    { title: "Data Collection & Integration", description: "Gathering data from various sources into a unified system.", icon: Layers },
    { title: "Data Processing & Cleaning", description: "Ensuring data quality and consistency for accurate analysis.", icon: GanttChartSquare },
    { title: "Exploratory Analysis", description: "Identifying patterns, anomalies, and key characteristics in your data.", icon: Filter },
    { title: "Modeling & Reporting", description: "Building models and creating reports to visualize findings and insights.", icon: Presentation },
];

const whyChooseUs = [
  { title: "Drive Business Growth", description: "Make informed decisions that lead to measurable growth and increased revenue.", icon: TrendingUp },
  { title: "Gain a Competitive Edge", description: "Understand market dynamics and customer behavior better than your competitors.", icon: Target },
  { title: "Optimize ROI", description: "Identify inefficiencies and opportunities to maximize your return on investment.", icon: DollarSign },
];


export default function DataAnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Data Analytics Services"
        description="Unlock the hidden potential within your data. We transform complex datasets into clear, actionable insights that drive strategic decision-making and fuel business growth."
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
              <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><BarChartBig className="w-8 h-8 mr-3 text-accent" /> Turn Data into Your Greatest Asset</h2>
              <p className="text-muted-foreground mb-6">
                In today's digital economy, data is more than just numbers; it's the bedrock of strategy, innovation, and competitive advantage. Our data analytics services help you navigate the complexities of your data, uncovering insights that empower you to make smarter, faster, and more profitable decisions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Unlock actionable insights from your data.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Optimize operations and improve efficiency.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Create personalized customer experiences.</span></li>
              </ul>
            </div>
             <motion.div 
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Data analytics dashboard concept"
                fill
                className="object-cover"
                data-ai-hint="data analytics dashboard"
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
            <h2 className="text-3xl font-bold text-primary mb-4">Our Core Analytics Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A full spectrum of services to meet your data needs, from foundational to advanced.</p>
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
            <h2 className="text-3xl font-bold text-primary mb-4">Our Analytics Process</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">A structured approach to ensure we deliver meaningful and reliable insights, every time.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {analyticsProcess.map((step, i) => (
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
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Business charts and graphs"
                fill
                className="object-cover"
                data-ai-hint="business charts"
              />
            </motion.div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">The InfiniTech Advantage</h2>
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
                "The insights we gained from InfiniTech's analytics team were eye-opening. We were able to optimize our marketing spend and increase conversion rates by 25% in just one quarter. They are true partners in our growth."
              </blockquote>
              <p className="text-right mt-6 font-semibold text-primary">— CEO, Global E-commerce Brand</p>
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
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center"><Handshake className="w-8 h-8 mr-3" /> Ready to Unlock Your Data's Power?</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how data analytics can revolutionize your business. Schedule a free consultation with our experts today.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/contact">Get Your Free Data Consultation</Link>
          </Button>
        </div>
      </motion.section>

      <ContactForm />
    </>
  );
}

    