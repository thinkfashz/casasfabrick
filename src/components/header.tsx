"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#metodo", label: "Nuestro Método" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => {
        if (link.href.includes('#')) {
          const id = link.href.substring(link.href.indexOf('#') + 1);
          return document.getElementById(id);
        }
        return null;
      }).filter(Boolean);
      
      let currentSection = '';
      
      sections.forEach((section) => {
        if (section) {
          const navLink = navLinks.find(link => link.href.substring(link.href.indexOf('#') + 1) === section.id);
          if (navLink) {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
              currentSection = navLink.href;
            }
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    const activeLink = navLinks.find(link => link.href === activeSection) || navLinks.find(link => link.href === pathname);
    const activeIndex = navLinks.findIndex(link => link.href === activeLink?.href);
    const activeItem = itemRefs.current[activeIndex];
    
    if (activeItem && navRef.current) {
      const navBounds = navRef.current.getBoundingClientRect();
      const itemBounds = activeItem.getBoundingClientRect();
      setIndicatorStyle({
        width: itemBounds.width,
        left: itemBounds.left - navBounds.left,
        opacity: 1,
      });
    } else {
       setIndicatorStyle({
        width: 0,
        left: 0,
        opacity: 0,
      });
    }
  }, [activeSection, pathname, isClient]);


  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 hidden md:flex",
        scrolled ? "border-b border-border/60 bg-background/80 shadow-sm backdrop-blur-xl" : ""
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/">
          <Logo scrolled={scrolled} />
        </Link>
        <div className="flex items-center gap-10">
          <nav ref={navRef} className="flex items-center gap-6 relative">
            {navLinks.map((item, index) => {
              const isActive = activeSection === item.href || pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={el => (itemRefs.current[index] = el)}
                  className={cn(
                    "relative z-10 font-medium transition-colors duration-300 py-2 text-sm",
                    isActive
                      ? "text-primary"
                      : scrolled
                      ? "text-foreground/70 hover:text-primary"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <div 
              className="absolute bottom-1.5 h-0.5 bg-primary transition-all duration-300 ease-in-out"
              style={indicatorStyle}
            />
          </nav>

          <Button asChild>
            <a href="https://wa.me/56966960729" target="_blank" rel="noopener noreferrer">Cotiza tu Proyecto</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
