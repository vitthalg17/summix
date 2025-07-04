'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import NavLink from '@/components/common/nav-link';
import { ThemeToggle } from '@/components/common/theme-toggle';

export default function Header() {
    const { user } = useUser();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <NavLink href="/" className="mr-6 flex items-center space-x-2 duration-200 ease-in-out">
                        <img 
                            src="/sum.png" 
                            alt="Sum icon" 
                            className="w-6 h-6 lg:w-8 lg:h-8 animate-spin-slow"
                        />
                        <span className="font-extrabold lg:text-xl text-foreground">
                            Summix
                        </span>
                    </NavLink>
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="flex gap-4 lg:gap-8 items-center">
                        <SignedIn>
                            <NavLink href="/dashboard">Your Summaries</NavLink>
                            <NavLink href="/upload">Upload a PDF</NavLink>
                        </SignedIn>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <SignedIn>
                        <div className="flex items-center gap-3 px-3 py-2 border-2 border-dashed border-muted-foreground/30 rounded-lg">
                            {user?.firstName && (
                                <span className="text-sm font-medium text-foreground hidden sm:block">
                                    {user.firstName}
                                </span>
                            )}
                            <UserButton />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <NavLink href="/sign-in">Sign In</NavLink>
                    </SignedOut>
                </div>
            </div>
        </header>
    );
}