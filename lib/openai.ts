import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "../utils/prompts";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummaryFromOpenAI(pdfText: string) {
    try {
        console.log('🔄 OpenAI API: Creating chat completion...', { textLength: pdfText.length });
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: SUMMARY_SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: `Please analyze and summarize the following text using the format specified above. Make sure to include practical recommendations, key terms, and a clear bottom line:\n\n${pdfText}`
                }
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });

        console.log('✅ OpenAI API: Chat completion successful', { 
            tokensUsed: response.usage?.total_tokens || 'unknown',
            responseLength: response.choices[0].message.content?.length || 0 
        });
        return response.choices[0].message.content;
    } catch (error: any) {
        console.error('OpenAI API Error:', error);
        
        if (error?.status === 429) {
            throw new Error("Rate limit exceeded. Please try again later.");
        }
        if (error?.message) {
            throw new Error(`OpenAI API Error: ${error.message}`);
        }
        throw new Error("Failed to generate summary. Please try again.");
    }
}

