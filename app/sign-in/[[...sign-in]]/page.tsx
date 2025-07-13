import { SignIn } from '@clerk/nextjs'

export default function Page() {
  // JSON-LD structured data for sign-in page
  const signInJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sign In - Summix",
    "description": "Sign in to your Summix account to access your PDF summaries and create new ones.",
    "url": "https://summix.vitthalgoel.com/sign-in",
    "mainEntity": {
      "@type": "LoginAction",
      "name": "Sign In",
      "description": "Sign in to access your PDF summaries dashboard"
    },
    "potentialAction": {
      "@type": "LoginAction",
      "name": "User Login",
      "description": "Login to Summix account",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://summix.vitthalgoel.com/sign-in",
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
          "name": "Sign In",
          "item": "https://summix.vitthalgoel.com/sign-in"
        }
      ]
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
          __html: JSON.stringify(signInJsonLd)
        }}
      />
      <section className="flex justify-center items-center h-screen">
        <SignIn />
      </section>
    </>
  );
}