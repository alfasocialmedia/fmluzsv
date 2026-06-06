"use client";

import { motion } from "framer-motion";
import { Smartphone, Download } from "lucide-react";
import { useSettings } from "@/hooks/use-settings";

export function DownloadAppSection() {
  const settings = useSettings();

  // Don't render the section if no download URL is configured
  if (!settings.appDownloadUrl) return null;

  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-white p-8 sm:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Left content */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
                  <Smartphone className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    App Móvil
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                  Descargá Nuestra App
                </h2>
                <p className="text-white/70 max-w-md leading-relaxed mb-6">
                  Llevá FM Luz San Vicente en tu celular. Escuchá la radio en
                  vivo, recibí notificaciones y accedé a contenido exclusivo
                  desde cualquier lugar.
                </p>

                {/* Google Play style button */}
                <a
                  href={settings.appDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-6 py-3.5 bg-white text-black rounded-xl hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  {/* Google Play triangle icon */}
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 shrink-0"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z"
                      fill="#4285F4"
                    />
                    <path
                      d="M17.092 8.65l-3.3 3.35 3.3 3.35 3.726-2.128a.998.998 0 000-1.734L17.092 8.65z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M3.609 1.814L13.792 12l3.3-3.35L4.826.526a1.006 1.006 0 00-1.217.288z"
                      fill="#EA4335"
                    />
                    <path
                      d="M3.609 22.186a1.006 1.006 0 001.217.288L17.092 15.7 13.792 12 3.609 22.186z"
                      fill="#34A853"
                    />
                  </svg>
                  <div className="text-left">
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-70 block leading-tight">
                      Disponible en
                    </span>
                    <span className="text-lg font-bold leading-tight">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>

              {/* Right - phone illustration */}
              <div className="flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  {/* Phone frame */}
                  <div className="w-48 h-80 rounded-[2.5rem] border-4 border-white/20 bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-4 shadow-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-primary/80 flex items-center justify-center">
                      <Radio className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold">FM Luz</p>
                      <p className="text-[10px] text-white/60">107.5 MHz</p>
                    </div>
                    {/* Fake equalizer bars */}
                    <div className="flex items-end gap-0.5 h-6">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full bg-primary/60"
                          style={{
                            height: `${8 + Math.random() * 16}px`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="w-16 h-1 rounded-full bg-white/20" />
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-lg"
                  >
                    <Download className="w-3 h-3" />
                    Gratis
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Radio({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </svg>
  );
}
