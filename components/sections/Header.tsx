
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import type { IHeaderContent } from '@/lib/types';

const defaultHeaderContent: IHeaderContent = {
  logoText: 'InfiniTech',
  navLinks: [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About Us' },
  ],
  serviceLinks: [
    { href: '/services/web-development', label: 'Web Development' },
    { href: '/services/cybersecurity', label: 'Cybersecurity' },
    { href: '/services/data-analytics', label: 'Data Analytics' },
    { href: '/services/cloud-services', label: 'Cloud Services' },
    { href: '/services/ai-ml', label: 'AI & ML' },
    { href: '/services/it-consulting', label: 'IT Consulting' },
    { href: '/services/managed-services', label: 'Managed Services' },
    { href: '/services/digital-marketing', label: 'Digital Marketing' },
  ],
  ctaButton: { href: '/contact', label: 'Contact Us' },
} as IHeaderContent;


export default function Header() {
  const [content, setContent] = useState<IHeaderContent>(defaultHeaderContent);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    async function fetchHeaderContent() {
      try {
        const res = await fetch('/api/admin/header');
        if (res.ok) {
          const data = await res.json();
          setContent(data);
        }
      } catch (error) {
        console.error("Failed to fetch header content", error);
      }
    }
    fetchHeaderContent();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [isHomePage]);

  const navLinkClasses = (isActive: boolean) => {
    const base = 'transition-colors hover:text-primary';
    const scrolledState = isScrolled ? 'text-foreground' : 'text-primary-foreground';
    const activeState = isScrolled ? 'text-primary font-semibold' : 'text-primary-foreground font-semibold';
    
    return `${base} ${isActive ? activeState : scrolledState}`;
  };

  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} className={navLinkClasses(isActive)}>
        {children}
      </Link>
    );
  };
  
  // Filter out Contact/Contact Us from navLinks
  const filteredNavLinks = content.navLinks.filter(
    (item) => item.label !== 'Contact' && item.label !== 'Contact Us'
  );

  // Hardcoded main nav links for public site
  const mainNavLinks = [
    { href: '/', label: 'Home' },
    // Services is handled as a dropdown, not a direct link
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-card/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <Link href="/" className={`flex items-center gap-2 text-2xl font-bold transition-colors ${isScrolled ? 'text-primary' : 'text-primary-foreground'}`}> 
          <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
          {content.logoText}
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {/* Home first */}
          {mainNavLinks
            .filter((item) => item.label === 'Home')
            .map((item) => (
              <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
            ))}
          {/* Services dropdown second */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={`${navLinkClasses(pathname.startsWith('/services'))} px-0 hover:bg-transparent`}>
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {content.serviceLinks
                .filter(
                  (item): item is { href: string; label: string } =>
                    !!item && typeof item.href === 'string' && item.href.length > 0 && typeof item.label === 'string'
                )
                .map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Portfolio third */}
          {mainNavLinks
            .filter((item) => item.label === 'Portfolio')
            .map((item) => (
              <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
            ))}
          {/* About Us fourth */}
          {mainNavLinks
            .filter((item) => item.label === 'About Us')
            .map((item) => (
              <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
            ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {content.ctaButton?.href && (
            <Button asChild>
              <Link href={content.ctaButton.href}>{content.ctaButton.label}</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled ? 'text-foreground' : 'text-primary-foreground'}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-card p-6 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-primary">
                  {content.logoText}
                </Link>
                <SheetClose asChild>
                   <Button variant="ghost" size="icon">
                    <X className="h-6 w-6 text-muted-foreground" />
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col space-y-4 flex-grow">
                {/* Home first */}
                {mainNavLinks
                  .filter((item) => item.label === 'Home')
                  .map((item) => (
                    <SheetClose asChild key={item.label}>
                      <Link href={item.href} className="text-lg text-foreground hover:text-primary transition-colors py-2">
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                {/* Services dropdown second */}
                <p className="text-lg text-foreground py-2">Services</p>
                <div className="flex flex-col space-y-3 pl-4">
                  {content.serviceLinks
                    .filter(
                      (item): item is { href: string; label: string } =>
                        !!item && typeof item.href === 'string' && item.href.length > 0 && typeof item.label === 'string'
                    )
                    .map((item) => (
                      <SheetClose asChild key={item.label}>
                        <Link href={item.href} className="text-md text-muted-foreground hover:text-primary transition-colors">
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                </div>
                {/* Portfolio third */}
                {mainNavLinks
                  .filter((item) => item.label === 'Portfolio')
                  .map((item) => (
                    <SheetClose asChild key={item.label}>
                      <Link href={item.href} className="text-lg text-foreground hover:text-primary transition-colors py-2">
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                {/* About Us fourth */}
                {mainNavLinks
                  .filter((item) => item.label === 'About Us')
                  .map((item) => (
                    <SheetClose asChild key={item.label}>
                      <Link href={item.href} className="text-lg text-foreground hover:text-primary transition-colors py-2">
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
