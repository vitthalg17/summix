declare module 'pdf-parse' {
    interface PDFData {
        text: string;
        numpages: number;
        info: Record<string, any>;
        metadata: Record<string, any>;
        version: string;
    }

    function pdf(dataBuffer: Buffer, options?: {
        pagerender?: (pageData: any) => string;
        max?: number;
    }): Promise<PDFData>;

    export = pdf;
} 