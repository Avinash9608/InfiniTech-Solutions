"use client";
import { Button } from '@/components/ui/button';

export default function CtaBanner() {
  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
          Let’s discuss your project today! Our experts are ready to help you achieve your goals.
        </p>
        <Button size="lg" onClick={scrollToContact} className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
          Get a Free Quote
        </Button>
      </div>
    </section>
  );
}
