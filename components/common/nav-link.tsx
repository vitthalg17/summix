"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function NavLink({ href, children, className }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link href={href} className={cn("text-sm font-medium transition-colors hover:text-primary", className, isActive && "text-primary")}>
            {children}
        </Link>
    );
}
