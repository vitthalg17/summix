import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";

export default function EmptySummary() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No summaries yet</h2>
            <p className="mt-2 text-muted-foreground animate-fade-in">Upload your first PDF to get started with AI-powered summaries.</p>
            <div className="mt-6">
                <Button className="bg-primary hover:bg-primary/90 transition-colors">
                    <Link href="/upload" className="flex items-center gap-2 no-underline hover:no-underline">
                        <Plus className="h-4 w-4" />
                        Create Your First Summary
                    </Link>
                </Button>
            </div>
        </div>
    );
}