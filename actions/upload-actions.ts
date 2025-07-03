'use server';

import { fetchAndExtractPdfText } from '@/lib/langchain';
import { generateSummaryFromOpenAI } from '@/lib/openai';
import { generateSummaryFromDeepseek } from '@/lib/deepseek';
import { auth } from '@clerk/nextjs/server';
import { getDbConnection } from '@/lib/db';
import { formatFileNameAsTitle } from '@/utils/format-utils';
import { revalidatePath } from 'next/cache';

async function checkDailyLimit(userId: string): Promise<boolean> {
    try {
        const sql = await getDbConnection();
        // Get today's date at midnight (start of day)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // IMPORTANT: Count ONLY summaries created TODAY (credits don't stack from previous days)
        // This ensures users get exactly 3 fresh credits each day, unused credits are NOT carried over
        const result = await sql`
            SELECT COUNT(*) as count 
            FROM pdf_summaries 
            WHERE user_id = ${userId} 
            AND created_at >= ${today.toISOString()}
            AND created_at < ${tomorrow.toISOString()}
        `;
        
        const count = parseInt(result[0].count);
        // Allow up to 3 summaries per day (no credit stacking)
        return count < 3;
    } catch (error) {
        console.error('Error checking daily limit:', error);
        return false; // Default to not allowing if there's an error
    }
}

async function savePdfSummary(data: {
    userId: string;
    fileUrl: string;
    summary: string;
    title: string;
    fileName: string;
}): Promise<{id: string}> {
    //sql inserting pdf summary
    try {
        const sql = await getDbConnection();
        const result = await sql`INSERT INTO pdf_summaries (
            user_id,
            original_file_url,
            summary_text,
            title,
            file_name,
            status
        ) VALUES (
            ${data.userId},
            ${data.fileUrl},
            ${data.summary},
            ${data.title},
            ${data.fileName},
            'completed'
        ) RETURNING id`;
        return result[0] as {id: string};
    } catch (error) {
        console.error('Error saving PDF summary', error);
        throw error;
    }
}

export async function generatePDFSummary(uploadResponse: [{
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        };
    };
}]) {
    if (!uploadResponse) {
        return {
            success: false,
            message: 'File upload failed',
            data: null,
        };
    }

    const {
        serverData: {
            userId,
            file: { url: pdfUrl, name: fileName },
        },
    } = uploadResponse[0];

    if (!pdfUrl) {
        return {
            success: false,
            message: 'File upload failed',
            data: null,
        };
    }

    try {
        const processingId = Math.random().toString(36).substr(2, 9);
        console.log(`🚀 [${processingId}] Starting PDF processing for:`, fileName);
        
        // Check daily limit before processing
        const withinLimit = await checkDailyLimit(userId);
        if (!withinLimit) {
            return {
                success: false,
                message: 'Daily limit exceeded. You can create up to 3 summaries per day. Please try again tomorrow.',
                data: null,
            };
        }
        
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log(`📄 [${processingId}] PDF text extracted, generating summary...`);
        
        try {
            console.log(`🤖 [${processingId}] Calling OpenAI API for summary generation...`);
            const summary = await generateSummaryFromOpenAI(pdfText);
            console.log(`✅ [${processingId}] Summary generated successfully with OpenAI`);
            return {
                success: true,
                message: 'PDF summarized successfully',
                data: {
                    text: pdfText,
                    summary,
                    fileName,
                    userId
                }
            };
        } catch (error: any) {
            if (error instanceof Error && error.message === 'Rate limit exceeded. Please try again later.') {
                try {
                    console.log('OpenAI rate limit exceeded, falling back to DeepSeek...');
                    const summary = await generateSummaryFromDeepseek(pdfText);
                    console.log('Summary generated successfully with DeepSeek');
                    return {
                        success: true,
                        message: 'PDF summarized successfully (using DeepSeek)',
                        data: {
                            text: pdfText,
                            summary,
                            fileName,
                            userId
                        }
                    };
                } catch (deepseekError) {
                    console.error('DeepSeek API failed after OpenAI quota exceeded', deepseekError);
                    throw new Error('Failed to generate summary with available AI providers');
                }
            }
            throw error;
        }
    } catch (err) {
        console.error('Error processing PDF:', err);
        return {
            success: false,
            message: err instanceof Error ? err.message : 'Failed to process PDF',
            data: null,
        };
    }
}

export async function storePDFSummaryAction(summary: string, fileUrl: string, title: string, fileName: string) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return {
                success: false,
                message: 'User not found',
            };
        }
        
        const savedSummary = await savePdfSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName,
        });

        if (!savedSummary?.id) {
            return {
                success: false,
                message: 'Failed to save PDF summary',
            };
        }

        revalidatePath(`/summaries/${savedSummary.id}`);
        revalidatePath('/dashboard');

        return {
            success: true,
            message: 'Summary saved successfully',
            id: savedSummary.id,
        };
    } catch (error) {
        console.error('Error in storePDFSummaryAction:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Error saving PDF summary',
        };
    }
}