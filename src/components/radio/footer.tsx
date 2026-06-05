"use client";

import { Radio, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-border/30 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Radio className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-sm">FM Luz San Vicente</span>
          </div>

          <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
            Radio cristiana en 107.5 MHz desde San Vicente, Buenos Aires,
            Argentina. Llevando luz y esperanza a cada hogar.
          </p>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>© {currentYear} FM Luz San Vicente.</span>
            <span>Hecho con</span>
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            <span>y fe.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
