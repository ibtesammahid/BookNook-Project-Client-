"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import MyBooksCard from "@/components/MyBooksCard";
import type { AddedBook } from "@/components/MyBooksCard";

export default function MyBooksPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [books, setBooks] = useState<AddedBook[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!email) return;

  const getMyBooks = async () => {
    setLoading(true);

    try {
      const res = await apiFetch(
        `/my-books/${encodeURIComponent(email)}`,
        { cache: "no-store" },
      );

      if (!res.ok) throw new Error("Could not fetch your books.");

      const data: AddedBook[] = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error loading my books:", error);
    } finally {
      setLoading(false);
    }
  };

  getMyBooks();
}, [email]);

  if (isPending || loading) return <p>Loading your books...</p>;
  if (!session?.user) return <p>Please sign in to view your books.</p>;

  const handleBookDeleted = (id: string) => {
  setBooks((currentBooks) =>
    currentBooks.filter((book) => book._id !== id)
  );
};

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <MyBooksCard books={books} onBookDeleted={handleBookDeleted} />
    </main>
  );
}
