import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'react-hot-toast'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Rasya Rayhan | Web & Mobile Developer",
    template: "%s | Rasya Rayhan"
  },
  description: "Portfolio Muhammad Rasya Rayhan Saifullah - Siswa SMK Telkom Sidoarjo yang passionate dalam pengembangan web dan mobile. Spesialisasi dalam Next.js, React Native, Laravel, dan teknologi modern lainnya.",
  keywords: ["web developer", "mobile developer", "react", "next.js", "laravel", "react native", "portfolio", "indonesia"],
  authors: [{ name: "Muhammad Rasya Rayhan Saifullah" }],
  creator: "Muhammad Rasya Rayhan Saifullah",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://rasyarayhan.com",
    siteName: "Rasya Rayhan Portfolio",
    title: "Rasya Rayhan | Web & Mobile Developer",
    description: "Portfolio Muhammad Rasya Rayhan Saifullah - Web & Mobile Developer dari SMK Telkom Sidoarjo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rasya Rayhan Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rasya Rayhan | Web & Mobile Developer",
    description: "Portfolio Muhammad Rasya Rayhan Saifullah - Web & Mobile Developer",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}