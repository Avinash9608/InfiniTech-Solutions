
"use client";
import Link from 'next/link';
import { Linkedin, Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { IFooterContent } from '@/models/FooterContent';

const socialIcons: { [key: string]: React.ElementType } = {
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
};

const defaultFooterContent: IFooterContent = {
  companyName: 'InfiniTech Solutions',
  companyDescription: 'Delivering innovative IT solutions to power your business growth. We specialize in web development, digital marketing, software, and mobile app creation.',
  quickLinks: [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ],
  contactInfo: {
    email: 'info@infinitech.com',
    phone: '+1 (234) 567-890',
    address: '123 Tech Avenue, Silicon Valley, CA 94000',
  },
  socialLinks: [
    { href: 'https://linkedin.com', label: 'LinkedIn' },
    { href: 'https://facebook.com', label: 'Facebook' },
    { href: 'https://instagram.com', label: 'Instagram' },
    { href: 'https://twitter.com', label: 'Twitter' },
  ]
} as IFooterContent;

export default function Footer() {
  const [content, setContent] = useState<IFooterContent>(defaultFooterContent);
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchFooterContent() {
      try {
        const res = await fetch('/api/admin/footer');
        if(res.ok) {
          const data = await res.json();
          setContent(data);
        }
      } catch (error) {
        console.error("Failed to fetch footer content", error);
      }
    }
    fetchFooterContent();
  }, []);

  useEffect(() => {
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
            <h3 className="text-xl font-bold text-primary mb-4">{content.companyName}</h3>
            <p className="text-sm text-muted-foreground">
              {content.companyDescription}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {content.quickLinks.map(item => (
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
                <a href={`mailto:${content.contactInfo.email}`} className="hover:text-primary">{content.contactInfo.email}</a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                <a href={`tel:${content.contactInfo.phone}`} className="hover:text-primary">{content.contactInfo.phone}</a>
              </li>
              <li className="flex items-start text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span>{content.contactInfo.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {content.socialLinks.map(social => {
                const Icon = socialIcons[social.label] || Link;
                return (
                  <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                    className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-accent/20">
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {content.companyName}. All rights reserved.
          </p>
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
