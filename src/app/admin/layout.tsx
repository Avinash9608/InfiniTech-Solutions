"use client"
import { Home, Mail, Settings, ShieldAlert, Bot } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import { useSearchParams } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/inbox', label: 'Inbox', icon: Mail },
    { href: '/admin/hero', label: 'Hero Section', icon: Bot },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const params = useSearchParams();
  const secret = params.get('secret');
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret || secret !== adminSecret) {
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
      <Sidebar navItems={navItems} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
