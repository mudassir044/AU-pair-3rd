import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import AuthInitializer from "@/components/auth-initializer";

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
  icons: {
    icon: "https://cdn.builder.io/api/v1/image/assets%2Fc43a92b8265a4538b0f81284c0c6d60c%2Fe6c5fc029d6c450fac4e27c1e81d6315?format=webp&width=32",
    shortcut:
      "https://cdn.builder.io/api/v1/image/assets%2Fc43a92b8265a4538b0f81284c0c6d60c%2Fe6c5fc029d6c450fac4e27c1e81d6315?format=webp&width=32",
    apple:
      "https://cdn.builder.io/api/v1/image/assets%2Fc43a92b8265a4538b0f81284c0c6d60c%2Fe6c5fc029d6c450fac4e27c1e81d6315?format=webp&width=180",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthInitializer />
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
