import { getSummaryById } from '@/lib/summaries';
import { currentUser } from '@clerk/nextjs/server';
import { SummaryHeader } from '@/components/briefs/summary-header';
import SourceInfo from '@/components/briefs/source-info';
import { redirect } from 'next/navigation';
import SummaryViewer from '@/components/briefs/summary-viewer';

export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    redirect('/sign-in');
  }

  const summary = await getSummaryById(params.id);
  
  if (!summary) {
    redirect('/dashboard');
  }

  const { title, summary_text, file_name, original_file_url, created_at, word_count } = summary;
  const readingTime = Math.ceil((word_count || 0) / 200);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="space-y-8">
        {/* Header */}
        <SummaryHeader title={title} createdAt={created_at} readingTime={readingTime} />

        {/* Source Info */}
        <SourceInfo
          fileName={file_name}
          originalFileUrl={original_file_url}
          title={title}
          summaryText={summary_text}
          createdAt={created_at}
        />

        {/* Summary Viewer */}
        <div className="flex justify-center">
          <SummaryViewer summary={summary.summary_text} />
        </div>
      </div>
    </div>
  );
}
