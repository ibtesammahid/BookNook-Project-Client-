"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import BorrowDialog from "@/components/BorrowDialog";

type BorrowBookProps = {
  bookId: string;
  bookTitle: string;
  bookImage?: string | null;
  stock: number;
  userEmail: string;
  onBorrowed?: () => void;
};

export default function BorrowBook({
  bookId,
  bookTitle,
  bookImage,
  stock,
  onBorrowed,
}: BorrowBookProps) {
    const {data: session} = authClient.useSession();
    const user = session?.user;
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [message, setMessage] = useState("");
  const canBorrow = stock > 0 && !isBorrowing;

const handleBorrow = async (): Promise<boolean> => {
  setMessage("");
  setIsBorrowing(true);

  try {
    const res = await fetch("http://localhost:5000/borrowedbooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        bookTitle,
        bookImage,
        userName: user?.name,
        userEmail: user?.email,
        quantity: 1,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Could not borrow this book.");
    }

    setMessage("Book borrowed successfully!");
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
    </div>
  );
}