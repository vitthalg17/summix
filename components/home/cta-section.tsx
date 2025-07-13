import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function CTASection() {
    return (
        <section className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Ready to get started?</span>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Turn your PDFs into 
                        <span className="text-primary"> easy summaries</span>
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Join thousands of users who save time with PDF summaries. 
                        <span className="font-semibold text-primary"> Get 3 free summaries daily!</span>
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-6">
                        <SignedIn>
                            <Button
                                asChild
                                variant="default"
                                size="lg"
                                className="bg-primary w-full min-[400px]:w-auto transition-all duration-300 hover:no-underline"
                            >
                                <Link href="/upload" className="flex items-center gap-2 !text-white">
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </Link>
                            </Button>
                        </SignedIn>
                        <SignedOut>
                            <Button
                                asChild
                                variant="default"
                                size="lg"
                                className="bg-primary w-full min-[400px]:w-auto transition-all duration-300 hover:no-underline"
                            >
                                <Link href="/sign-in" className="flex items-center gap-2 !text-white">
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </Link>
                            </Button>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </section>
    );
}
