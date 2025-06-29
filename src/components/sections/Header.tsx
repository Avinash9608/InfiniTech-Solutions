"use client";

import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Home' },
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

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      delay: 0.1,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
    },
  },
};

const MotionLink = motion(Link);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Check on initial render
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
      <Link href={href} className={`${navLinkClasses(isActive)} relative group`}>
        {children}
        <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left transform transition-transform duration-300 ease-out group-hover:scale-x-100 ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
      </Link>
    );
  };
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-card/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <MotionLink
          href="/"
          className={`text-2xl font-bold transition-colors ${isScrolled ? 'text-primary' : 'text-primary-foreground'}`}
          variants={itemVariants}
        >
          InfiniTech
        </MotionLink>

        <motion.nav
          className="hidden md:flex items-center space-x-6"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div variants={itemVariants}>
            <NavLink href="/">Home</NavLink>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`${navLinkClasses(pathname.startsWith('/services'))} px-0 hover:bg-transparent relative group`}>
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left transform transition-transform duration-300 ease-out group-hover:scale-x-100 ${pathname.startsWith('/services') ? 'scale-x-100' : 'scale-x-0'}`} />
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
          </motion.div>

          <motion.div variants={itemVariants}>
            <NavLink href="/portfolio">Portfolio</NavLink>
          </motion.div>
          <motion.div variants={itemVariants}>
            <NavLink href="/about">About Us</NavLink>
          </motion.div>
        </motion.nav>

        <motion.div className="hidden md:flex items-center gap-4" variants={itemVariants}>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <ThemeToggle />
        </motion.div>

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
                  InfiniTech
                </Link>
                <SheetClose asChild>
                   <Button variant="ghost" size="icon">
                    <X className="h-6 w-6 text-muted-foreground" />
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col space-y-4 flex-grow">
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
    </motion.header>
  );
}
