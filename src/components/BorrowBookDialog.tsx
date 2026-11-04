"use client";

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
import { useRouter } from "next/navigation";
import { BorrowedBook } from "./BorrowBooksCard";
import { apiFetch } from "@/lib/api";

const BorrowBookDialog = ({ book }: { book: BorrowedBook }) => {
  const router = useRouter();

  const handleReturn = async () => {
    const res = await apiFetch(`/my-borrows/${book._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    router.refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            disabled={book.returned}
            className="w-full rounded-md bg-[#B3372B] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto"
          >
            {book.returned ? "Returned" : "Return Book"}
          </button>
        }
      >
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to return this book?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You can borrow this book again after returning it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReturn} className="bg-[#B3372B] hover:bg-[#9d2c20]">
            Return
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BorrowBookDialog;
