"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';
import { 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Cog, 
  Laptop, 
  Users, 
  BrainCircuit, 
  Globe, 
  TrendingUp,
  Folder,
  Handshake,
  Clock,
  FastForward
} from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/src/components/sections/ContactForm';
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


const workflowSteps = [
  { title: "Discovery & Planning", description: "Deep dive into your business goals" },
  { title: "Design & Prototyping", description: "Crafting intuitive UI/UX mockups" },
  { title: "Agile Development", description: "Frontend & backend sprints with client feedback" },
  { title: "Testing & QA", description: "Thorough testing across devices and browsers" },
  { title: "Launch & Optimization", description: "Deploy, monitor, and fine-tune" },
  { title: "Ongoing Support", description: "Updates, maintenance, and growth" }
];

const techStack = [
    { category: "Frontend", techs: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", techs: ["Node.js", "Express", "Python", "Java (Spring Boot)"] },
    { category: "Databases", techs: ["MongoDB", "PostgreSQL", "MySQL"] },
    { category: "DevOps & Hosting", techs: ["Vercel", "AWS", "Netlify", "Docker"] },
    { category: "CMS/Headless", techs: ["Strapi", "Sanity", "Contentful"] },
]

const whyChooseUs = [
  { title: "5+ years of experience", icon: Sparkles },
  { title: "Fast & transparent process", icon: FastForward },
  { title: "40+ successful projects", icon: CheckCircle },
  { title: "AI-integrated solutions", icon: BrainCircuit },
  { title: "24/7 support & quick turnaround", icon: Clock },
];

const aiFeatures = [
    { title: "Chatbots & Support Agents", description: "Automated, intelligent customer support." },
    { title: "AI Content Generation", description: "Create engaging content effortlessly." },
    { title: "Personalized Recommendations", description: "Tailor user experiences on the fly." },
    { title: "Intelligent Dashboards", description: "Get actionable insights from your data." }
]

const subServices = [
  { title: 'Frontend Development', description: 'Interactive UIs with Next.js, Tailwind, and animation libraries' },
  { title: 'Backend Development', description: 'RESTful APIs and microservices with Node.js, Python, Java' },
  { title: 'CMS Development', description: 'Flexible content management with Strapi, Sanity, WordPress' },
  { title: 'Hosting & DevOps', description: 'Scalable deployments on AWS, Vercel, Docker' },
];

const caseStudies = [
  { id: '1', title: 'E-commerce Platform', description: 'Fully integrated online store with payment gateway & admin dashboard', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'ecommerce dashboard' },
  { id: '5', title: 'Restaurant Booking System', description: 'Responsive web app for real-time table reservations', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'restaurant app' },
];

export default function WebDevelopmentPage() {
  return (
    <>
      <PageHeader
        title="Web Design & Development"
        description="We build modern, responsive, and secure web applications that drive user engagement and deliver exceptional business value. From sleek marketing sites to complex enterprise platforms, we bring your vision to life."
      />

      {/* Custom Solutions Section */}
      <motion.section 
        className="py-16 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="https://media.istockphoto.com/id/2212360504/photo/holographic-ui-ux-display-icons-of-ux-ui-designer-creative-planning-data-visualization-web.jpg?s=612x612&w=0&k=20&c=djva2dSeRul05un08MwAq6mtJWziQ98K8eEa9y8YBh4="
                alt="Web development process"
                fill
                className="object-cover"
                data-ai-hint="holographic ui"
              />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Sparkles className="w-8 h-8 mr-3 text-accent" /> Custom Solutions for the Modern Web</h2>
              <p className="text-muted-foreground mb-6">
                Our approach to web development is centered around your unique needs. We don't just build websites; we craft digital experiences. With a blend of design finesse and technical expertise, we ensure your web presence stands out in a crowded digital world.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Performance-optimized and SEO-friendly.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Mobile-first and fully responsive.</span></li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-accent" /><span>Secure, scalable, and built to last.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Development Workflow */}
      <motion.section 
        className="py-16 md:py-24 bg-secondary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 flex items-center justify-center"><Cog className="w-8 h-8 mr-3" /> Our Development Workflow</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                className="h-full"
              >
                <Card className="bg-card h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center"><span className="text-3xl font-bold text-accent mr-3">{i+1}</span> {step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Tech Stack */}
      <motion.section 
        className="py-16 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 flex items-center justify-center"><Laptop className="w-8 h-8 mr-3" /> Our Tech Stack</h2>
          </div>
          <Card className="max-w-4xl mx-auto p-6 md:p-8 shadow-lg">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techStack.map(stack => (
                <div key={stack.category}>
                  <h3 className="text-lg font-semibold text-primary mb-3">{stack.category}</h3>
                  <ul className="space-y-2">
                    {stack.techs.map(tech => <li key={tech} className="text-muted-foreground">{tech}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </motion.section>
      
      {/* Why Choose Us */}
      <motion.section 
        className="py-16 md:py-24 bg-secondary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 flex items-center justify-center"><Users className="w-8 h-8 mr-3" /> Why Choose Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
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
                  <p className="font-semibold text-primary">{item.title}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* AI-Enhanced Web Features */}
      <motion.section 
        className="py-16 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 flex items-center justify-center"><BrainCircuit className="w-8 h-8 mr-3" /> AI-Enhanced Web Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Boost your digital experience with smart features.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                className="h-full"
              >
                <Card className="text-center p-6 bg-card h-full shadow-lg">
                  <CardTitle className="text-xl text-primary mb-2">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services */}
      <motion.section 
        className="py-16 md:py-24 bg-secondary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 flex items-center justify-center"><Globe className="w-8 h-8 mr-3"/> Our Web Development Services</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subServices.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                className="h-full"
              >
                <Card className="text-center bg-card h-full">
                  <CardHeader><CardTitle className="text-xl text-primary">{service.title}</CardTitle></CardHeader>
                  <CardContent><p className="text-muted-foreground">{service.description}</p></CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Real Results */}
      <motion.section
        className="py-16 md:py-24 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 flex items-center justify-center"><TrendingUp className="w-8 h-8 mr-3" /> Real Results, Real Impact</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <blockquote className="text-lg text-muted-foreground italic border-l-4 border-accent pl-4">
                "Our online bookings increased 3x after partnering with this team. Truly seamless execution."
              </blockquote>
              <p className="text-right mt-4 font-semibold text-primary">— Priya Singh, Restaurant Owner</p>
            </Card>
            <Card className="p-6">
              <blockquote className="text-lg text-muted-foreground italic border-l-4 border-accent pl-4">
                "The e-commerce platform they built helped us scale globally. Highly recommended!"
              </blockquote>
              <p className="text-right mt-4 font-semibold text-primary">— Aman Jain, Fashion Brand CEO</p>
            </Card>
          </div>
        </div>
      </motion.section>
      
      {/* Case Studies */}
      <motion.section 
        className="py-16 md:py-24 bg-secondary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 flex items-center justify-center"><Folder className="w-8 h-8 mr-3" /> Case Studies in Action</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {caseStudies.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="h-full"
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="relative w-full h-60">
                     <Image 
                      src={project.imageUrl} 
                      alt={project.title} 
                      fill
                      className="object-cover"
                      data-ai-hint={project.dataAiHint}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
           <div className="text-center mt-12">
              <Button asChild>
                <Link href="/portfolio">
                  View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
        </div>
      </motion.section>
      
      {/* Lets build together */}
      <motion.section 
        className="py-16 md:py-24 bg-primary text-primary-foreground"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center"><Handshake className="w-8 h-8 mr-3" /> Let's Build Something Great Together</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            From startups to enterprises, we empower businesses to scale with smart, scalable, and stunning web solutions. Ready to get started?
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="outline" asChild className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
             <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/portfolio">View Full Portfolio</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <ContactForm />
    </>
  );
}
