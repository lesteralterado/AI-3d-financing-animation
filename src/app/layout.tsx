import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["800"],
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  preload: false,
});

export const metadata: Metadata = {
  title: "NexusFi — The Intelligence Behind Smarter Money",
  description:
    "AI-powered financial software that automates capital, scales investments, and connects your money to the future.",
  metadataBase: new URL("https://nexusfi.example"),
  openGraph: {
    title: "NexusFi — The Intelligence Behind Smarter Money",
    description:
      "AI-powered financial software that automates capital, scales investments, and connects your money to the future.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "NexusFi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusFi — The Intelligence Behind Smarter Money",
    description:
      "AI-powered financial software that automates capital, scales investments, and connects your money to the future.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-void text-text-primary">
        {children}
      </body>
    </html>
  );
}
