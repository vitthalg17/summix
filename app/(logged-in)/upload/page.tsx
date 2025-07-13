import UploadClientPage from "@/components/upload/upload-client-page";
import { getDailyUsageCount } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Upload() {
    const user = await currentUser();
    const userId = user?.id;
    
    if (!userId) {
        redirect('/sign-in');
    }
    
    const dailyUsage = await getDailyUsageCount(userId);
    const creditsLeft = 3 - dailyUsage;
    
    // JSON-LD structured data for upload page
    const uploadJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Upload PDF - Create Summary",
        "description": "Upload your PDF document to create an AI-powered summary. Get key insights and main points extracted automatically.",
        "url": "https://summix.vitthalgoel.com/upload",
        "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "PDF Upload Tool",
            "applicationCategory": "ProductivityApplication",
            "description": "Upload and process PDF documents to generate AI-powered summaries"
        },
        "potentialAction": {
            "@type": "UploadAction",
            "name": "Upload PDF",
            "description": "Upload a PDF file to generate an AI summary",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://summix.vitthalgoel.com/upload",
                "inLanguage": "en",
                "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
            },
            "object": {
                "@type": "DigitalDocument",
                "encodingFormat": "application/pdf",
                "name": "PDF Document"
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
                    "name": "Upload",
                    "item": "https://summix.vitthalgoel.com/upload"
                }
            ]
        },
        "about": {
            "@type": "Thing",
            "name": "PDF Summarization",
            "description": "AI-powered tool for creating summaries from PDF documents"
        },
        "offers": {
            "@type": "Offer",
            "name": "Free PDF Summarization",
            "price": "0",
            "priceCurrency": "USD",
            "description": `${creditsLeft} free summaries remaining today`
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
                    __html: JSON.stringify(uploadJsonLd)
                }}
            />
            <UploadClientPage creditsLeft={creditsLeft} />
        </>
    );
}