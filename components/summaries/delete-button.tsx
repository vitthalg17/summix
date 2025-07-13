"use client";
import { deleteSummary } from "@/actions/summary-actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger, DialogHeader, DialogClose } from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface DeleteButtonProps {
    summaryId: string;
}


export default function DeleteButton({ summaryId }: DeleteButtonProps) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const result = await deleteSummary(summaryId);
            if (!result.success) {
                toast.error(result.message);
            } else {
                toast.success(result.message);
            }
            setOpen(false);
        } catch (error) {
            console.error('Error deleting summary:', error);
        } finally {
            setIsDeleting(false);
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>    
        <DialogTrigger asChild> 
            <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-400 hover:text-red-600 border border-red-300 hover:border-red-500 hover:bg-red-50 rounded-md">
            <Trash2 className="h-4 w-4" />
        </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Delete Summary</DialogTitle>
            <DialogDescription>
                Are you sure you want to delete this Summary? This action is irreversible.
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button
                    variant="ghost"
                    className="bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
                <Button
                    variant="destructive"
                    className="bg-gray-900 hover:bg-gray-600"
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
                </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
        
    );
}