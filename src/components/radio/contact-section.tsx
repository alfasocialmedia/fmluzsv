"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "+54 9 11 XXXX-XXXX",
    href: "tel:+54911XXXXXXXX",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contacto@fmluzsanvicente.com.ar",
    href: "mailto:contacto@fmluzsanvicente.com.ar",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "San Vicente, Buenos Aires, Argentina",
    href: null,
  },
  {
    icon: Clock,
    label: "Atención",
    value: "Lunes a Viernes 9:00 - 18:00",
    href: null,
  },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-500" },
  { icon: Facebook, label: "Facebook", href: "#", color: "hover:text-blue-600" },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <MessageCircle className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Contacto
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Hablemos
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              ¿Tenés un mensaje, una solicitud de oración o querés participar en
              nuestra programación? Escribinos
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-3xl bg-card border border-border/30 shadow-sm"
              >
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 mb-6"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <p className="text-sm font-medium text-emerald-700">
                      ¡Mensaje enviado con éxito! Te responderemos pronto.
                    </p>
                  </motion.div>
                )}

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="Tu nombre"
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      placeholder="tu@email.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1.5">
                    Asunto
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  >
                    <option value="">Seleccioná un asunto</option>
                    <option value="oracion">Solicitud de Oración</option>
                    <option value="saludo">Saludo al Aire</option>
                    <option value="musica">Sugerencia Musical</option>
                    <option value="publicidad">Publicidad / Auspicio</option>
                    <option value="evento">Evento Comunitario</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1.5">
                    Mensaje
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={4}
                    placeholder="Escribí tu mensaje aquí..."
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Prayer request card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Pedido de Oración
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Si necesitás que oremos por vos o por un ser querido,
                  no dudes en escribirnos. Estamos aquí para acompañarte en
                  oración.
                </p>
                <p className="text-xs text-muted-foreground italic">
                  &ldquo;Porque donde están dos o tres congregados en mi nombre,
                  allí estoy yo en medio de ellos.&rdquo; — Mateo 18:20
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-3">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const Wrapper = info.href ? "a" : "div";
                  return (
                    <Wrapper
                      key={info.label}
                      href={info.href || undefined}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/30 hover:border-primary/20 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-0.5">
                          {info.label}
                        </p>
                        <p className="text-sm font-medium">{info.value}</p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>

              {/* Social links */}
              <div className="p-4 rounded-2xl bg-card border border-border/30">
                <p className="text-sm font-medium mb-3">Seguinos</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className={`w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110`}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Heart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
