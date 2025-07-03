'use client';

import { z } from 'zod';
import UploadFormInput from '@/components/upload/upload-form-input';
import { useUploadThing } from '@/lib/uploadthing';
import { toast } from 'sonner';
import { generatePDFSummary, storePDFSummaryAction } from '@/actions/upload-actions';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const schema = z.object({
    file: z.instanceof(File, { message: 'Invalid File' })
        .refine((file) => file.size <= 8 * 1024 * 1024, { message: 'File is too large, max 8MB' })
        .refine((file) => file.type === 'application/pdf', { message: 'File must be a PDF' })
});

export default function UploadForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
        onClientUploadComplete: () => {
            console.log('uploaded successfully!');
        },
        onUploadError: (err) => {
            console.error('error occurred while uploading', err);
            toast("Error Occurred While Uploading File",{
                description: err.message,
            })
        },
        onUploadBegin: (file: string) => {
            console.log('upload has begun for', file);
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, file: File | null) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            console.log('submitted');
            
            if (!file) {
                toast("❌ No file selected", {
                    description: "Please select a PDF file to upload"
                });
                setIsLoading(false);
                return;
            }

            const validatedFields = schema.safeParse({ file });
            if (!validatedFields.success) {
                console.log(validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file');
                toast("❌ Something went wrong",{
                    description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file',
                })
                setIsLoading(false);
                return;
            }

            toast("Uploading File...",{
                description: "Please wait while we upload your file",
            })

            const resp = await startUpload([file]);
            if(!resp) {
                toast("❌ Something went wrong",{
                    description: "Please use a different file",
                })
                setIsLoading(false);
                return;
            }

            toast("✅ File uploaded successfully",{
                description: "Please wait while we process your file",
            })

            const result = await generatePDFSummary([{
                serverData: {
                    userId: resp[0].serverData.userId,
                    file: {
                        url: resp[0].serverData.file.url,
                        name: resp[0].serverData.file.name
                    }
                }
            }]);
            
            const { data = null, message = null } = result || {};

            if (data) {
                let storeResult: any;
                toast("📝 Saving PDF...", {
                    description: 'Hang tight! We are saving your summary!'
                });
                formRef.current?.reset();
                if (data.summary) {
                    storeResult = await storePDFSummaryAction(
                        data.summary,
                        resp[0].serverData.file.url,
                        data.fileName,
                        file.name
                    );
                    
                    console.log('Store result:', storeResult);
                    
                    if (storeResult.success && storeResult.id) {
                        // save the summary to the database
                        toast("✨ Summary saved!", {
                            description: 'Your summary has been saved! ✨'
                        });

                        formRef.current?.reset();
                        console.log('Redirecting to:', `/summaries/${storeResult.id}`);
                        router.push(`/summaries/${storeResult.id}`);
                    } else {
                        toast("❌ Failed to save summary", {
                            description: storeResult.message || 'Unknown error occurred'
                        });
                    }
                }
            }
            
        } catch (error) {
            console.error("Error Occurred:", error);
            formRef.current?.reset();
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <UploadFormInput onSubmit={handleSubmit} ref={formRef} isLoading={isLoading} />
        </div>
    );
}
