"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { HeroSection } from "@/components/radio/hero-section";
import { LivePlayer } from "@/components/radio/live-player";
import { AboutSection } from "@/components/radio/about-section";
import { ContactSection } from "@/components/radio/contact-section";
import { ScheduleOverlay } from "@/components/radio/schedule-overlay";
import { MobileNav, DesktopNav } from "@/components/radio/navigation";
import { Footer } from "@/components/radio/footer";

const sections = ["inicio", "envivo", "contacto"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [scheduleOpen, setScheduleOpen] = useState(false);
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
      setTimeout(() => {
        const playBtn = el.querySelector("button");
        if (playBtn) playBtn.click();
      }, 600);
    }
  }, []);

  const handleShowSchedule = useCallback(() => {
    setScheduleOpen(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <DesktopNav activeSection={activeSection} onScheduleClick={handleShowSchedule} />

      <main className="flex-1">
        <HeroSection onPlay={handlePlay} onShowSchedule={handleShowSchedule} />
        <LivePlayer />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Spacer for mobile bottom nav */}
      <div className="h-16 md:hidden" />

      <MobileNav activeSection={activeSection} onScheduleClick={handleShowSchedule} />

      {/* Schedule overlay */}
      <ScheduleOverlay isOpen={scheduleOpen} onClose={() => setScheduleOpen(false)} />
    </div>
  );
}
