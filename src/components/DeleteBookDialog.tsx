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
import { Button } from "@base-ui/react";
import { redirect } from "next/navigation";
import { MdOutlineDeleteForever } from "react-icons/md";

const DeleteBookDialog = ({ id }: { id: string }) => {

    const handleDeleteBook = async () => {
        const res = await fetch (`http://localhost:5000/books/${id}`, {
            method: "DELETE",
        })
        const data = await res.json();
        redirect("/my-books");
    }



  return (
    <AlertDialog>
      <AlertDialogTrigger render={
        <Button
            className="mt-4 inline-flex items-center gap-1 w-fit rounded-md bg-[#B3372B] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
           <MdOutlineDeleteForever /> Delete
          </Button>
      }>
        Show Dialog
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteBook}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBookDialog;
