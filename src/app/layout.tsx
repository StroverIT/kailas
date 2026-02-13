import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { GoogleAnalyticsProvider } from "@/components/GoogleAnalytics";
import { Providers } from "./providers";
import "@/index.css";

export const metadata: Metadata = {
  title: "Kailas Yogalife",
  description: "Твоето убежище в сърцето на планината",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Kailas Yogalife",
    description: "Твоето убежище в сърцето на планината",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <GoogleAnalyticsProvider />
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          {children}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
