"use client";

import { motion } from "framer-motion";
import { Clock, Music, Mic2, BookOpen, Heart, Sun, Moon, Star } from "lucide-react";

const scheduleData = [
  {
    day: "Lunes a Viernes",
    programs: [
      {
        time: "06:00 - 08:00",
        name: "Amanecer de Luz",
        description: "Comenzá el día con música y reflexiones que alimentan el alma",
        icon: Sun,
        color: "from-amber-400/10 to-orange-400/10",
      },
      {
        time: "08:00 - 10:00",
        name: "Buenos Días San Vicente",
        description: "Noticias, música y la información que necesitás para arrancar el día",
        icon: Mic2,
        color: "from-yellow-400/10 to-amber-400/10",
      },
      {
        time: "10:00 - 12:00",
        name: "Alabanza y Adoración",
        description: "Las mejores alabanzas para acompañar tu mañana con fe",
        icon: Music,
        color: "from-primary/10 to-accent/10",
      },
      {
        time: "12:00 - 14:00",
        name: "Hora del Mediodía",
        description: "Música variada y momentos de reflexión al mediodía",
        icon: Clock,
        color: "from-emerald-400/10 to-teal-400/10",
      },
      {
        time: "14:00 - 17:00",
        name: "Tarde de Gracia",
        description: "Tardes llenas de bendición con la mejor música cristiana",
        icon: Heart,
        color: "from-rose-400/10 to-pink-400/10",
      },
      {
        time: "17:00 - 19:00",
        name: "Vuelta a Casa",
        description: "Acompañamos tu regreso con alegría y buena música",
        icon: Music,
        color: "from-violet-400/10 to-purple-400/10",
      },
      {
        time: "19:00 - 21:00",
        name: "Noche de Paz",
        description: "Música suave para relajar el espíritu y cerrar el día",
        icon: Moon,
        color: "from-blue-400/10 to-indigo-400/10",
      },
      {
        time: "21:00 - 06:00",
        name: "Música de la Noche",
        description: "Selección musical nocturna para descansar en paz",
        icon: Star,
        color: "from-slate-400/10 to-gray-400/10",
      },
    ],
  },
  {
    day: "Sábados",
    programs: [
      {
        time: "07:00 - 09:00",
        name: "Sábado de Esperanza",
        description: "Comenzá el fin de semana con esperanza y alegría",
        icon: Sun,
        color: "from-amber-400/10 to-orange-400/10",
      },
      {
        time: "09:00 - 12:00",
        name: "Festival de Música",
        description: "Maratón musical con los éxitos cristianos del momento",
        icon: Music,
        color: "from-primary/10 to-accent/10",
      },
      {
        time: "12:00 - 15:00",
        name: "Tarde Familiar",
        description: "Programación especial para compartir en familia",
        icon: Heart,
        color: "from-rose-400/10 to-pink-400/10",
      },
      {
        time: "15:00 - 20:00",
        name: "Lo Mejor de la Semana",
        description: "Reviví los momentos más especiales de la semana",
        icon: Star,
        color: "from-emerald-400/10 to-teal-400/10",
      },
      {
        time: "20:00 - 06:00",
        name: "Noche de Adoración",
        description: "Noche dedicada a la adoración y la alabanza",
        icon: BookOpen,
        color: "from-violet-400/10 to-purple-400/10",
      },
    ],
  },
  {
    day: "Domingos",
    programs: [
      {
        time: "07:00 - 10:00",
        name: "Domingo de Gloria",
        description: "Un despertar lleno de gloria y alabanza al Señor",
        icon: Sun,
        color: "from-amber-400/10 to-orange-400/10",
      },
      {
        time: "10:00 - 13:00",
        name: "Celebración Dominical",
        description: "Música de celebración y mensajes de fe para tu domingo",
        icon: Music,
        color: "from-primary/10 to-accent/10",
      },
      {
        time: "13:00 - 17:00",
        name: "Descanso y Fe",
        description: "Tardes de descanso con música inspiradora",
        icon: Heart,
        color: "from-emerald-400/10 to-teal-400/10",
      },
      {
        time: "17:00 - 21:00",
        name: "Cierre de Semana",
        description: "Despedí la semana con gratitud y música cristiana",
        icon: BookOpen,
        color: "from-rose-400/10 to-pink-400/10",
      },
      {
        time: "21:00 - 07:00",
        name: "Paz Nocturna",
        description: "Llega la noche con paz y tranquilidad espiritual",
        icon: Moon,
        color: "from-violet-400/10 to-purple-400/10",
      },
    ],
  },
];

export function ScheduleSection() {
  return (
    <section id="programacion" className="py-16 sm:py-24 px-4 bg-muted/30">
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
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Programación
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Nuestra Grilla
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Descubrí toda nuestra programación semanal, pensada para
              acompañarte en cada momento del día
            </p>
          </div>

          {/* Schedule tabs */}
          <div className="space-y-8">
            {scheduleData.map((dayGroup, dayIndex) => (
              <motion.div
                key={dayGroup.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {dayGroup.day}
                </h3>
                <div className="grid gap-3">
                  {dayGroup.programs.map((program, progIndex) => {
                    const Icon = program.icon;
                    return (
                      <motion.div
                        key={program.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: progIndex * 0.05,
                        }}
                        className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r ${program.color} to-transparent border border-border/30 hover:border-primary/20 p-4 sm:p-5 transition-all duration-300 hover:shadow-md`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="font-semibold text-sm sm:text-base">
                                {program.name}
                              </h4>
                              <span className="text-xs font-mono font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md whitespace-nowrap">
                                {program.time}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {program.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
