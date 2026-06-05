"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Radio,
  Calendar,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "envivo", label: "En Vivo", icon: Radio },
  { id: "programacion", label: "Programación", icon: Calendar },
  { id: "contacto", label: "Contacto", icon: MessageCircle },
];

export function MobileNav({ activeSection }: { activeSection: string }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-warm border-t border-border/50 safe-bottom">
      <div className="flex items-center justify-around px-2 pt-2 pb-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 min-w-[64px] ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-300 ${
                  isActive ? "bg-primary/10" : ""
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? "stroke-[2.5]" : "stroke-[1.5]"
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-medium transition-all duration-300 ${
                  isActive ? "text-primary" : ""
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="w-1 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export function DesktopNav({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-warm shadow-sm border-b border-border/30" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            <img
              src="/station-logo.png"
              alt="FM Luz"
              className="w-7 h-7 object-contain"
            />
          </div>
          <div>
            <span className="font-bold text-sm tracking-wide">
              FM Luz San Vicente
            </span>
            <span className="block text-[10px] text-muted-foreground font-medium">
              107.5 MHz
            </span>
          </div>
        </a>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
