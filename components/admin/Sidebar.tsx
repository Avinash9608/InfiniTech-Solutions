
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon, Bot } from 'lucide-react';

interface SidebarProps {
  navItems: { href: string; label: string; icon: LucideIcon }[];
  secret: string | null;
}

export default function Sidebar({ navItems, secret }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col bg-background border-r">
      <div className="p-6">
        <Link href={`/admin?secret=${secret}`} className="flex items-center gap-2">
          <Bot className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={`${item.href}?secret=${secret}`}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-secondary",
                    isActive && "bg-secondary text-primary font-semibold"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 mt-auto">
        {/* Can add footer items here, like a sign out button */}
      </div>
    </aside>
  );
}
