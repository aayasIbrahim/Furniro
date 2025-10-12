import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProvidersClient from "@/components/ProviderClients";
import NavbarClient from "@/components/NavClient";
import FooterClient from "@/components/FooterClient";

// Google Fonts with fallback
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // recommended for performance
  fallback: ["system-ui", "sans-serif"], // fallback fonts
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Funiro",
  description: "Developed by CourseFiction",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProvidersClient>
          <NavbarClient />
          <main>{children}</main>
          <FooterClient />
        </ProvidersClient>
      </body>
    </html>
  );
}
