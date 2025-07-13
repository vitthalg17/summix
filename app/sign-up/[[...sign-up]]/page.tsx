import { SignUp } from '@clerk/nextjs'

export default function Page() {
  // JSON-LD structured data for sign-up page
  const signUpJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sign Up - Summix",
    "description": "Create your free Summix account to start summarizing PDFs. Get 3 free summaries daily.",
    "url": "https://summix.vitthalgoel.com/sign-up",
    "mainEntity": {
      "@type": "RegisterAction",
      "name": "Sign Up",
      "description": "Create a new account to access PDF summarization features"
    },
    "potentialAction": {
      "@type": "RegisterAction",
      "name": "User Registration",
      "description": "Register for a new Summix account",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://summix.vitthalgoel.com/sign-up",
        "inLanguage": "en",
        "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://summix.vitthalgoel.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Sign Up",
          "item": "https://summix.vitthalgoel.com/sign-up"
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "name": "Free Account",
      "price": "0",
      "priceCurrency": "USD",
      "description": "3 free PDF summaries per day"
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "Summix",
      "url": "https://summix.vitthalgoel.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(signUpJsonLd)
        }}
      />
      <section className="flex justify-center items-center h-screen">
        <SignUp />
      </section>
    </>
  );
}