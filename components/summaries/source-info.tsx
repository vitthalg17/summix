import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { DownloadSummaryButton } from "./download-summary-button";

export function SourceInfo({
  fileName,
  originalFileUrl,
  title,
  summaryText,
  createdAt,
}: {
  fileName: string;
  originalFileUrl?: string;
  title?: string;
  summaryText?: string;
  createdAt?: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <FileText className="h-4 w-4 text-primary" />
        <span>Source: {fileName}</span>
      </div>
      <div className="flex gap-2">
        <DownloadSummaryButton title={title} summaryText={summaryText} fileName={fileName} createdAt={createdAt} />
      </div>
    </div>
  );
}

export default SourceInfo;