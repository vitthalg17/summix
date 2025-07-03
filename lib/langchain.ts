import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

export async function fetchAndExtractPdfText(fileUrl: string) {
    console.log('Fetching PDF from:', fileUrl);
    
    // Add retry logic and better error handling
    let response;
    let retries = 3;
    
    while (retries > 0) {
        try {
            response = await fetch(fileUrl, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                },
                // Add timeout to prevent hanging
                signal: AbortSignal.timeout(30000) // 30 second timeout
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            break; // Success, exit retry loop
        } catch (error: any) {
            retries--;
            console.log(`Fetch attempt failed, ${retries} retries left:`, error.message);
            
            if (retries === 0) {
                throw new Error(`Failed to fetch PDF after 3 attempts: ${error.message}`);
            }
            
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    const blob = await response!.blob();

    const arrayBuffer = await blob.arrayBuffer();
    
    const loader = new PDFLoader(new Blob([arrayBuffer]));
    
    const docs = await loader.load();
    //combine all pages
    const extractedText = docs.map((doc) => doc.pageContent).join('\n');
    console.log('Extracted text from PDF:', extractedText);
    return extractedText;
} 