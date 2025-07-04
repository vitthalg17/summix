import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const fontPoppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Summix - AI-Powered PDF Summarization",
  description: "Transform your PDF documents into clear, actionable insights with AI-powered summaries. Save hours of reading time with Summix.",
  keywords: ["PDF", "summarization", "AI", "document analysis", "reading", "productivity"],
  authors: [{ name: "Vitthal Goel", url: "https://vitthalgoel.com" }],
  creator: "Vitthal Goel",
  publisher: "Vitthal Goel",
  metadataBase: new URL('https://summix.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Summix - AI-Powered PDF Summarization",
    description: "Transform your PDF documents into clear, actionable insights with AI-powered summaries.",
    url: 'https://summix.app',
    siteName: 'Summix',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Summix - AI-Powered PDF Summarization',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Summix - AI-Powered PDF Summarization",
    description: "Transform your PDF documents into clear, actionable insights with AI-powered summaries.",
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/faV.png', sizes: '32x32', type: 'image/png' },
      { url: '/faV.png', sizes: '16x16', type: 'image/png' },
      { url: '/faV.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/faV.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/faV.png' },
      { rel: 'android-chrome-512x512', url: '/faV.png' },
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/faV.png" sizes="any" />
          <link rel="icon" href="/faV.png" type="image/png" />
          <link rel="apple-touch-icon" href="/faV.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#d97706" />
        </head>
        <body className={`${fontPoppins.variable} font-sans antialiased bg-background text-foreground`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col bg-background">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
