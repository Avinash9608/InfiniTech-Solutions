
"use client";
import Link from 'next/link';
import { Linkedin, Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const footerNavItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-card border-t border-border py-12 text-card-foreground relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">InfiniTech Solutions</h3>
            <p className="text-sm text-muted-foreground">
              Delivering innovative IT solutions to power your business growth. We specialize in web development, digital marketing, software, and mobile app creation.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerNavItems.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-muted-foreground">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                <a href="mailto:info@infinitech.com" className="hover:text-primary">info@infinitech.com</a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                <a href="tel:+1234567890" className="hover:text-primary">+1 (234) 567-890</a>
              </li>
              <li className="flex items-start text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span>123 Tech Avenue, Silicon Valley, CA 94000</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-accent/20">
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          {currentYear && (
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} InfiniTech Solutions. All rights reserved.
            </p>
          )}
          <div className="mt-2">
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span className="mx-2 text-xs text-muted-foreground">|</span>
            <Link href="/terms-of-service" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              onClick={scrollToTop}
              className="h-12 w-12 rounded-full shadow-lg"
              size="icon"
            >
              <ArrowUp className="h-6 w-6" />
              <span className="sr-only">Go to top</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
