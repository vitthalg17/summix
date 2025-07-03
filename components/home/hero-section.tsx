import { Button } from "@/components/ui/button";
import { BrainCircuit, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MotionSection } from "@/components/common/motion-wrapper";
import { container_values } from "@/utils/constants";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function HeroSection() {
  return (
    <MotionSection variants={container_values} className="relative mx-auto flex flex-col items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in fade-in-0 duration-1000 lg:px-12 max-w-7xl">
      <div className="flex items-center justify-center">
        <Badge
          variant="secondary"
          className="relative bg-transparent border border-primary text-primary hover:bg-primary/10 transition-colors duration-200 px-6 py-2 rounded-full font-medium animate-pulse"
        >
          <BrainCircuit className="w-6 h-6 mr-2 text-primary" />
          <p className="text-base text-primary font-bold">Powered by AI</p>
        </Badge>
      </div>
      <h1 className="font-bold py-6 text-center text-foreground">
        Find what{' '}
        <span className="relative inline-block">
          
          <span className="relative z-10 px-2">matters</span>
          <span 
            className="absolute inset-0 bg-primary/20 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          />
        </span>{' '}
        in every document
      </h1>
      <h2 className="font-bold text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-muted-foreground">
        The easiest way to summarize your PDFs
      </h2>
      <div className="flex items-center justify-center">
        <SignedIn>
          <Button
            variant={"default"}
            className="bg-primary mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 hover:no-underline font-bold transition-colors duration-200"
          >
            <Link href="/upload" className="flex gap-2 items-center !text-white">
              Get Started <ArrowRight className="w-4 h-4 animate-pulse text-white" />
            </Link>
          </Button>
        </SignedIn>
        <SignedOut>
          <Button
            variant={"default"}
            className="bg-primary mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 hover:no-underline font-bold transition-colors duration-200"
          >
            <Link href="/sign-in" className="flex gap-2 items-center !text-white">
              Get Started <ArrowRight className="w-4 h-4 animate-pulse text-white" />
            </Link>
          </Button>
        </SignedOut>
      </div>
    </MotionSection>
  );
}
