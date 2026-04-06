import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Trottinette Freestyle – L’art du ride urbain",
  description: "Découvrez la trottinette freestyle ultime : légère, robuste, connectée. Conçue pour les riders qui repoussent les limites. Réservez un test dès aujourd’hui.",
  openGraph: {
    title: "Trottinette Freestyle",
    description: "L’art du ride urbain. Ultra-light, suspension pro, autonomie 35km.",
    images: [{ url: "/og-image.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-zinc-100">{children}</body>
    </html>
  );
}
