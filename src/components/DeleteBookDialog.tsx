"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Button } from "@base-ui/react";
import { apiFetch } from "@/lib/api";

type DeleteBookDialogProps = {
  id: string;
  onDeleted: (id: string) => void;
};

const DeleteBookDialog = ({ id, onDeleted }: DeleteBookDialogProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteBook = async () => {
    setIsDeleting(true);

    try {
      const res = await apiFetch(`/books/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Could not delete this book.");
      }

      setOpen(false);
      onDeleted(id);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button className="mt-4 inline-flex w-fit items-center gap-1 rounded-md bg-[#B3372B] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            <MdOutlineDeleteForever />
            Delete
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this book. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteBook}
            disabled={isDeleting}
            className="bg-[#B3372B] text-white hover:bg-[#B3372B] hover:text-white"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBookDialog;