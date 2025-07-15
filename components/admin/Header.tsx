
'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Bot } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
    secret: string | null;
}

export default function Header({ secret }: HeaderProps) {
  // This is a placeholder for the navItems, as they are defined in the layout
  // In a real app, you might use a context or a shared config for this
  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/inbox', label: 'Inbox' },
    { href: '/admin/hero', label: 'Hero Section' },
  ];

  return (
    <header className="flex h-16 items-center justify-between md:justify-end gap-4 border-b bg-background px-6">
        <Sheet>
            <SheetTrigger asChild>
                <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
                >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                <Link
                    href={`/admin?secret=${secret}`}
                    className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                    <Bot className="h-6 w-6" />
                    <span>Admin Panel</span>
                </Link>
                {navItems.map(item => (
                    <Link key={item.label} href={`${item.href}?secret=${secret}`} className="text-muted-foreground hover:text-foreground">
                        {item.label}
                    </Link>
                ))}
                </nav>
            </SheetContent>
        </Sheet>
        {/* You can add user profile dropdown here */}
    </header>
  );
}
