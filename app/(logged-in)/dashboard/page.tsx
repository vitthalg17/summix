import { getSummaries, getDailyUsageCount } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";
import EmptySummary from "@/components/summaries/empty-summary";

export default async function DashboardPage() {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
        redirect('/sign-in');
    }
    const summaries = await getSummaries(userId);
    const dailyUsage = await getDailyUsageCount(userId);
    
    // JSON-LD structured data for dashboard page
    const dashboardJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Dashboard - Your PDF Summaries",
        "description": "Manage and access your PDF summaries. View your document analysis history and create new summaries.",
        "url": "https://summix.vitthalgoel.com/dashboard",
        "mainEntity": {
            "@type": "CollectionPage",
            "name": "PDF Summaries Collection",
            "description": `Collection of ${summaries.length} PDF summaries`,
            "numberOfItems": summaries.length
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
                    "name": "Dashboard",
                    "item": "https://summix.vitthalgoel.com/dashboard"
                }
            ]
        },
        "potentialAction": {
            "@type": "CreateAction",
            "name": "Create New Summary",
            "target": "https://summix.vitthalgoel.com/upload",
            "description": "Upload a new PDF to create a summary"
        },
        "about": {
            "@type": "SoftwareApplication",
            "name": "Summix Dashboard",
            "applicationCategory": "ProductivityApplication",
            "description": "Dashboard for managing PDF summaries and document analysis"
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
                    __html: JSON.stringify(dashboardJsonLd)
                }}
            />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Your Summaries</h1>
                        <p className="text-muted-foreground mt-1">Manage your PDF summaries</p>
                    </div>
                    <Button variant={'link'} className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 group hover:no-underline">
                        <Link href="/upload" className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Create New Summary
                        </Link>
                    </Button>
                </div>

                {/* Usage limit notification */}
                {dailyUsage >= 3 && (
                    <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <div className="flex items-center gap-2 text-destructive">
                            <FileText className="w-5 h-5" />
                            <p className="font-medium">Daily limit reached</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            You've used all 3 free summaries today. Come back tomorrow for more!
                        </p>
                    </div>
                )}

                {/* Summaries grid */}
                                 {summaries.length === 0 ? (
                     <EmptySummary />
                 ) : (
                     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                         {summaries.map((summary: any) => (
                             <SummaryCard key={summary.id} summary={summary} />
                         ))}
                     </div>
                 )}
            </div>
        </>
    );
}