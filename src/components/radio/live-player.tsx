"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const STREAM_URL = "https://streaming.radiostreamlive.com/radioluzsanvicente";

export function LivePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [expanded, setExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
    }

    const audio = audioRef.current;

    if (isPlaying) {
      audio.src = STREAM_URL;
      audio.volume = isMuted ? 0 : volume;
      setIsLoading(true);
      audio.play().catch(() => {
        setIsPlaying(false);
        setIsLoading(false);
      });
      audio.addEventListener("canplay", () => setIsLoading(false));
      audio.addEventListener("waiting", () => setIsLoading(true));
      audio.addEventListener("playing", () => setIsLoading(false));
    } else {
      audio.pause();
      audio.src = "";
      setIsLoading(false);
    }

    return () => {
      audio.removeEventListener("canplay", () => setIsLoading(false));
      audio.removeEventListener("waiting", () => setIsLoading(true));
      audio.removeEventListener("playing", () => setIsLoading(false));
    };
  }, [isPlaying, isMuted, volume]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return (
    <section id="envivo" className="py-16 sm:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                En Vivo
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Escuchanos Ahora
            </h2>
            <p className="text-muted-foreground">
              Transmisión en vivo las 24 horas, los 7 días de la semana
            </p>
          </div>

          {/* Player card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-primary/5 border border-border/50 shadow-xl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative p-6 sm:p-8">
              {/* Top row */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isPlaying
                        ? "bg-primary text-primary-foreground animate-pulse-glow"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Radio className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">FM Luz San Vicente</h3>
                    <p className="text-sm text-muted-foreground">
                      107.5 MHz • {currentTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="p-2 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    {expanded ? (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* Equalizer visualization */}
              <div className="flex items-end justify-center gap-1 h-12 mb-6">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlaying
                        ? "eq-bar bg-primary/60"
                        : "h-1 bg-muted-foreground/20"
                    }`}
                    style={
                      isPlaying
                        ? {
                            animationDelay: `${i * 0.05}s`,
                            animationDuration: `${0.6 + Math.random() * 0.5}s`,
                          }
                        : undefined
                    }
                  />
                ))}
              </div>

              {/* Play controls */}
              <div className="flex items-center justify-center gap-6 mb-4">
                <button className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
                  <Heart className="w-5 h-5 text-muted-foreground hover:text-red-400 transition-colors" />
                </button>

                <button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current ml-1" />
                  )}
                </button>

                <button className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
                  <Share2 className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </button>
              </div>

              {/* Now playing info */}
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  {isPlaying
                    ? "🔊 Reproduciendo en vivo..."
                    : "Presioná play para escuchar"}
                </p>
              </div>

              {/* Expanded controls */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-border/50">
                      {/* Volume control */}
                      <div className="flex items-center gap-3 mb-4">
                        <button
                          onClick={toggleMute}
                          className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => {
                            setVolume(parseFloat(e.target.value));
                            if (isMuted) setIsMuted(false);
                          }}
                          className="flex-1 h-1.5 rounded-full appearance-none bg-muted cursor-pointer accent-primary"
                        />
                        <span className="text-xs text-muted-foreground w-8 text-right">
                          {Math.round((isMuted ? 0 : volume) * 100)}%
                        </span>
                      </div>

                      {/* Stream info */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 rounded-xl bg-muted/30">
                          <span className="text-muted-foreground text-xs">
                            Frecuencia
                          </span>
                          <p className="font-semibold">107.5 MHz FM</p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted/30">
                          <span className="text-muted-foreground text-xs">
                            Ubicación
                          </span>
                          <p className="font-semibold">San Vicente, BA</p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted/30">
                          <span className="text-muted-foreground text-xs">
                            Formato
                          </span>
                          <p className="font-semibold">Cristiana / Musical</p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted/30">
                          <span className="text-muted-foreground text-xs">
                            Cobertura
                          </span>
                          <p className="font-semibold">San Vicente y zona</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
