import { Sparkles } from "lucide-react";

export default function UploadHeader() {
    return (
        <div className="text-center mb-12 lg:mb-16">
            {/* Main heading */}
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-center text-foreground mb-6 leading-tight">
                Transform{' '}
                <span className="relative inline-block">
                    <span className="relative z-10 px-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        documents
                    </span>
                    <span 
                        className="absolute inset-0 bg-primary/20 -rotate-2 rounded-lg transform -skew-y-1 animate-pulse"
                        aria-hidden="true"
                    />
                </span>{' '}
                into insights
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Upload your PDF and get AI-powered summaries that highlight the most important information. 
                <span className="font-semibold text-foreground"> Save hours of reading time.</span>
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Instant Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Key Insights</span>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Smart Summaries</span>
                </div>
            </div>
        </div>
    );
} 