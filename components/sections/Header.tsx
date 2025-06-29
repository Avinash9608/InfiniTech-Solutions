"use client";

import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  // Services dropdown is handled separately
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const serviceItems = [
  { href: '/services/web-development', label: 'Web Development' },
  { href: '/services/cybersecurity', label: 'Cybersecurity' },
  { href: '/services/data-analytics', label: 'Data Analytics' },
  { href: '/services/cloud-services', label: 'Cloud Services' },
  { href: '/services/ai-ml', label: 'AI & ML' },
  { href: '/services/it-consulting', label: 'IT Consulting' },
  { href: '/services/managed-services', label: 'Managed Services' },
  { href: '/services/digital-marketing', label: 'Digital Marketing' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} className={`transition-colors hover:text-primary ${isActive ? 'text-primary font-semibold' : isScrolled ? 'text-foreground' : 'text-card-foreground'}`}>
        {children}
      </Link>
    );
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-card shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <Link href="/" className="text-2xl font-bold text-primary">
          InfiniTech
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="/">Home</NavLink>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={`transition-colors hover:text-primary px-0 hover:bg-transparent ${pathname.startsWith('/services') ? 'text-primary font-semibold' : isScrolled ? 'text-foreground' : 'text-card-foreground'}`}>
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {serviceItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink href="/portfolio">Portfolio</NavLink>
          <NavLink href="/about">About Us</NavLink>
        </nav>

        <div className="hidden md:block">
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled || pathname !== '/' ? 'text-primary' : 'text-primary-foreground'}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-card p-6">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-primary">
                  InfiniTech
                </Link>
                <SheetClose asChild>
                   <Button variant="ghost" size="icon">
                    <X className="h-6 w-6 text-muted-foreground" />
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <Link href={item.href} className="text-lg text-foreground hover:text-primary transition-colors py-2">
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                 <p className="text-lg text-foreground py-2">Services</p>
                 <div className="flex flex-col space-y-3 pl-4">
                  {serviceItems.map((item) => (
                    <SheetClose asChild key={item.label}>
                      <Link href={item.href} className="text-md text-muted-foreground hover:text-primary transition-colors">
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                 </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
