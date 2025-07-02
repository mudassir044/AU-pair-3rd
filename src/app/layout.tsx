import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Au Pair Connect | Find Your Perfect Cultural Exchange Match",
    template: "%s | Au Pair Connect",
  },
  description:
    "Connect Au Pairs with Host Families worldwide. Find your perfect cultural exchange match with our trusted platform. Safe, verified, and easy to use.",
  keywords: [
    "au pair",
    "host family",
    "cultural exchange",
    "nanny",
    "childcare",
    "international",
    "travel",
    "language exchange",
    "family matching",
  ],
  authors: [{ name: "Au Pair Connect Team" }],
  creator: "Au Pair Connect",
  publisher: "Au Pair Connect",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://au-pair-connect.netlify.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://au-pair-connect.netlify.app",
    title: "Au Pair Connect | Find Your Perfect Cultural Exchange Match",
    description:
      "Connect Au Pairs with Host Families worldwide. Find your perfect cultural exchange match with our trusted platform.",
    siteName: "Au Pair Connect",
    images: [
      {
        url: "https://images.pexels.com/photos/755049/pexels-photo-755049.jpeg",
        width: 1200,
        height: 630,
        alt: "Au Pair Connect - Cultural Exchange Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Au Pair Connect | Find Your Perfect Cultural Exchange Match",
    description:
      "Connect Au Pairs with Host Families worldwide. Find your perfect cultural exchange match with our trusted platform.",
    images: [
      "https://images.pexels.com/photos/755049/pexels-photo-755049.jpeg",
    ],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Au Pair Connect",
    description: "Connect Au Pairs with Host Families worldwide",
    url: "https://au-pair-connect.netlify.app",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://au-pair-connect.netlify.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
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
        <meta name="theme-color" content="#3b82f6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
