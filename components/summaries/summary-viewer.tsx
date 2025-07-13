'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { NavigationControls } from './navigation-controls';
import { ProgressBar } from './progress-bar';
import { parseSection } from '@/utils/summary-helpers';
import { cn } from '@/lib/utils';
import ContentSection from './content-section';
import { MotionDiv } from '../common/motion-wrapper';

interface SummaryViewerProps {
  summary: string;
  metadata?: any;
}

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
      <h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">{title}</h2>
    </div>
  );
};

export function SummaryViewer({ summary, metadata }: SummaryViewerProps) {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = summary
    .split('\n# ')
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const handleNext = () => setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
  const handlePrevious = () => setCurrentSection(prev => Math.max(prev - 1, 0));
  const handleSectionSelect = (index: number) => 
    setCurrentSection(Math.min(Math.max(index, 0), sections.length - 1));

  return (
    <Card
      className={cn(
        "relative px-2 h-[500px] sm:h-[600px] lg:h-[700px]",
        "w-full xl:w-[600px] overflow-hidden",
        "bg-gradient-to-br from-background via-background/95 to-primary/5",
        "backdrop-blur-lg shadow-2xl rounded-3xl border border-primary/10"
      )}
    >
      <ProgressBar 
        sections={sections} 
        currentSection={currentSection}
      />
      
      <MotionDiv key={currentSection} initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.2, ease: "easeInOut"}} exit={{opacity: 0}} className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="px-4 sm:px-6">
          {metadata && (
            <div className="mb-8 text-sm text-muted-foreground">
              {metadata.title && <div className="font-medium">{metadata.title}</div>}
              {metadata.fileName && <div>{metadata.fileName}</div>}
              {metadata.wordCount && <div>{metadata.wordCount} words</div>}
            </div>
          )}
          
          <SectionTitle title={sections[currentSection]?.title || ''} />
          <ContentSection title={sections[currentSection]?.title || ''} points={sections[currentSection]?.points || []} />
        </div>
      </MotionDiv>

      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={handleSectionSelect}
      />
    </Card>
  );
}

export default SummaryViewer;