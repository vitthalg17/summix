'use client';

import { Button } from '@/components/ui/button';
import { Upload, FileText, CheckCircle, Sparkles, X, Cloud, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { forwardRef, useState, useRef } from 'react';

interface UploadFormInputProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, file: File | null) => void;
  isLoading: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const files = Array.from(e.dataTransfer.files);
      handleFileSelection(files);
    };

    const handleFileSelection = (files: File[]) => {
      if (files.length > 0) {
        const file = files[0];
        
        // Validate file type
        if (file.type !== 'application/pdf') {
          alert('Please select a PDF file');
          return;
        }
        
        // Validate file size (8MB)
        if (file.size > 8 * 1024 * 1024) {
          alert('File size must be less than 8MB');
          return;
        }
        
        setSelectedFile(file);
      }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      handleFileSelection(files);
    };

    const handleClick = () => {
      if (!selectedFile) {
        fileInputRef.current?.click();
      }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(e, selectedFile);
    };

    const resetForm = () => {
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    // Expose reset method to parent component
    if (ref && typeof ref === 'object' && ref.current) {
      (ref.current as any).reset = resetForm;
    }

    return (
      <div className="w-full max-w-3xl mx-auto">
        <form ref={ref} onSubmit={handleSubmit} className="space-y-8">
          {/* Custom dropzone */}
          <div>
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleClick}
              className={cn(
                "relative overflow-hidden",
                "border-2 border-dashed rounded-2xl",
                "transition-all duration-300 ease-in-out",
                "cursor-pointer",
                "w-full max-w-4xl h-96 mx-auto p-12",
                "flex flex-col items-center justify-center gap-6",
                // Default state
                "border-muted-foreground/25 bg-muted/10 hover:bg-muted/20",
                // Active drag state
                isDragActive && "border-primary bg-primary/10 scale-[1.02]",
                // File selected state
                selectedFile && "border-green-500 bg-green-50/50 dark:bg-green-900/10",
                // Loading state
                isLoading && "opacity-50 cursor-not-allowed pointer-events-none"
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileInputChange}
                className="hidden"
                disabled={isLoading}
              />
              
              {isDragActive ? (
                <div className="flex flex-col items-center gap-3 text-primary">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Upload className="w-8 h-8 animate-bounce" />
                  </div>
                  <div className="text-xl font-semibold">Drop your PDF here!</div>
                  <div className="text-sm text-muted-foreground">Release to upload</div>
                </div>
              ) : selectedFile ? (
                <div className="flex flex-col items-center gap-4 text-green-600 dark:text-green-400">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="text-xl font-semibold">File Ready!</div>
                  <div className="text-center">
                    <div className="font-medium text-foreground">{selectedFile.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {selectedFile.size ? (selectedFile.size / (1024 * 1024)).toFixed(2) : 'Unknown'} MB
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetForm();
                    }}
                    disabled={isLoading}
                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/10 mt-2"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 text-center">
                  {/* Cloud upload icon */}
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center relative">
                    <Cloud className="w-10 h-10 text-muted-foreground" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-muted-foreground translate-x-1 translate-y-1" />
                    </div>
                  </div>
                  
                  {/* Main text */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-foreground">
                      Drag and drop your file
                    </h3>
                    <p className="text-muted-foreground">
                      or click to browse (PDF up to 8MB)
                    </p>
                  </div>
                  
                  {/* File info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <File className="w-4 h-4" />
                      <span>PDF files only</span>
                    </div>
                    <div className="w-px h-4 bg-border" />
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      <span>Max 8MB</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Generate Summary Button */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              disabled={isLoading || !selectedFile}
              size="lg"
              className="px-8 py-6 text-lg font-semibold rounded-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <FileText className="w-5 h-5 mr-3 animate-spin" />
                  Processing Your PDF...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3" />
                  Generate Summary
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  }
);

UploadFormInput.displayName = 'UploadFormInput';

export default UploadFormInput;
