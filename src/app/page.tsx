import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaBanner from '@/components/sections/CtaBanner';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <PortfolioSection />
        <TestimonialsSection />
        <CtaBanner />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
