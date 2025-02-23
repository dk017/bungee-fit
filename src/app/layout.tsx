import { Header } from "../components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Footer } from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bungeefitnessnear.me"),
  title: {
    default: "BungeeFitnessNear.me - Find Bungee Fitness Studios Near You",
    template: "%s | BungeeFitnessNear.me",
  },
  description:
    "Discover bungee fitness studios in your area. Compare studios, read reviews, and start your fitness journey today!",
  keywords: [
    "bungee fitness",
    "fitness studios",
    "workout",
    "exercise",
    "low impact fitness",
  ],
  authors: [{ name: "BungeeFitnessNear.me" }],
  creator: "BungeeFitnessNear.me",
  publisher: "BungeeFitnessNear.me",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
          strategy="beforeInteractive"
          async
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
