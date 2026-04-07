import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RenderPlay - Inmersive 3D Experiences for Architects & Designers",
  description: "Con más de 4 años de experiencia, RenderPlay es tu socio confiable para servicios de renderizado arquitectónico, modelado 3D y visualización de proyectos.",
  openGraph: {
    title: "RenderPlay - Inmersive 3D Experiences for Architects & Designers",
    description: "Servicios de renderizado arquitectónico, modelado 3D y visualización de proyectos.",
    url: "https://renderplay.mx",
    locale: "en-US",
    siteName: "RenderPlay",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dqlvmeoii/image/upload/v1775541095/Sin_t%C3%ADtulo_m3hus6.webp",
      },
    ],
  },
  twitter: {
    title: "RenderPlay",
    description: "Servicios de renderizado arquitectónico, modelado 3D y visualización de proyectos.",
    images: "https://res.cloudinary.com/dqlvmeoii/image/upload/v1775541095/Sin_t%C3%ADtulo_m3hus6.webp",
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://renderplay.mx",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
