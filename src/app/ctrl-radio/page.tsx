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
  Eye,
  EyeOff,
  Lock,
  LogOut,
  KeyRound,
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
  // Estados de sesión
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Estados de cambio de contraseña
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState("");
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

  // Estados de administración del sitio
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Comprobar la sesión al montar el componente
  useEffect(() => {
    fetch("/api/ctrl-radio/settings")
      .then((r) => {
        if (r.status === 401) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
          return r.json();
        }
      })
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setSettings({ ...defaultSettings, ...data });
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  // Cargar datos restantes si está autenticado
  useEffect(() => {
    if (isLoggedIn !== true) return;

    // Cargar programación
    fetch("/api/ctrl-radio/schedule")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPrograms(data);
        }
      })
      .catch(() => {});

    // Cargar testimonios
    fetch("/api/ctrl-radio/testimonios")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setTestimonies(data);
      })
      .catch(() => {});
  }, [isLoggedIn]);

  // Manejar el envío de Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    try {
      const res = await fetch("/api/ctrl-radio/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginPassword, rememberMe }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsLoggedIn(true);
        // Limpiar contraseña de login
        setLoginPassword("");
      } else {
        setLoginError(data.error || "Ocurrió un error al iniciar sesión");
      }
    } catch {
      setLoginError("Error de red. Intente nuevamente.");
    } finally {
      setLoggingIn(false);
    }
  };

  // Manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await fetch("/api/ctrl-radio/logout", { method: "POST" });
      setIsLoggedIn(false);
      // Limpiar estados locales de administración
      setPrograms([]);
      setTestimonies([]);
      setSettings(defaultSettings);
    } catch {
      alert("Error al cerrar sesión");
    }
  };

  // Guardar configuraciones generales
  const saveSettings = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/ctrl-radio/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.status === 401) {
        setIsLoggedIn(false);
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Error al guardar");
    }
    setSaving(false);
  };

  // Subir imagen (Favicon, Logo, Hero, etc.)
  const handleUpload = async (file: File, type: string) => {
    setUploading(type);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const res = await fetch("/api/ctrl-radio/upload", {
        method: "POST",
        body: formData,
      });
      if (res.status === 401) {
        setIsLoggedIn(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        
        // Recargar la página o recargar configuraciones para actualizar las imágenes
        fetch("/api/ctrl-radio/settings")
          .then((r) => r.json())
          .then((data) => {
            if (data && Object.keys(data).length > 0) {
              setSettings({ ...defaultSettings, ...data });
            }
          });
      }
    } catch {
      alert("Error al subir imagen");
    }
    setUploading(null);
  };

  // Crear un nuevo espacio para un programa
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

  // Guardar la grilla de programación
  const saveSchedule = async () => {
    setSaving(true);
    try {
      // Eliminar programas antiguos
      const existingRes = await fetch("/api/ctrl-radio/schedule");
      if (existingRes.status === 401) {
        setIsLoggedIn(false);
        return;
      }
      const existing = await existingRes.json();
      
      for (const p of existing) {
        if (p.id) {
          await fetch(`/api/ctrl-radio/schedule?id=${p.id}`, { method: "DELETE" });
        }
      }
      // Re-crear programas nuevos
      for (const prog of programs) {
        await fetch("/api/ctrl-radio/schedule", {
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

  // Aprobar o desaprobar testimonio
  const approveTestimony = async (id: string, approved: boolean) => {
    try {
      const res = await fetch("/api/ctrl-radio/testimonios", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved }),
      });
      if (res.status === 401) {
        setIsLoggedIn(false);
        return;
      }
      setTestimonies((prev) =>
        prev.map((t) => (t.id === id ? { ...t, approved } : t))
      );
    } catch {
      alert("Error al actualizar testimonio");
    }
  };

  // Eliminar testimonio de forma permanente
  const deleteTestimony = async (id: string) => {
    try {
      const res = await fetch(`/api/ctrl-radio/testimonios?id=${id}`, { method: "DELETE" });
      if (res.status === 401) {
        setIsLoggedIn(false);
        return;
      }
      setTestimonies((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Error al eliminar testimonio");
    }
  };

  // Cambiar contraseña de administrador
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordError("");
    setChangePasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setChangePasswordError("Las nuevas contraseñas no coinciden");
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch("/api/ctrl-radio/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setChangePasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        if (res.status === 401 && data.error === "No autorizado") {
          setIsLoggedIn(false);
          return;
        }
        setChangePasswordError(data.error || "Ocurrió un error al cambiar la contraseña");
      }
    } catch {
      setChangePasswordError("Error al procesar la solicitud");
    } finally {
      setChangingPassword(false);
    }
  };

  // Renderizar estado de carga de sesión inicial
  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-sm text-muted-foreground">Comprobando sesión...</p>
      </div>
    );
  }

  // VISTA 1: PANTALLA DE INICIO DE SESIÓN
  if (isLoggedIn === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background decorative blurs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-card border border-border/30 rounded-3xl p-8 shadow-2xl relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Acceso Privado</h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Introduce la contraseña de administración de FM Luz
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-11 py-3 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <label className="relative flex items-center gap-2.5 cursor-pointer select-none text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md border-border bg-muted/30 text-primary focus:ring-primary/20"
                />
                Mantener sesión iniciada
              </label>
            </div>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2"
              >
                <X className="w-4 h-4 shrink-0" />
                {loginError}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
            >
              {loggingIn ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Ingresar al Panel"
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-border/30 pt-6">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Volver al sitio web principal
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // VISTA 2: PANEL DE ADMINISTRACIÓN PRINCIPAL
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
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all border border-border/30"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
            <button
              onClick={activeTab === "schedule" ? saveSchedule : saveSettings}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50 shadow-sm"
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
                onClick={() => {
                  setActiveTab(tab.id);
                  setChangePasswordError("");
                  setChangePasswordSuccess(false);
                }}
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
              {/* Stream config */}
              <div className="p-6 rounded-2xl bg-card border border-border/30 shadow-sm">
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

              {/* Mobile App */}
              <div className="p-6 rounded-2xl bg-card border border-border/30 shadow-sm">
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

              {/* Security / Change Password */}
              <div className="p-6 rounded-2xl bg-card border border-border/30 shadow-sm">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-primary" />
                  Seguridad y Acceso
                </h2>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Contraseña Actual
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Escribe tu contraseña actual"
                      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-mono"
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Confirmar Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repite la nueva contraseña"
                        className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-mono"
                        required
                      />
                    </div>
                  </div>

                  {changePasswordError && (
                    <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                      <X className="w-4 h-4 shrink-0" />
                      {changePasswordError}
                    </div>
                  )}

                  {changePasswordSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0" />
                      ¡Contraseña cambiada exitosamente!
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={changingPassword}
                      className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl text-xs font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {changingPassword && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      Cambiar Contraseña
                    </button>
                  </div>
                </form>
              </div>

              {/* Contact config */}
              <div className="p-6 rounded-2xl bg-card border border-border/30 shadow-sm">
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
                  className="p-6 rounded-2xl bg-card border border-border/30 shadow-sm"
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
                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors cursor-pointer border border-primary/20">
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
              className="p-6 rounded-2xl bg-card border border-border/30 space-y-4 shadow-sm"
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
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-medium hover:bg-primary/20 transition-colors border border-primary/20"
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
                            className="p-4 rounded-2xl bg-card border border-border/30 shadow-sm"
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
                          className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold text-xs shrink-0 border border-amber-500/10">
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
                              <p className="text-sm mt-2 leading-relaxed text-foreground/80">
                                {testimony.message}
                              </p>
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              <button
                                onClick={() => approveTestimony(testimony.id, true)}
                                className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 transition-colors border border-emerald-500/10"
                                title="Aprobar"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteTestimony(testimony.id)}
                                className="p-2 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors border border-destructive/10"
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
                          className="p-4 rounded-2xl bg-card border border-border/30 shadow-sm"
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
                              <p className="text-sm mt-2 leading-relaxed text-foreground/80">
                                {testimony.message}
                              </p>
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              <button
                                onClick={() => approveTestimony(testimony.id, false)}
                                className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors border border-border/30"
                                title="Desaprobar"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteTestimony(testimony.id)}
                                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors border border-border/30"
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
