
"use client";

import { useSearchParams } from 'next/navigation';
import { Home, Mail, Settings, ShieldAlert, Bot, LayoutDashboard, LayoutTemplate, CornerDownLeft, HeartHandshake } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import { useState, useEffect } from 'react';

export interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  children?: NavItem[];
}

const navItems: NavItem[] = [
    { 
      href: '/admin', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
    },
    { 
      href: '/admin/hero', // Parent link defaults to first child
      label: 'Home Page', 
      icon: Home,
      children: [
        { href: '/admin/hero', label: 'Hero Section', icon: Bot },
        { href: '/admin/header', label: 'Header', icon: LayoutTemplate },
        { href: '/admin/footer', label: 'Footer', icon: CornerDownLeft },
        { href: '/admin/why-choose-us', label: 'Why Choose Us', icon: HeartHandshake },
      ]
    },
    { href: '/admin/inbox', label: 'Inbox', icon: Mail },
];


interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const providedSecret = searchParams.get('secret');
  const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a loading state or null on the server and initial client render
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Bot className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!adminSecret || providedSecret !== adminSecret) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
        <ShieldAlert className="w-24 h-24 text-destructive mb-6" />
        <h1 className="text-4xl font-bold text-primary mb-2">Access Denied</h1>
        <p className="text-muted-foreground max-w-md">
          You do not have permission to view this page. Please provide the correct secret key.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-secondary">
      <Sidebar navItems={navItems} secret={providedSecret} />
      <div className="flex flex-col flex-1">
        <Header navItems={navItems} secret={providedSecret} />
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
