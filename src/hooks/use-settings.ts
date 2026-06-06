"use client";

import { useState, useEffect } from "react";

interface SiteSettings {
  streamUrl: string;
  stationName: string;
  frequency: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  location: string;
  appDownloadUrl: string;
}

const defaults: SiteSettings = {
  streamUrl: "https://streaming.radiostreamlive.com/radioluzsanvicente",
  stationName: "FM Luz San Vicente",
  frequency: "107.5",
  seoTitle: "FM Luz San Vicente - 107.5 MHz | Radio Cristiana",
  seoDescription: "FM Luz San Vicente, tu radio cristiana en 107.5 MHz. Música, fe y comunidad desde San Vicente.",
  seoKeywords: "FM Luz, San Vicente, Radio Cristiana, 107.5 MHz",
  whatsappNumber: "5491122334455",
  phone: "+54 9 11 XXXX-XXXX",
  email: "contacto@fmluzsanvicente.com.ar",
  instagram: "",
  facebook: "",
  location: "San Vicente, Buenos Aires, Argentina",
  appDownloadUrl: "",
};

let cachedSettings: SiteSettings | null = null;

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(cachedSettings || defaults);

  useEffect(() => {
    if (cachedSettings) return;

    fetch("/api/ctrl-radio/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          const merged = { ...defaults, ...data };
          cachedSettings = merged;
          setSettings(merged);
        }
      })
      .catch(() => {});
  }, []);

  return settings;
}
