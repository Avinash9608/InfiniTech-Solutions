import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaBanner from '@/components/sections/CtaBanner';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import PortfolioSection from '@/components/sections/PortfolioSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection showTitle={true} />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <PortfolioSection summary={true} />
      <CtaBanner />
    </>
  );
}
