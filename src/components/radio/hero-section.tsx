"use client";

import { motion } from "framer-motion";
import { Play, Radio } from "lucide-react";

export function HeroSection({ onPlay, onShowSchedule }: { onPlay: () => void; onShowSchedule: () => void }) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero-banner.png"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />

      {/* Radio wave rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full border border-primary/10 animate-radio-wave" />
        <div className="absolute w-48 h-48 rounded-full border border-primary/15 animate-radio-wave [animation-delay:0.5s]" />
        <div className="absolute w-32 h-32 rounded-full border border-primary/20 animate-radio-wave [animation-delay:1s]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Radio className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wider uppercase">
              En vivo • 107.5 MHz
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4"
        >
          <span className="bg-gradient-to-r from-primary via-accent-foreground to-primary bg-clip-text text-transparent">
            FM Luz
          </span>
          <br />
          <span className="text-foreground">San Vicente</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed"
        >
          Tu radio cristiana que ilumina el corazón. Música, fe y comunidad
          desde San Vicente, las 24 horas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onPlay}
            className="group relative flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Play className="w-5 h-5 fill-current" />
            </div>
            Escuchar en Vivo
          </button>

          <button
            onClick={onShowSchedule}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
          >
            Ver Programación
          </button>
        </motion.div>

        {/* Frequency badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-8 text-muted-foreground"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">107.5</div>
            <div className="text-xs font-medium uppercase tracking-wider">
              MHz FM
            </div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-xs font-medium uppercase tracking-wider">
              En vivo
            </div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">Cristiana</div>
            <div className="text-xs font-medium uppercase tracking-wider">
              Programación
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
