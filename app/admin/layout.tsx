import { redirect } from 'next/navigation';
import { Home, Mail, Settings, ShieldAlert, Bot } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';

interface AdminLayoutProps {
  children: React.ReactNode;
  searchParams: {
    secret?: string;
  };
}

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/inbox', label: 'Inbox', icon: Mail },
    { href: '/admin/hero', label: 'Hero Section', icon: Bot },
];

export default function AdminLayout({ children, searchParams }: Omit<AdminLayoutProps, 'searchParams'> & { searchParams: { secret?: string }}) {
  const adminSecret = process.env.ADMIN_SECRET;
  const providedSecret = searchParams.secret;

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
        <Header />
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
