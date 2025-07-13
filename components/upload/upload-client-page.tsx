'use client';

import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";
import BgGradient from "@/components/common/bg-gradient";
import { Badge } from "@/components/ui/badge";
import { Zap, AlertTriangle } from "lucide-react";

interface UploadClientPageProps {
    creditsLeft: number;
}

export default function UploadClientPage({ creditsLeft }: UploadClientPageProps) {
    return (
        <div className="relative isolate min-h-screen bg-background">
            {/* Background gradient */}
            <BgGradient className="from-primary/20 via-accent/10 to-secondary/20" />
            
            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
                <div className="max-w-5xl mx-auto">
                    {/* Credits display */}
                    <div className="flex justify-center mb-8">
                        <Badge
                            variant="secondary"
                            className={`px-6 py-3 text-sm font-bold rounded-full border-2 transition-all duration-300 shadow-lg ${
                                creditsLeft <= 0 
                                    ? 'bg-destructive/10 border-destructive text-destructive hover:bg-destructive/20' 
                                    : creditsLeft === 1 
                                    ? 'bg-orange-500/10 border-orange-500 text-orange-600 hover:bg-orange-500/20 dark:text-orange-400'
                                    : 'bg-primary/10 border-primary text-primary hover:bg-primary/20'
                            }`}
                        >
                            {creditsLeft <= 0 ? (
                                <>
                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                    Daily limit reached - Resets tomorrow
                                </>
                            ) : (
                                <>
                                    <Zap className="w-4 h-4 mr-2" />
                                    {creditsLeft} credit{creditsLeft === 1 ? '' : 's'} remaining today
                                </>
                            )}
                        </Badge>
                    </div>
                    
                    {/* Header */}
                    <div className="mb-12">
                        <UploadHeader />
                    </div>
                    
                    {/* Upload form */}
                    <div className="flex justify-center">
                        <UploadForm />
                    </div>
                </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
                <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000" />
                <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-accent/10 rounded-full blur-xl animate-pulse delay-500" />
            </div>
        </div>
    );
} 