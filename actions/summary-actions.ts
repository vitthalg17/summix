'use server';

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummary(summaryId: string) {
    try {
        const user = await currentUser();
        const userId = user?.id;
        if (!userId) {
            throw new Error('Unauthorized');
        }

        const sql = await getDbConnection();
        const result = await sql`
            UPDATE pdf_summaries 
            SET deleted_at = CURRENT_TIMESTAMP 
            WHERE id = ${summaryId} AND user_id = ${userId} AND deleted_at IS NULL
            RETURNING id;`;

            if (result.length> 0) {
                revalidatePath('/dashboard');
                return {
                    success: true,
                    message: 'Summary deleted successfully'
                };
            } else {
                return {
                    success: false,
                    message: 'Summary not found or unauthorized'
                };
            }
    } catch (error) {
        console.error('Error deleting summary:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to delete summary'
        };
    };
};
