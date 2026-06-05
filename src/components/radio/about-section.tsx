"use client";

import { motion } from "framer-motion";
import { Heart, Radio, Users, MapPin, Church, HandHeart } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Fe y Amor",
    description:
      "Propagamos el mensaje de amor y esperanza de Cristo a cada hogar de San Vicente y alrededores.",
  },
  {
    icon: Church,
    title: "Comunidad",
    description:
      "Somos más que una radio, somos una familia unida por la fe y el servicio a la comunidad.",
  },
  {
    icon: HandHeart,
    title: "Servicio",
    description:
      "Nos comprometemos a servir a nuestra comunidad con información, compañía y apoyo espiritual.",
  },
  {
    icon: Radio,
    title: "Excelencia",
    description:
      "Buscamos la excelencia en cada transmisión, llevando la mejor programación cristiana a tu radio.",
  },
];

const stats = [
  { value: "107.5", label: "MHz FM", icon: Radio },
  { value: "24/7", label: "En vivo", icon: Users },
  { value: "+10", label: "Años", icon: Church },
  { value: "San Vicente", label: "Cobertura", icon: MapPin },
];

export function AboutSection() {
  return (
    <section id="nosotros" className="py-16 sm:py-24 px-4">
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
              <Heart className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Sobre Nosotros
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Nuestra Misión
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Somos una radio cristiana comprometida con llevar luz y esperanza
              a cada rincón de San Vicente
            </p>
          </div>

          {/* About content with image */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto"
            >
              <img
                src="/about-bg.png"
                alt="FM Luz San Vicente"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-lg font-semibold drop-shadow-lg">
                  Iluminando corazones desde San Vicente
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-4">
                FM Luz San Vicente: La Voz de la Fe
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  FM Luz San Vicente nació con la misión de ser un instrumento
                  de Dios, llevando su mensaje de amor y esperanza a cada hogar
                  de nuestra ciudad y sus alrededores.
                </p>
                <p>
                  Con más de una década en el aire, nos hemos convertido en un
                  referente de la comunicación cristiana en la zona, ofreciendo
                  programación variada que incluye música, reflexiones,
                  entrevistas y contenido para toda la familia.
                </p>
                <p>
                  Nuestro compromiso es con la comunidad, la fe y los valores
                  que nos unen como pueblo de Dios. Cada programa, cada canción,
                  cada palabra que sale al aire está pensada para edificar,
                  consolar y alegrar el corazón de nuestros oyentes.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="p-4 rounded-2xl bg-muted/30 border border-border/30 text-center"
                    >
                      <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
                      <div className="text-xl font-bold text-primary">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Values grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group p-6 rounded-2xl bg-card border border-border/30 hover:border-primary/20 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
