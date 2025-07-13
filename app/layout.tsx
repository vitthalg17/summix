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
  title: "Summix - Turn PDFs into Easy Summaries",
  description: "Turn your PDFs into simple summaries. Save time reading with AI help. Get the main points fast.",
  keywords: ["PDF", "summarization", "AI", "document analysis", "reading", "productivity"],
  authors: [{ name: "Vitthal Goel", url: "https://vitthalgoel.com" }],
  creator: "Vitthal Goel",
  publisher: "Vitthal Goel",
  metadataBase: new URL('https://summix.vitthalgoel.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Summix - Turn PDFs into Easy Summaries",
    description: "Turn your PDFs into simple summaries. Save time reading with AI help.",
    url: 'https://summix.vitthalgoel.com',
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
    title: "Summix - Turn PDFs into Easy Summaries",
    description: "Turn your PDFs into simple summaries. Save time reading with AI help.",
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/sum.png', sizes: '32x32', type: 'image/png' },
      { url: '/sum.png', sizes: '16x16', type: 'image/png' },
      { url: '/sum.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/sum.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/sum.png' },
      { rel: 'android-chrome-512x512', url: '/sum.png' },
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
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href="https://summix.vitthalgoel.com" />
          <link rel="icon" href="/sum.png" sizes="any" />
          <link rel="icon" href="/sum.png" type="image/png" />
          <link rel="apple-touch-icon" href="/sum.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#c96442" />
          <script 
            src="https://seo-fixer.writesonic.com/site-audit/fixer-script/index.js" 
            id="wsAiSeoMb" 
            type="application/javascript"
            async
          ></script>
          <script 
            id="wsAiSeoInitScript" 
            type="application/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                if (typeof wsSEOfixer !== 'undefined') {
                  wsSEOfixer.configure({
                    hostURL: 'https://seo-fixer.writesonic.com',
                    siteID: '686b8ae2cdd39b00259c3d7c'
                  });
                }
              `
            }} 
          />
          
          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": "https://summix.vitthalgoel.com/#organization",
                    "name": "Summix",
                    "url": "https://summix.vitthalgoel.com",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://summix.vitthalgoel.com/sum.png"
                    },
                    "founder": {
                      "@type": "Person",
                      "name": "Vitthal Goel",
                      "url": "https://vitthalgoel.com"
                    },
                    "description": "Turn your PDFs into simple summaries. Save time reading with AI help.",
                    "sameAs": [
                      "https://vitthalgoel.com"
                    ]
                  },
                  {
                    "@type": "WebApplication",
                    "@id": "https://summix.vitthalgoel.com/#webapp",
                    "name": "Summix - Turn PDFs into Easy Summaries",
                    "url": "https://summix.vitthalgoel.com",
                    "description": "Turn your PDFs into simple summaries. Save time reading with AI help. Get the main points fast.",
                    "applicationCategory": "ProductivityApplication",
                    "operatingSystem": "Web Browser",
                    "offers": {
                      "@type": "Offer",
                      "price": "0",
                      "priceCurrency": "USD",
                      "description": "3 PDF summaries per day for free"
                    },
                    "featureList": [
                      "AI-powered PDF summarization",
                      "3 free summaries daily",
                      "Fast processing",
                      "Simple summaries",
                      "PDF upload up to 8MB"
                    ],
                    "provider": {
                      "@id": "https://summix.vitthalgoel.com/#organization"
                    }
                  },
                  {
                    "@type": "Service",
                    "@id": "https://summix.vitthalgoel.com/#service",
                    "name": "PDF Summarization Service",
                    "description": "AI-powered service that turns PDF documents into simple, easy-to-read summaries",
                    "provider": {
                      "@id": "https://summix.vitthalgoel.com/#organization"
                    },
                    "serviceType": "Document Summarization",
                    "areaServed": "Worldwide",
                    "hasOfferCatalog": {
                      "@type": "OfferCatalog",
                      "name": "PDF Summarization Plans",
                      "itemListElement": [
                        {
                          "@type": "Offer",
                          "itemOffered": {
                            "@type": "Service",
                            "name": "Free Plan"
                          },
                          "price": "0",
                          "priceCurrency": "USD",
                          "description": "3 PDF summaries per day for free"
                        }
                      ]
                    }
                  },
                  {
                    "@type": "WebSite",
                    "@id": "https://summix.vitthalgoel.com/#website",
                    "url": "https://summix.vitthalgoel.com",
                    "name": "Summix",
                    "description": "Turn your PDFs into simple summaries. Save time reading with AI help.",
                    "publisher": {
                      "@id": "https://summix.vitthalgoel.com/#organization"
                    },
                    "potentialAction": {
                      "@type": "SearchAction",
                      "target": "https://summix.vitthalgoel.com/upload",
                      "query-input": "required name=search_term_string"
                    }
                  }
                ]
              })
            }}
          />
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
