import { SummaryHeader } from '@/components/briefs/summary-header';
import SourceInfo from '@/components/briefs/source-info';
import SummaryViewer from '@/components/briefs/summary-viewer';

const mockSummary = {
  id: 'test-123',
  title: 'Test Document Analysis',
  summary_text: `# Executive Summary
• This document presents a comprehensive analysis of modern web development practices and their impact on user experience.
• Key findings indicate that performance optimization and accessibility remain top priorities for developers in 2024.
• The study reveals significant improvements in development tools and frameworks over the past year.

# Technical Implementation
• React 18 introduces concurrent features that improve application responsiveness and user interaction.
• Next.js 13+ with App Router provides better developer experience and performance optimizations.
• TypeScript adoption has increased by 40% among development teams, improving code quality and maintainability.

# Performance Metrics
• Average page load times decreased by 35% with the implementation of modern bundling techniques.
• Core Web Vitals scores improved across all measured applications, with 90% meeting Google's thresholds.
• Mobile performance showed the most significant improvement, with 45% faster initial content rendering.

# Best Practices & Recommendations
• Implement progressive web app features to enhance offline functionality and user engagement.
• Use automated testing frameworks to maintain code quality and reduce production bugs.
• Adopt continuous integration and deployment practices to streamline development workflows.
• Focus on accessibility standards to ensure applications are usable by all users.`,
  file_name: 'web-development-analysis.pdf',
  original_file_url: 'https://example.com/test-file.pdf',
  created_at: '2024-01-15T10:30:00Z',
  reading_time: 8
};

export default function TestSummaryPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="space-y-8">
        {/* Header */}
        <SummaryHeader
          title={mockSummary.title}
          createdAt={mockSummary.created_at}
          readingTime={mockSummary.reading_time}
        />

        {/* Source Info */}
        <SourceInfo
          fileName={mockSummary.file_name}
          originalFileUrl={mockSummary.original_file_url}
          title={mockSummary.title}
          summaryText={mockSummary.summary_text}
          createdAt={mockSummary.created_at}
        />

        {/* Summary Viewer */}
        <div className="flex justify-center">
          <SummaryViewer summary={mockSummary.summary_text} />
        </div>
      </div>
    </div>
  );
} 