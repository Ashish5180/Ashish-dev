import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashish Yaduvanshi | Software Development Engineer Portfolio",
  description: "Portfolio of Ashish Yaduvanshi, a Software Development Engineer specializing in building full-stack digital experiences with React, Next.js, and modern web technologies.",
  keywords: ["Software Engineer", "Frontend Developer", "Full Stack Developer", "React Developer", "Next.js Portfolio", "Ashish Yaduvanshi"],
  authors: [{ name: "Ashish Yaduvanshi" }],
  openGraph: {
    title: "Ashish Yaduvanshi | SDE Portfolio",
    description: "Software Development Engineer — Portfolio & Projects",
    url: "https://ashishyaduvanshi.com", // Placeholder, you should update this
    siteName: "Ashish Yaduvanshi Portfolio",
    images: [
      {
        url: "/og-image.png", // Make sure to add an OG image in public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Yaduvanshi | SDE Portfolio",
    description: "Software Development Engineer — Portfolio & Projects",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://ashishyaduvanshi.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased`} style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ashish Yaduvanshi",
              "url": "https://ashishyaduvanshi.com",
              "jobTitle": "Software Development Engineer",
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "University Name" // Replace with actual
              },
              "sameAs": [
                "https://github.com/ashishyaduvanshi",
                "https://linkedin.com/in/ashishyaduvanshi"
              ]
            })
          }}
        />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
