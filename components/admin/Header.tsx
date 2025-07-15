
'use client';

import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Bot, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import type { NavItem } from '@/app/admin/layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';


interface HeaderProps {
    navItems: NavItem[];
    secret: string | null;
}

export default function Header({ navItems, secret }: HeaderProps) {
  const pathname = usePathname();

  const getAccordionDefaultValues = () => {
    const activeParent = navItems.find(item => 
      item.children?.some(child => pathname.startsWith(child.href))
    );
    return activeParent ? [activeParent.label] : [];
  };

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

                  <Accordion type="multiple" defaultValue={getAccordionDefaultValues()} className="w-full">
                     {navItems.map(item => (
                        item.children ? (
                           <AccordionItem key={item.label} value={item.label} className="border-b-0">
                                <AccordionTrigger className="p-0 hover:no-underline text-muted-foreground hover:text-foreground">
                                    <span className="flex items-center gap-3 py-2 flex-grow">
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </span>
                                </AccordionTrigger>
                            <AccordionContent className="pl-8">
                              {item.children.map(child => (
                                <SheetClose asChild key={child.label}>
                                   <Link href={`${child.href}?secret=${secret}`} className="block py-2 text-muted-foreground hover:text-foreground">
                                    {child.label}
                                  </Link>
                                </SheetClose>
                              ))}
                            </AccordionContent>
                           </AccordionItem>
                        ) : (
                          <SheetClose asChild key={item.label}>
                            <Link href={`${item.href}?secret=${secret}`} className="flex items-center gap-3 py-2 text-muted-foreground hover:text-foreground">
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                           </SheetClose>
                        )
                     ))}
                  </Accordion>
                </nav>
            </SheetContent>
        </Sheet>
        {/* You can add user profile dropdown here */}
    </header>
  );
}
