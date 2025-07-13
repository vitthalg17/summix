import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Sparkles, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export function SummaryHeader({ title, createdAt, readingTime }: { title: string, createdAt: string, readingTime?: number }) {
  return (
    <div className="flex gap-4 mb-4 justify-between">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Badge
            variant="secondary"
            className="relative px-4 py-1.5 text-sm font-medium bg-card/80 backdrop-blur-xs rounded-full hover:bg-card/90 transition-all duration-200 shadow-xs hover:shadow-md border border-border"
          >
            <Sparkles className="h-4 w-4 mr-1.5 text-primary" />
            AI Summary
          </Badge>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          {readingTime && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              {readingTime} min read
            </div>
          )}
        </div>
        <h1 className="text-2xl lg:text-4xl font-bold lg:tracking-tight">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>
      <div>
        <Link href="/dashboard" className="self-start no-underline hover:no-underline">
          <Button
            variant={'link'}
            size="sm"
            className="group flex items-center gap-1 sm:gap-2 hover:bg-card/80 backdrop-blur-xs rounded-full transition-all duration-200 shadow-xs hover:shadow-md border border-border bg-secondary px-2 sm:px-3"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-secondary-foreground transition-transform group-hover:translate-x-0.5" />
            <span className="text-xs sm:text-sm text-secondary-foreground font-medium no-underline hover:no-underline">
              Back <span className="hidden sm:inline">to Dashboard</span>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}