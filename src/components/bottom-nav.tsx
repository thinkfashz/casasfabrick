"use client";

import { Home, MessageSquare, Wrench, Package, Beaker } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/#metodo", label: "Método", icon: Beaker },
  { href: "/#servicios", label: "Servicios", icon: Wrench },
  { href: "/#proyectos", label: "Proyectos", icon: Package },
  { href: "/#contacto", label: "Contacto", icon: MessageSquare },
];

export default function BottomNav() {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(link => document.getElementById(link.href.substring(2)));
            let currentSection = '';

            // Check for home explicitly
            if (window.scrollY < window.innerHeight / 2) {
              currentSection = '/';
            } else {
              sections.forEach((section, index) => {
                  if (section) {
                      const sectionTop = section.offsetTop - 150;
                      if (window.scrollY >= sectionTop) {
                          currentSection = navItems[index].href;
                      }
                  }
              });
            }
            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] backdrop-blur-sm md:hidden">
            <div className="flex h-20 items-stretch justify-around">
                {navItems.map((item) => {
                    const isActive = activeSection === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-1 flex-col items-center justify-center gap-1.5 text-xs font-medium transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-primary/80"
                            )}
                        >
                            <item.icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    );
}
