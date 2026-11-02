"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { authClient } from "@/lib/auth-client";


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
  const [quantity, setQuantity] = useState(1);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [message, setMessage] = useState("");

  const canIncrease = quantity < stock;
  const canBorrow = stock > 0 && !isBorrowing;

  const handleBorrow = async () => {
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
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Could not borrow this book.");
      }

      setMessage("Book borrowed successfully!");
      onBorrowed?.(); // Let the parent refresh book details/stock.
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-md border border-gray-300">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          disabled={quantity <= 1 || isBorrowing}
          className="px-3 py-3 text-gray-600 hover:text-[#B3372B] disabled:opacity-40"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="w-10 text-center text-sm font-bold">
          {String(quantity).padStart(2, "0")}
        </span>

        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() =>
            setQuantity((current) => Math.min(stock, current + 1))
          }
          disabled={!canIncrease || isBorrowing}
          className="px-3 py-3 text-gray-600 hover:text-[#B3372B] disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleBorrow}
        disabled={!canBorrow}
        className="rounded-md bg-[#B3372B] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isBorrowing ? "Borrowing..." : "Borrow Book"}
      </button>

      {message && (
        <p role="status" className="w-full text-sm">
          {message}
        </p>
      )}
    </div>
  );
}