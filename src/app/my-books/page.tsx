"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import MyBooksCard from "@/components/MyBooksCard";

type Book = {
  _id: string;
  title: string;
  author: string;
  userEmail: string;
  userName: string;
  // Add other fields required by MyBooksCard
};

export default function MyBooksPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      setBooks([]);
      setLoading(false);
      return;
    }

    const getMyBooks = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:5000/my-books/${encodeURIComponent(email)}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Could not fetch your books.");

        const data: Book[] = await res.json();
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

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1>My Books</h1>

      {books.length === 0 ? (
        <p>You haven’t added any books yet.</p>
      ) : (
        <MyBooksCard books={books} />
      )}
    </main>
  );
}