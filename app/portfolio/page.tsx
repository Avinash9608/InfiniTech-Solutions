import PortfolioSection from "@/components/sections/PortfolioSection";
import PageHeader from "@/components/shared/PageHeader";

export default function PortfolioPage() {
  return (
    <>
      <PageHeader 
        title="Our Work"
        description="We take pride in the solutions we've delivered. Explore a selection of our finest projects, showcasing our expertise across various industries and technologies."
      />
      <PortfolioSection />
    </>
  );
}
