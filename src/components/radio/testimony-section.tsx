"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareHeart,
  Send,
  CheckCircle2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

interface Testimony {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  createdAt: string;
}

export function TestimonySection() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch("/api/testimonios")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setTestimonies(data);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/testimonios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setName("");
        setMessage("");
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch {
      // error
    }
    setIsSubmitting(false);
  };

  const nextSlide = () => {
    if (testimonies.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % testimonies.length);
    }
  };

  const prevSlide = () => {
    if (testimonies.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + testimonies.length) % testimonies.length);
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    if (testimonies.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [testimonies.length, currentSlide]);

  return (
    <section id="testimonios" className="py-16 sm:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <MessageSquareHeart className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Testimonios
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Compartí tu Testimonio
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Contanos cómo Dios obró en tu vida. Tu testimonio puede ser de
              bendición para alguien más.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Submit form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-6 rounded-3xl bg-card border border-border/30 shadow-sm h-full">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Dejá tu testimonio
                </h3>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 mb-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <p className="text-sm font-medium text-emerald-700">
                      ¡Gracias por tu testimonio! Será publicado después de ser revisado.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Tu nombre
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      maxLength={100}
                      placeholder="Ej: María López"
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Tu testimonio
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      maxLength={1000}
                      rows={5}
                      placeholder="Contanos cómo Dios obró en tu vida..."
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {message.length}/1000
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || !message.trim()}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar Testimonio
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Testimonies carousel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 h-full flex flex-col">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-primary" />
                  Testimonios de la comunidad
                </h3>

                {testimonies.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                    <MessageSquareHeart className="w-12 h-12 text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Aún no hay testimonios aprobados.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ¡Sé el primero en compartir tu historia!
                    </p>
                  </div>
                ) : (
                  <div className="flex-1 relative min-h-[200px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col justify-center h-full"
                      >
                        <Quote className="w-8 h-8 text-primary/20 mb-3" />
                        <p className="text-foreground leading-relaxed mb-6 italic">
                          &ldquo;{testimonies[currentSlide]?.message}&rdquo;
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {testimonies[currentSlide]?.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {testimonies[currentSlide]?.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(
                                testimonies[currentSlide]?.createdAt
                              ).toLocaleDateString("es-AR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation dots */}
                    {testimonies.length > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-6">
                        <button
                          onClick={prevSlide}
                          className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <div className="flex gap-1.5">
                          {testimonies.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentSlide(i)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                i === currentSlide
                                  ? "bg-primary w-4"
                                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={nextSlide}
                          className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
