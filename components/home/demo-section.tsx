import { Bot } from "lucide-react";
import BriefViewer from "@/components/briefs/summary-viewer";

const DEMO_SUMMARY = `# Document Overview
• 📌 This is a comprehensive analysis of modern web development practices
• 📊 Based on extensive research and industry standards

# Key Findings
• 🎯 React remains the most popular frontend framework
• 💡 Next.js is becoming the standard for React applications
• 🚀 Performance optimization is a top priority

# Technical Details
• ⚡ Server-side rendering improves initial load times
• 🔄 Incremental Static Regeneration reduces build times
• 🛠️ API routes simplify backend integration

# Best Practices
• ✅ Use TypeScript for better type safety
• 🎨 Implement responsive design principles
• 🔒 Follow security best practices`;

export default function DemoSection() {
    return (
        <section className="py-16 sm:py-24 bg-muted/30">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full">
                            <Bot className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Briefly transforms <span className="text-primary">documents into insights</span> — in seconds!
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground mb-4">
                        Upload any PDF and watch our AI extract the most important information, 
                        saving you hours of reading time while ensuring you never miss critical details.
                    </p>
                    
                    <div className="mt-12 flex justify-center">
                        <BriefViewer 
                            summary={DEMO_SUMMARY}
                            metadata={{
                                title: "Modern Web Development Practices",
                                fileName: "demo.pdf",
                                wordCount: 120
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}