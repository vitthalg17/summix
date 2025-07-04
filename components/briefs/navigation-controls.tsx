'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationControlsProps {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  onSectionSelect: (index: number) => void;
}

export function NavigationControls({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  onSectionSelect,
}: NavigationControlsProps) {
  return (
    <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4 px-4">
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        disabled={currentSection === 0}
        className={cn(
          'rounded-full w-12 h-12 transition-all duration-200 bg-primary hover:bg-primary/80 backdrop-blur-xs border border-primary/10',
          currentSection === 0 ? 'opacity-50' : 'hover:bg-primary/20'
        )}
      >
        <Minus className="w-5 h-5 text-white hover:text-red-400 transition-colors" />
      </Button>

      {/* Section Dots */}
      <div className="flex gap-2">
        {Array.from({ length: totalSections }, (_, i) => (
          <button
            key={i}
            onClick={() => onSectionSelect(i)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-200',
              i === currentSection
                ? 'bg-primary'
                : 'bg-primary/20 hover:bg-primary/30'
            )}
          />
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={currentSection === totalSections - 1}
        className={cn(
          'rounded-full w-12 h-12 transition-all duration-200 bg-primary hover:bg-primary/80 backdrop-blur-xs border border-primary/10',
          currentSection === totalSections - 1 ? 'opacity-50' : 'hover:bg-primary/20'
        )}
      >
        <Plus className="w-5 h-5 text-white hover:text-red-400 transition-colors" />
      </Button>
    </div>
  );
}
