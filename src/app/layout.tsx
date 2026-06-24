import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Inter font update
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Abu Rayhan | Senior Full-stack Engineer",
    template: "%s | Abu Rayhan",
  },
  description:
    "Senior Full-stack Engineer specializing in building high-performance web applications, scalable architecture, and modern digital experiences.",
  keywords: [
    "Abu Rayhan",
    "Full-stack Engineer",
    "Software Engineer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Expert",
    "Portfolio",
    "FlexShip IT",
    "Software Architecture",
  ],
  authors: [{ name: "Abu Rayhan", url: "https://aburayhan.com" }],
  creator: "Abu Rayhan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aburayhan.com",
    title: "Abu Rayhan | Senior Full-stack Engineer",
    description:
      "Crafting exceptional digital solutions with precision and passion. Senior Full-stack Engineer at FlexShip IT.",
    siteName: "Abu Rayhan Portfolio",
    images: [
      {
        url: "/og-image.png", // Ensure this exists or matches your asset
        width: 1200,
        height: 630,
        alt: "Abu Rayhan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abu Rayhan | Senior Full-stack Engineer",
    description:
      "Crafting exceptional digital solutions with precision and passion.",
    creator: "@AbuRayhan1818",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

import AppChrome from "@/components/shared/AppChrome";
import { ThemeProvider } from "@/providers/theme-provider";
import MuiProvider from "@/providers/mui-provider";
import QueryProvider from "@/providers/query-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">

        {/* theme provider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MuiProvider>
            <QueryProvider>
              <AppChrome>{children}</AppChrome>
            </QueryProvider>
          </MuiProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
