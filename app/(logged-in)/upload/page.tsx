import UploadClientPage from "@/components/upload/upload-client-page";
import { getDailyUsageCount } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Upload() {
    const user = await currentUser();
    const userId = user?.id;
    
    if (!userId) {
        redirect('/sign-in');
    }
    
    const dailyUsage = await getDailyUsageCount(userId);
    const creditsLeft = 3 - dailyUsage;
    
    return <UploadClientPage creditsLeft={creditsLeft} />;
}