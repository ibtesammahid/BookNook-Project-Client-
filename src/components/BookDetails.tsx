"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import BorrowBook from "./BorrowBook";

/** Book shape used by this page. */
type Book = {
  id: string;
  title: string;
  author: string;
  image?: string | null;
  description: string;
  category?: string;
  userName?: string;
  stock: number;
};

type ApiBook = {
  _id: string;
  title: string;
  author: string;
  description: string;
  category?: string;
  userName?: string;
  totalCopies: number;
  image?: string | null;
};

async function fetchBook(id: string): Promise<Book | null> {
  const res = await fetch(`http://localhost:5000/books/${id}`);

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error("Failed to fetch book details.");
  }

  const data: ApiBook = await res.json();
  if (!data) {
  return null;
}

  return {
    id: data._id,
    title: data.title,
    author: data.author,
    image: data.image,
    description: data.description,
    category: data.category,
    userName: data.userName,
    stock: Number(data.totalCopies),
  };
}

export default function BookDetails({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchBook(id)
      .then((data) => {
        if (cancelled) return;
        setBook(data);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load book:", err);
        setError("Could not load this book. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const breadcrumb = (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-3 text-sm text-gray-600"
    >
      <Link href="/" className="transition-colors hover:text-[#B3372B]">
        Home
      </Link>
      <ArrowRight className="h-4 w-4 text-gray-400" />
      <Link href="/books" className="transition-colors hover:text-[#B3372B]">
        Books
      </Link>
      <ArrowRight className="h-4 w-4 text-gray-400" />
      <span className="text-gray-900">
        {loading ? "…" : (book?.title ?? "Book")}
      </span>
    </nav>
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl animate-pulse px-6 py-12">
        <div className="h-4 w-64 rounded bg-gray-200" />
        <div className="mt-10 h-9 w-3/4 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-40 rounded bg-gray-200" />
        <div className="mt-8 h-px w-full bg-gray-200" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        {breadcrumb}
        <h1 className="mt-10 text-2xl font-bold text-[#1F3864]">
          {error ? "Unable to load book" : "Book not found"}
        </h1>
        <p className="mt-3 text-gray-600">
          {error || "This book could not be found."}
        </p>
        <Link
          href="/books"
          className="mt-6 inline-block rounded-md bg-[#B3372B] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Back to all books
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {breadcrumb}

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {/* Book cover */}
        <div className="relative h-105 w-full overflow-hidden rounded-xl bg-[#F7F6F4]">
          {book.image && (
            <Image
              src={book.image}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-2"
              priority
            />
          )}
        </div>

        {/* Book information and borrow controls */}
        <div>
          <h1 className="text-3xl font-bold text-[#1F3864] md:text-4xl">
            {book.title}
          </h1>

          <p className="mt-2 text-gray-600">{book.author}</p>

          <hr className="my-6 border-gray-200" />

          <p className="leading-7 text-gray-700">{book.description}</p>

          <p className="mt-4 text-sm">
            <span className="font-semibold text-gray-900">Total copies:</span>{" "}
            <span className="font-bold text-[#B3372B]">{book.stock}</span>
          </p>

          <div className="mt-6">
            <BorrowBook
              bookId={book.id}
              bookTitle={book.title}
              bookImage={book.image}
              stock={book.stock}
            />
          </div>

          <hr className="my-6 border-gray-200" />

          {book.category && (
            <p className="text-sm">
              <span className="font-bold text-[#1F3864]">Category:</span>{" "}
              <span className="text-gray-600">{book.category}</span>
            </p>
          )}
          {book.userName && (
            <p className="text-sm">
              <span className="font-bold text-[#1F3864]">Added by:</span>{" "}
              <span className="text-gray-600">{book.userName}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
