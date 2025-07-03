import { getSummaries, getDailyUsageCount } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCard from "@/components/briefs/summary-card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";
import EmptySummary from "@/components/briefs/empty-summary";

export default async function DashboardPage() {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
        redirect('/sign-in');
    }
    const summaries = await getSummaries(userId);
    const dailyUsage = await getDailyUsageCount(userId);
    return (
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
            {(dailyUsage >= 3) && (
                <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-lg dark:border-red-800 dark:bg-red-900/20">
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <div>
                            <h3 className="font-semibold text-red-800 dark:text-red-200">Daily limit reached</h3>
                            <p className="text-sm text-red-600 dark:text-red-300">
                                You've used all 3 daily summaries. Your limit resets tomorrow.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Summaries grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {summaries.length > 0 ? (
                    summaries.map((summary: any) => (
                        <SummaryCard key={summary.id} summary={summary} />
                    ))
                ) : (
                    <div className="col-span-full">
                        <EmptySummary />
                    </div>
                )}
            </div>
        </div>
    );
}