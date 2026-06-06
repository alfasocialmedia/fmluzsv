"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
} from "lucide-react";
import { useSettings } from "@/hooks/use-settings";

export function ContactSection() {
  const settings = useSettings();
  const WHATSAPP_LINK = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("Hola FM Luz! Quiero enviarles un pedido de oración 🙏")}`;

  const contactInfo = [
    {
      icon: Phone,
      label: "Teléfono",
      value: settings.phone,
      href: `tel:${settings.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: settings.location,
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
    { icon: Instagram, label: "Instagram", href: settings.instagram || "#", color: "hover:text-pink-500" },
    { icon: Facebook, label: "Facebook", href: settings.facebook || "#", color: "hover:text-blue-600" },
  ];

  return (
    <section id="contacto" className="py-16 sm:py-24 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
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
              ¿Tenés un pedido de oración o querés comunicarte con nosotros?
              Escribinos por WhatsApp
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Main WhatsApp button */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 rounded-3xl bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Escribinos por WhatsApp</h3>
                  <p className="text-white/80 text-sm">
                    Pedido de oración, saludo o mensaje
                  </p>
                </div>
              </a>

              {/* Prayer request card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-primary"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
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
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
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

              {/* Quick WhatsApp floating hint */}
              <div className="p-4 rounded-2xl bg-[#25D366]/5 border border-[#25D366]/20">
                <p className="text-xs text-muted-foreground text-center">
                  💬 Hacé clic en el botón de WhatsApp y envianos tu mensaje al instante
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
