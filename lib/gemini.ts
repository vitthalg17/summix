import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateSummaryFromGemini(pdfText: string) {
    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-pro-002", 
            generationConfig: { 
                temperature: 0.6, 
                maxOutputTokens: 1500 
            } 
        });
        
        const prompt = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: SUMMARY_SYSTEM_PROMPT },
                        { 
                            text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`
                        }
                    ]
                }
            ]
        };
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        if (!text) {
            throw new Error('No text response from Gemini');
        }
        
        return text;
    } catch (error: any) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to generate summary with Gemini');
    }
} 