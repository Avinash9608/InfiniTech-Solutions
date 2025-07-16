import type { LucideIcon } from 'lucide-react';
export interface SubService {
  title: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  href: string;
  description: string;
  icon: React.ElementType;
  details: string[];
  subServices?: SubService[];
  caseStudies?: Omit<Project, 'category'>[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'Web' | 'App' | 'Marketing' | 'Software' | 'Cybersecurity' | 'Data' | 'Cloud' | 'AI' | 'Consulting' | 'Managed';
  dataAiHint?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  rating: number;
  review: string;
  avatarUrl?: string;
  dataAiHint?: string;
}

export interface USP {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  children?: NavItem[];
}

export interface INavLink {
  label: string;
  href: string;
}

export interface IHeaderContent {
  logoText: string;
  navLinks: INavLink[];
  serviceLinks: INavLink[];
  ctaButton: {
    label: string;
    href: string;
  };
}

export interface IQuickLink {
  label: string;
  href: string;
}

export interface ISocialLink {
  label: string;
  href: string;
}

export interface IFooterContent {
  companyName: string;
  companyDescription: string;
  quickLinks: IQuickLink[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialLinks: ISocialLink[];
}

export interface Slide {
  image: string;
  text: string;
  dataAiHint: string;
}
