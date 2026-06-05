import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FM Luz San Vicente - 107.5 MHz | Radio Cristiana",
  description:
    "FM Luz San Vicente, tu radio cristiana en 107.5 MHz. Música, fe y comunidad desde San Vicente. Escuchanos en vivo las 24 horas.",
  keywords: [
    "FM Luz",
    "San Vicente",
    "Radio Cristiana",
    "107.5 MHz",
    "Radio en vivo",
    "Música cristiana",
  ],
  authors: [{ name: "FM Luz San Vicente" }],
  icons: {
    icon: "/station-logo.png",
  },
  openGraph: {
    title: "FM Luz San Vicente - 107.5 MHz",
    description: "Tu radio cristiana en 107.5 MHz. Música, fe y comunidad.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
