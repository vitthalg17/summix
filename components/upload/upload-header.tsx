import { Sparkles } from "lucide-react";
import { Motionspan, Motionh1, Motionh2 } from "../common/motion-wrapper";
import { buttonVariants, itemVariants } from "@/utils/constants";

export default function UploadHeader() {
    return (
        <div className="text-center mb-12 lg:mb-16">
            {/* Main heading */}
            <Motionh1 variants={itemVariants} className="font-bold py-6 text-center text-foreground">
                Turn{' '}
                <Motionspan whileHover={buttonVariants} className="relative inline-block">
                    
                    <Motionspan whileHover={buttonVariants} className="relative z-10 px-2">documents</Motionspan>
                    <Motionspan 
                        className="absolute inset-0 bg-primary/20 -rotate-2 rounded-lg transform -skew-y-1"
                        aria-hidden="true"
                    />
                </Motionspan>{' '}
                into summaries
            </Motionh1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Upload your PDF and get simple summaries. 
                <span className="font-semibold text-foreground"> Save hours of reading time.</span>
                <span className="block mt-2 text-primary font-bold"> 3 PDFs per day for free!</span>
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Fast Reading</span>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Main Points</span>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Easy Summaries</span>
                </div>
            </div>
        </div>
    );
} 