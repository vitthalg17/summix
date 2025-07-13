import { Bot } from "lucide-react";
import BriefViewer from "@/components/summaries/summary-viewer";
import { MotionDiv, Motionh2, Motionp, MotionSection } from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

const DEMO_SUMMARY = `# Document Overview
• 📌 This is a simple guide to web development
• 📊 Based on good research and common practices

# Key Findings
• 🎯 React is the most popular web framework
• 💡 Next.js is becoming the top choice for React apps
• 🚀 Making websites fast is very important

# Technical Details
• ⚡ Server-side rendering makes pages load faster
• 🔄 Smart rebuilding saves time when making changes
• 🛠️ API routes make backend work easier

# Best Practices
• ✅ Use TypeScript for better code safety
• 🎨 Make designs work on all devices
• 🔒 Follow good security rules`;

export default function DemoSection() {
    return (
        <MotionSection variants={containerVariants} initial="hidden" animate="visible" className="py-16 sm:py-24 bg-muted/30">
            <MotionDiv className="mx-auto max-w-7xl px-6 lg:px-8">
                <MotionDiv className="mx-auto max-w-3xl text-center">
                    <MotionDiv className="flex justify-center mb-8">
                        <MotionDiv className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full">
                            <Bot className="w-6 h-6 text-primary" />
                        </MotionDiv>
                    </MotionDiv>
                    <Motionh2 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                    >
                        Summix turns <span className="text-primary">documents into simple summaries</span> — in seconds!
                    </Motionh2>
                    <Motionp variants={itemVariants} className="mt-6 text-lg leading-8 text-muted-foreground mb-4">
                        Upload any PDF and get the main points fast. 
                        Save hours of reading time. Never miss key details.
                    </Motionp>
                    
                    <MotionDiv initial={{opacity: 0 }}
                        whileInView={{opacity: 1 }}
                        transition={{ duration: 0.5}} className="mt-12 flex justify-center">
                        <BriefViewer 
                            summary={DEMO_SUMMARY}
                            metadata={{
                                title: "Modern Web Development Practices",
                                fileName: "demo.pdf",
                                wordCount: 120
                            }}
                        />
                    </MotionDiv>
                </MotionDiv>
            </MotionDiv>
        </MotionSection>
    );
}