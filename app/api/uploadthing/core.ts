import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: "8MB" } })
        .middleware(async ({ req }) => {
            const user = await currentUser();
            
            if (!user) throw new UploadThingError('Unauthorized');
            
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log('upload completed for user id', metadata.userId);
            console.log('file url', file.url);
            return { 
                userId: metadata.userId, 
                file: {
                    name: file.name,
                    url: file.url,
                    size: file.size,
                    key: file.key
                }
            };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;