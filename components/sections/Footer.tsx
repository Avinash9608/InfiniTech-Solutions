
"use client";
import Link from 'next/link';
import { Linkedin, Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import type { IFooterContent, IQuickLink, ISocialLink } from '@/lib/types';
import React from 'react';

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
    email: 'm3361555@gmail.com',
    phone: '+919608989499',
    address: '123 Tech Avenue, patna, Bihar 804453',
  },
  socialLinks: [
    { href: 'https://www.linkedin.com/in/avinash-kumar-653001213/', label: 'LinkedIn' },
    { href: 'https://www.facebook.com/profile.php?id=61560575177253', label: 'Facebook' },
    { href: 'https://www.instagram.com/tns_server_protocal_error/', label: 'Instagram' },
    { href: 'https://x.com/Avinashmadhuka', label: 'Twitter' },
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
              {content.quickLinks
                .filter((item: IQuickLink) => typeof item.href === 'string' && item.href.length > 0 && typeof item.label === 'string')
                .map((item: IQuickLink) => (
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
                <a href={`mailto:${content.contactInfo.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {content.contactInfo.email}
                </a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                <a href={`tel:${content.contactInfo.phone.replace(/\s/g, '')}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {content.contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {content.contactInfo.address}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {content.socialLinks
                .filter((social: ISocialLink) => typeof social.href === 'string' && social.href.length > 0 && typeof social.label === 'string')
                .map((social: ISocialLink) => (
                  <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                    className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-accent/20">
                    {socialIcons[social.label] ? (
                      React.createElement(socialIcons[social.label], { className: "w-5 h-5" })
                    ) : null}
                  </Link>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-2">
          {[{ href: '/privacy-policy', label: 'Privacy Policy' }, { href: '/terms-of-service', label: 'Terms of Service' }]
            .filter((item: { href: string; label: string }) => typeof item.href === 'string' && item.href.length > 0 && typeof item.label === 'string')
            .map((item: { href: string; label: string }) => (
              <Link key={item.label} href={item.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {item.label}
              </Link>
            ))}
          <span className="mx-2 text-xs text-muted-foreground">|</span>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          &copy; {currentYear} {content.companyName}. All rights reserved.
        </div>
      </div>

      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </Button>
      )}
    </footer>
  );
}