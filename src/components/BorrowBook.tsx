"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import BorrowDialog from "@/components/BorrowDialog";
import { toast } from "@/components/ui/toast"

type BorrowBookProps = {
  bookId: string;
  bookTitle: string;
  bookImage?: string | null;
  stock: number;
  onBorrowed?: () => void;
};

export default function BorrowBook({
  bookId,
  bookTitle,
  bookImage,
  stock,
  onBorrowed,
}: BorrowBookProps) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [message, setMessage] = useState("");
  const canBorrow = stock > 0 && !isBorrowing;
  const handleBorrow = async (): Promise<boolean> => {

    if (isBorrowing || stock <= 0) return false;

    if (!user) {
      setMessage("Please sign in to borrow this book.");
      return false;
    }
    setMessage("");
    setIsBorrowing(true);

    try {
      const res = await apiFetch("/borrowedbooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          bookTitle,
          bookImage,
          userEmail: user.email,
          userName: user.name,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Could not borrow this book.");
        toast.add({
          title: "Error",
          type: "error",
          description: data.message || "Could not borrow this book.",
        });
        return false;
      }
      setMessage("Book borrowed successfully!");
      toast.add({
        title: "Success",
        type: "success",
        description: data.message || "Book borrowed successfully!",
      });
      onBorrowed?.();
      return true;
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
      return false;
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <BorrowDialog
        userName={user?.name || ""}
        userEmail={user?.email || ""}
        isBorrowing={isBorrowing}
        canBorrow={canBorrow}
        onBorrow={handleBorrow}
      />

      {message && (
        <p role="status" className="w-full text-sm text-green-600">
          {message}
        </p>
      )}

      {!user && (
        <p className="w-full text-sm text-gray-600">
          <Link
            href="/loginreminder"
            className="font-semibold text-[#8C2B22] underline underline-offset-4"
          >
            Sign in
          </Link>{" "}
          to borrow this book.
        </p>
      )}
    </div>
  );
}