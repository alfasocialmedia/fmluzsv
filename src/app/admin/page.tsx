"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Save,
  Upload,
  Radio,
  Image,
  FileImage,
  Settings,
  Calendar,
  Plus,
  Trash2,
  CheckCircle2,
  Loader2,
  Globe,
  Type,
  Hash,
  Phone,
  MessageSquareHeart,
  Check,
  X,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Settings {
  streamUrl?: string;
  stationName?: string;
  frequency?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  whatsappNumber?: string;
  phone?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  location?: string;
  appDownloadUrl?: string;
}

interface Program {
  id?: string;
  day: string;
  time: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

const defaultSettings: Settings = {
  streamUrl: "https://streaming.radiostreamlive.com/radioluzsanvicente",
  stationName: "FM Luz San Vicente",
  frequency: "107.5",
  seoTitle: "FM Luz San Vicente - 107.5 MHz | Radio Cristiana",
  seoDescription:
    "FM Luz San Vicente, tu radio cristiana en 107.5 MHz. Música, fe y comunidad desde San Vicente. Escuchanos en vivo las 24 horas.",
  seoKeywords: "FM Luz, San Vicente, Radio Cristiana, 107.5 MHz, Radio en vivo",
  whatsappNumber: "5491122334455",
  phone: "+54 9 11 XXXX-XXXX",
  email: "contacto@fmluzsanvicente.com.ar",
  instagram: "",
  facebook: "",
  location: "San Vicente, Buenos Aires, Argentina",
  appDownloadUrl: "",
};

const iconOptions = [
  "Sun",
  "Mic2",
  "Music",
  "Clock",
  "Heart",
  "Moon",
  "Star",
  "BookOpen",
];

const colorOptions = [
  { value: "from-amber-400/10 to-orange-400/10", label: "Ámbar" },
  { value: "from-yellow-400/10 to-amber-400/10", label: "Dorado" },
  { value: "from-primary/10 to-accent/10", label: "Primario" },
  { value: "from-emerald-400/10 to-teal-400/10", label: "Esmeralda" },
  { value: "from-rose-400/10 to-pink-400/10", label: "Rosa" },
  { value: "from-violet-400/10 to-purple-400/10", label: "Violeta" },
  { value: "from-blue-400/10 to-indigo-400/10", label: "Azul" },
  { value: "from-slate-400/10 to-gray-400/10", label: "Gris" },
];

const dayOptions = [
  { value: "lunes-viernes", label: "Lunes a Viernes" },
  { value: "sabados", label: "Sábados" },
  { value: "domingos", label: "Domingos" },
];

interface Testimony {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  createdAt: string;
}

type Tab = "general" | "media" | "seo" | "schedule" | "testimonios";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load settings
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setSettings({ ...defaultSettings, ...data });
        }
      })
      .catch(() => {});

    // Load schedule
    fetch("/api/admin/schedule")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPrograms(data);
        }
      })
      .catch(() => {});

    // Load testimonies
    fetch("/api/admin/testimonios")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setTestimonies(data);
      })
      .catch(() => {});
  }, []);

  const saveSettings = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Error al guardar");
    }
    setSaving(false);
  };

  const handleUpload = async (file: File, type: string) => {
    setUploading(type);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      alert("Error al subir imagen");
    }
    setUploading(null);
  };

  const addProgram = () => {
    setPrograms([
      ...programs,
      {
        day: "lunes-viernes",
        time: "00:00 - 00:00",
        name: "",
        description: "",
        icon: "Music",
        color: "from-primary/10 to-accent/10",
        order: programs.length,
      },
    ]);
  };

  const removeProgram = (index: number) => {
    setPrograms(programs.filter((_, i) => i !== index));
  };

  const updateProgram = (index: number, field: string, value: string | number) => {
    const updated = [...programs];
    updated[index] = { ...updated[index], [field]: value };
    setPrograms(updated);
  };

  const saveSchedule = async () => {
    setSaving(true);
    try {
      // Delete all existing and recreate
      const existing = await fetch("/api/admin/schedule").then((r) => r.json());
      for (const p of existing) {
        if (p.id) {
          await fetch(`/api/admin/schedule?id=${p.id}`, { method: "DELETE" });
        }
      }
      // Create new
      for (const prog of programs) {
        await fetch("/api/admin/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(prog),
        });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Error al guardar programación");
    }
    setSaving(false);
  };

  const approveTestimony = async (id: string, approved: boolean) => {
    try {
      await fetch("/api/admin/testimonios", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved }),
      });
      setTestimonies((prev) =>
        prev.map((t) => (t.id === id ? { ...t, approved } : t))
      );
    } catch {
      alert("Error al actualizar testimonio");
    }
  };

  const deleteTestimony = async (id: string) => {
    try {
      await fetch(`/api/admin/testimonios?id=${id}`, { method: "DELETE" });
      setTestimonies((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Error al eliminar testimonio");
    }
  };

  const tabs: { id: Tab; label: string; icon: typeof Settings }[] = [
    { id: "general", label: "General", icon: Settings },
    { id: "media", label: "Imágenes", icon: Image },
    { id: "seo", label: "SEO", icon: Globe },
    { id: "schedule", label: "Programación", icon: Calendar },
    { id: "testimonios", label: "Testimonios", icon: MessageSquareHeart },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-warm border-b border-border/30">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Volver al sitio</span>
            </a>
          </div>
          <h1 className="font-bold text-sm">Panel de Administración</h1>
          <button
            onClick={activeTab === "schedule" ? saveSchedule : saveSettings}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saved ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Guardando..." : saved ? "¡Guardado!" : "Guardar"}
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {/* GENERAL TAB */}
          {activeTab === "general" && (
            <motion.div
              key="general"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl bg-card border border-border/30">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Radio className="w-5 h-5 text-primary" />
                  Configuración del Stream
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      URL del Stream
                    </label>
                    <input
                      type="url"
                      value={settings.streamUrl || ""}
                      onChange={(e) =>
                        setSettings({ ...settings, streamUrl: e.target.value })
                      }
                      placeholder="https://streaming.example.com/radio"
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Nombre de la Radio
                      </label>
                      <input
                        type="text"
                        value={settings.stationName || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, stationName: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Frecuencia
                      </label>
                      <input
                        type="text"
                        value={settings.frequency || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, frequency: e.target.value })
                        }
                        placeholder="107.5"
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/30">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" />
                  App Móvil
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      URL de descarga de la App (Google Play / App Store)
                    </label>
                    <input
                      type="url"
                      value={settings.appDownloadUrl || ""}
                      onChange={(e) =>
                        setSettings({ ...settings, appDownloadUrl: e.target.value })
                      }
                      placeholder="https://play.google.com/store/apps/details?id=..."
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Si completás este campo, se mostrará la sección &quot;Descargá nuestra App&quot; en la página principal. Dejalo vacío para ocultarla.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/30">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Contacto
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Número de WhatsApp (con código de país, sin +)
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappNumber || ""}
                      onChange={(e) =>
                        setSettings({ ...settings, whatsappNumber: e.target.value })
                      }
                      placeholder="5491122334455"
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Teléfono
                      </label>
                      <input
                        type="text"
                        value={settings.phone || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, phone: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.email || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      value={settings.location || ""}
                      onChange={(e) =>
                        setSettings({ ...settings, location: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        URL Instagram
                      </label>
                      <input
                        type="url"
                        value={settings.instagram || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, instagram: e.target.value })
                        }
                        placeholder="https://instagram.com/..."
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        URL Facebook
                      </label>
                      <input
                        type="url"
                        value={settings.facebook || ""}
                        onChange={(e) =>
                          setSettings({ ...settings, facebook: e.target.value })
                        }
                        placeholder="https://facebook.com/..."
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* MEDIA TAB */}
          {activeTab === "media" && (
            <motion.div
              key="media"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {[
                {
                  type: "logo",
                  title: "Logo de la Radio",
                  desc: "Se muestra en la navegación, hero y favicon",
                  current: "/station-logo.png",
                },
                {
                  type: "hero",
                  title: "Imagen del Hero",
                  desc: "Banner principal de la página de inicio",
                  current: "/hero-banner.png",
                },
                {
                  type: "about",
                  title: "Imagen Sobre Nosotros",
                  desc: "Imagen en la sección 'Sobre Nosotros'",
                  current: "/about-bg.png",
                },
                {
                  type: "favicon",
                  title: "Favicon",
                  desc: "Ícono que se muestra en la pestaña del navegador",
                  current: "/station-logo.png",
                },
              ].map((item) => (
                <div
                  key={item.type}
                  className="p-6 rounded-2xl bg-card border border-border/30"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-24 h-24 rounded-xl bg-muted/30 border border-border/30 overflow-hidden shrink-0 flex items-center justify-center">
                      <img
                        src={item.current}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.desc}
                      </p>
                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors cursor-pointer">
                        {uploading === item.type ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                        {uploading === item.type
                          ? "Subiendo..."
                          : "Subir desde dispositivo"}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUpload(file, item.type);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* SEO TAB */}
          {activeTab === "seo" && (
            <motion.div
              key="seo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 rounded-2xl bg-card border border-border/30 space-y-4"
            >
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Configuración SEO
              </h2>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Título SEO
                </label>
                <input
                  type="text"
                  value={settings.seoTitle || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, seoTitle: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Descripción SEO
                </label>
                <textarea
                  value={settings.seoDescription || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, seoDescription: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Palabras clave (separadas por coma)
                </label>
                <input
                  type="text"
                  value={settings.seoKeywords || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, seoKeywords: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                />
              </div>
            </motion.div>
          )}

          {/* SCHEDULE TAB */}
          {activeTab === "schedule" && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Programación
                </h2>
                <button
                  onClick={addProgram}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Agregar
                </button>
              </div>

              {programs.length === 0 && (
                <div className="p-8 rounded-2xl bg-muted/30 border border-border/30 text-center">
                  <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No hay programas. Hacé clic en &ldquo;Agregar&rdquo; para crear uno.
                  </p>
                </div>
              )}

              {dayOptions.map((dayOption) => {
                const dayPrograms = programs.filter(
                  (p) => p.day === dayOption.value
                );
                if (dayPrograms.length === 0) return null;

                return (
                  <div key={dayOption.value}>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                      {dayOption.label}
                    </h3>
                    <div className="space-y-3">
                      {dayPrograms.map((prog, idx) => {
                        const globalIdx = programs.indexOf(prog);
                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-card border border-border/30"
                          >
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                                    Horario
                                  </label>
                                  <input
                                    type="text"
                                    value={prog.time}
                                    onChange={(e) =>
                                      updateProgram(
                                        globalIdx,
                                        "time",
                                        e.target.value
                                      )
                                    }
                                    placeholder="06:00 - 08:00"
                                    className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border/50 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                                    Nombre
                                  </label>
                                  <input
                                    type="text"
                                    value={prog.name}
                                    onChange={(e) =>
                                      updateProgram(
                                        globalIdx,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Nombre del programa"
                                    className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border/50 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                                    Día
                                  </label>
                                  <select
                                    value={prog.day}
                                    onChange={(e) =>
                                      updateProgram(
                                        globalIdx,
                                        "day",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border/50 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                  >
                                    {dayOptions.map((d) => (
                                      <option key={d.value} value={d.value}>
                                        {d.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <button
                                onClick={() => removeProgram(globalIdx)}
                                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-muted-foreground mb-1">
                                Descripción
                              </label>
                              <input
                                type="text"
                                value={prog.description}
                                onChange={(e) =>
                                  updateProgram(
                                    globalIdx,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="Descripción del programa"
                                className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border/50 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                              />
                            </div>
                            <div className="flex gap-3 mt-3">
                              <div className="flex-1">
                                <label className="block text-xs font-medium text-muted-foreground mb-1">
                                  Ícono
                                </label>
                                <select
                                  value={prog.icon}
                                  onChange={(e) =>
                                    updateProgram(
                                      globalIdx,
                                      "icon",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border/50 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                >
                                  {iconOptions.map((i) => (
                                    <option key={i} value={i}>
                                      {i}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex-1">
                                <label className="block text-xs font-medium text-muted-foreground mb-1">
                                  Color
                                </label>
                                <select
                                  value={prog.color}
                                  onChange={(e) =>
                                    updateProgram(
                                      globalIdx,
                                      "color",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border/50 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                >
                                  {colorOptions.map((c) => (
                                    <option key={c.value} value={c.value}>
                                      {c.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* TESTIMONIOS TAB */}
          {activeTab === "testimonios" && (
            <motion.div
              key="testimonios"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <h2 className="font-bold text-lg flex items-center gap-2 mb-2">
                <MessageSquareHeart className="w-5 h-5 text-primary" />
                Testimonios
              </h2>

              {testimonies.length === 0 && (
                <div className="p-8 rounded-2xl bg-muted/30 border border-border/30 text-center">
                  <MessageSquareHeart className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No hay testimonios aún.
                  </p>
                </div>
              )}

              {/* Pending testimonies */}
              {testimonies.filter((t) => !t.approved).length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-amber-600 mb-2 uppercase tracking-wider">
                    Pendientes de aprobación
                  </h3>
                  <div className="space-y-3">
                    {testimonies
                      .filter((t) => !t.approved)
                      .map((testimony) => (
                        <div
                          key={testimony.id}
                          className="p-4 rounded-2xl bg-amber-50 border border-amber-200"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold text-xs shrink-0">
                                  {testimony.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-semibold text-sm">
                                    {testimony.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(testimony.createdAt).toLocaleDateString("es-AR", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm mt-2 leading-relaxed">
                                {testimony.message}
                              </p>
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              <button
                                onClick={() => approveTestimony(testimony.id, true)}
                                className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition-colors"
                                title="Aprobar"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteTestimony(testimony.id)}
                                className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Approved testimonies */}
              {testimonies.filter((t) => t.approved).length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-emerald-600 mb-2 uppercase tracking-wider">
                    Aprobados (visibles en el sitio)
                  </h3>
                  <div className="space-y-3">
                    {testimonies
                      .filter((t) => t.approved)
                      .map((testimony) => (
                        <div
                          key={testimony.id}
                          className="p-4 rounded-2xl bg-card border border-border/30"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                  {testimony.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-semibold text-sm">
                                    {testimony.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(testimony.createdAt).toLocaleDateString("es-AR", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm mt-2 leading-relaxed">
                                {testimony.message}
                              </p>
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              <button
                                onClick={() => approveTestimony(testimony.id, false)}
                                className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
                                title="Desaprobar"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteTestimony(testimony.id)}
                                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" className="hidden" />
    </div>
  );
}
