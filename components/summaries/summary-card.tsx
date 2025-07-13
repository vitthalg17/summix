import { Card } from '@/components/ui/card';
import DeleteButton from './delete-button';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { cn, formatFileName } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface Summary {
    id: string;
    user_id: string;
    original_file_url: string;
    summary_text: string;
    status: string;
    title: string | null;
    file_name: string;
    created_at: string;
    updated_at: string;
}

// Removed SummaryHeader component as it's now integrated into the main card

const StatusBadge = ({ status }: { status: string }) => {
    return (
        <span
            className={cn(
                'px-3 py-1 text-xs font-medium rounded-full capitalize',
                status === 'completed'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-secondary text-secondary-foreground'
            )}
        >
            {status}
        </span>
    );
};


export default function SummaryCard({ summary }: { summary: Summary }) {
    return (
        <div>
            <Card className="relative h-full border-border hover:shadow-lg hover:scale-[1.02] transition-all duration-200 min-h-[200px]">
                <div className="absolute top-3 right-3 z-10">
                    <DeleteButton summaryId={summary.id} />
                </div>
                <Link href={`summaries/${summary.id}`} className="block p-5 h-full">
                    <div className="flex flex-col h-full">
                        <div className="flex items-start gap-3 mb-3">
                            <FileText className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                            <div className="flex-1 min-w-0 pr-8">
                                <h3 className="text-base font-semibold text-foreground leading-tight line-clamp-2 break-words">
                                    {summary.title || formatFileName(summary.original_file_url)}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1">{formatDistanceToNow(new Date(summary.created_at), { addSuffix: true })}</p>
                            </div>
                        </div>
                        
                        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed flex-1 mb-3">
                            {summary.summary_text.length > 150 ? `${summary.summary_text.substring(0, 150)}...` : summary.summary_text}
                        </p>
                        
                        <div className="mt-auto">
                            <StatusBadge status={summary.status || 'completed'} />
                        </div>
                    </div>
                </Link>
            </Card>
        </div>
    );
}