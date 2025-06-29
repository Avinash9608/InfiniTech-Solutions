import ServicesSection from "@/components/sections/ServicesSection";
import PageHeader from "@/components/shared/PageHeader";

export default function ServicesPage() {
  return (
    <>
      <PageHeader 
        title="Our Services"
        description="We offer a comprehensive suite of IT services designed to empower your business and drive success in the digital landscape. Explore our offerings to find the perfect solution for your needs."
      />
      <ServicesSection />
    </>
  );
}
