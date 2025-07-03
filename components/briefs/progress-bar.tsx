import { cn } from '@/lib/utils';

interface ProgressBarProps {
  sections: { title: string; points: string[] }[];
  currentSection: number;
}

export function ProgressBar({ sections, currentSection }: ProgressBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-xs pt-4 pb-2 border-b border-rose-50/10">
      <div className="px-4 flex gap-1.5">
        {sections.map((_, index) => (
          <div
            key={index}
            className={cn(
              'h-1.5 flex-1 rounded-full bg-emerald-500/10 overflow-hidden',
            )}
          >
            <div
              className={cn(
                'h-full bg-linear-to-r from-emerald-200 to-emerald-600 transition-all duration-500',
                index === currentSection
                  ? 'w-full'
                  : currentSection > index
                  ? 'w-full opacity-10'
                  : 'w-0'
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}