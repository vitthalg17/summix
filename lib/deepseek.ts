import { ChatDeepSeek } from "@langchain/deepseek";
import { SUMMARY_SYSTEM_PROMPT } from "../utils/prompts";

const model = new ChatDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY,
    model: "deepseek-chat",
    temperature: 0.7,
    maxTokens: 1500,
});

// Check if API key exists
if (!process.env.DEEPSEEK_API_KEY) {
    console.warn('⚠️  Warning: DEEPSEEK_API_KEY environment variable is not set');
}

export async function generateSummaryFromDeepseek(pdfText: string) {
    try {
        console.log('🔄 Deepseek API: Starting chat completion...', { 
            textLength: pdfText.length,
            apiKeyExists: !!process.env.DEEPSEEK_API_KEY 
        });
        
        const messages = [
            {
                role: "system" as const,
                content: SUMMARY_SYSTEM_PROMPT
            },
            {
                role: "user" as const,
                content: `Please analyze and summarize the following text using the format specified above. Make sure to include practical recommendations, key terms, and a clear bottom line:\n\n${pdfText}`
            }
        ];

        const response = await model.invoke(messages);
        
        console.log('✅ Deepseek API: Chat completion successful', { 
            responseLength: response.content?.length || 0,
            responseType: typeof response.content
        });
        
        // Ensure we return a string
        if (typeof response.content === 'string') {
            return response.content;
        } else if (Array.isArray(response.content)) {
            return response.content.map(part => {
                if (typeof part === 'string') return part;
                if (typeof part === 'object' && 'text' in part) return part.text;
                return '';
            }).join('');
        } else {
            return String(response.content);
        }
    } catch (error: any) {
        console.error('❌ Deepseek API Error:', error);
        
        // Check if it's a context length error
        if (error?.message && error.message.includes('maximum context length')) {
            throw new Error(`Deepseek API Error: ${error.message}`);
        }
        
        if (error?.status === 429) {
            throw new Error("Rate limit exceeded. Please try again later.");
        }
        if (error?.message) {
            throw new Error(`Deepseek API Error: ${error.message}`);
        }
        throw new Error("Failed to generate summary. Please try again.");
    }
} 