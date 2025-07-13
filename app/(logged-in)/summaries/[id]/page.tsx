import { getSummaryById } from '@/lib/summaries';
import { currentUser } from '@clerk/nextjs/server';
import { SummaryHeader } from '@/components/summaries/summary-header';
import SourceInfo from '@/components/summaries/source-info';
import { redirect } from 'next/navigation';
import SummaryViewer from '@/components/summaries/summary-viewer';
import { Metadata } from 'next';

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

  // JSON-LD structured data for individual summary
  const summaryJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "name": title,
    "description": `AI-generated summary of ${file_name}`,
    "author": {
      "@type": "Person",
      "name": user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : "User"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Summix",
      "url": "https://summix.vitthalgoel.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://summix.vitthalgoel.com/sum.png"
      }
    },
    "dateCreated": created_at,
    "datePublished": created_at,
    "dateModified": created_at,
    "wordCount": word_count || 0,
    "timeRequired": `PT${readingTime}M`,
    "about": {
      "@type": "DigitalDocument",
      "name": file_name,
      "url": original_file_url,
      "encodingFormat": "application/pdf"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://summix.vitthalgoel.com/summaries/${params.id}`
    },
    "isBasedOn": {
      "@type": "DigitalDocument",
      "name": file_name,
      "encodingFormat": "application/pdf"
    },
    "genre": "Summary",
    "keywords": ["PDF summary", "document analysis", "AI summarization"],
    "inLanguage": "en",
    "text": summary_text.substring(0, 200) + "...", // First 200 chars as preview
    "abstract": `AI-generated summary of the PDF document "${file_name}". This summary extracts the key points and main ideas from the original document.`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(summaryJsonLd)
        }}
      />
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
    </>
  );
}
