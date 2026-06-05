"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { HeroSection } from "@/components/radio/hero-section";
import { LivePlayer } from "@/components/radio/live-player";
import { ScheduleSection } from "@/components/radio/schedule-section";
import { AboutSection } from "@/components/radio/about-section";
import { ContactSection } from "@/components/radio/contact-section";
import { MobileNav, DesktopNav } from "@/components/radio/navigation";
import { Footer } from "@/components/radio/footer";

const sections = ["inicio", "envivo", "programacion", "contacto"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handlePlay = useCallback(() => {
    const el = document.getElementById("envivo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Small delay to let the section scroll into view, then simulate a click on the play button
      setTimeout(() => {
        const playBtn = el.querySelector("button");
        if (playBtn) playBtn.click();
      }, 600);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <DesktopNav activeSection={activeSection} />

      <main className="flex-1">
        <HeroSection onPlay={handlePlay} />
        <LivePlayer />
        <ScheduleSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Spacer for mobile bottom nav */}
      <div className="h-16 md:hidden" />

      <MobileNav activeSection={activeSection} />
    </div>
  );
}
