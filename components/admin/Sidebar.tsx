
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Bot, ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { NavItem } from '@/app/admin/layout';

interface SidebarProps {
  navItems: NavItem[];
  secret: string | null;
}

export default function Sidebar({ navItems, secret }: SidebarProps) {
  const pathname = usePathname();

  const getAccordionDefaultValues = () => {
    const activeParent = navItems.find(item => 
      item.children?.some(child => pathname.startsWith(child.href))
    );
    return activeParent ? [activeParent.label] : [];
  };

  return (
    <aside className="hidden md:flex w-64 flex-col bg-background border-r">
      <div className="p-6">
        <Link href={`/admin?secret=${secret}`} className="flex items-center gap-2">
          <Bot className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-2">
        <Accordion type="multiple" defaultValue={getAccordionDefaultValues()} className="w-full">
          {navItems.map((item) => (
            item.children ? (
              <AccordionItem key={item.label} value={item.label} className="border-b-0">
                <AccordionTrigger className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-secondary hover:no-underline",
                   item.children.some(c => pathname === c.href) && "bg-secondary text-primary font-semibold"
                )}>
                  <div className="flex items-center gap-3 flex-grow">
                     <item.icon className="h-5 w-5" />
                     {item.label}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-6 pb-0">
                  <ul className="space-y-1 mt-1 border-l border-border ml-2">
                    {item.children.map(child => {
                      const isActive = pathname === child.href;
                      return (
                         <li key={child.label}>
                           <Link
                             href={`${child.href}?secret=${secret}`}
                             className={cn(
                               "flex items-center gap-3 rounded-lg px-3 py-2 ml-2 text-muted-foreground transition-all hover:text-primary hover:bg-secondary",
                               isActive && "bg-secondary text-primary font-semibold"
                             )}
                           >
                             <child.icon className="h-4 w-4" />
                             {child.label}
                           </Link>
                         </li>
                      )
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <div key={item.label}>
                <Link
                  href={`${item.href}?secret=${secret}`}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-secondary",
                    pathname === item.href && "bg-secondary text-primary font-semibold"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </div>
            )
          ))}
        </Accordion>
      </nav>
      <div className="p-4 mt-auto">
        {/* Can add footer items here, like a sign out button */}
      </div>
    </aside>
  );
}
