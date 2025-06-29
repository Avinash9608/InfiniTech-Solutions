"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CtaBanner() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
          Let’s discuss your project today! Our experts are ready to help you achieve your goals.
        </p>
        <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300">
          <Link href="/contact">Get a Free Quote</Link>
        </Button>
      </div>
    </section>
  );
}
