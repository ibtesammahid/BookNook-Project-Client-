"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import Image from "next/image";

/** Shape expected from the API. */
type Book = {
  id: number | string;
  title: string;
  author: string;
  image?: string | null;
  description: string;
  category?: string;
  /** Total copies in stock — drives the available counter. */
  stock: number;
};

type ApiBook = {
  _id: string;
  title: string;
  author: string;
  description: string;
  category?: string;
  totalCopies: number;
};

/**
 * TODO(API): replace the body with your own API call for a single book.
 * Return `null` when the book does not exist.
 *
 * Example:
 *   const res = await fetch(`https://your-api.example.com/books/${id}`);
 *   if (!res.ok) return null;
 *   const b = await res.json();
 *   return {
 *     id: b.id,
 *     title: b.title,
 *     author: b.author,
 *     description: b.description,
 *     categories: b.categories,
 *     stock: b.stock,
 *   };
 */
async function fetchBook(id: string): Promise<Book | null> {
  // Empty placeholder — add your API here.
  const res = await fetch(`http://localhost:5000/books/${id}`);
    if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch book details.");
  }

  const data: ApiBook = await res.json();

  return {
    id: data._id,
    title: data.title,
    author: data.author,
    description: data.description,
    category: data.category,
    stock: Number(data.totalCopies),
  };

}

export default function BookDetails({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchBook(id)
      .then((data) => {
        if (cancelled) return;
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to load book:", error);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const breadcrumb = (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
      <Link href="/" className="transition-colors hover:text-[#B3372B]">
        Home
      </Link>
      <ArrowRight className="h-4 w-4 text-gray-400" />
      <Link href="/books" className="transition-colors hover:text-[#B3372B]">
        Products
      </Link>
      <ArrowRight className="h-4 w-4 text-gray-400" />
      <span className="text-gray-900">{loading ? "…" : (book?.title ?? "Book")}</span>
    </nav>
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl animate-pulse px-6 py-12">
        <div className="h-4 w-64 rounded bg-gray-200" />
        <div className="mt-10 h-9 w-3/4 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-40 rounded bg-gray-200" />
        <div className="mt-8 h-px w-full bg-gray-200" />
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
        </div>
        <div className="mt-6 h-4 w-48 rounded bg-gray-200" />
        <div className="mt-8 flex gap-3">
          <div className="h-12 w-32 rounded-md bg-gray-200" />
          <div className="h-12 w-40 rounded-md bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        {breadcrumb}
        <h1 className="mt-10 text-2xl font-bold text-[#1F3864]">Book not found</h1>
        <p className="mt-3 text-gray-600">
          This book could not be loaded. Check the API placeholder in <code className="font-mono text-sm">src/components/BookDetails.tsx</code>.
        </p>
        <Link
          href="/books"
          className="mt-6 inline-block rounded-md bg-[#B3372B] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Back to all books
        </Link>
      </div>
    );
  }

  // Copies left after the ones currently selected in the stepper.
  const available = Math.max(book.stock - quantity, 0);
  const canIncrease = quantity < book.stock;
  const canAdd = available > 0 && !added;

  const handleAddToCart = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

 return (
  <div className="mx-auto max-w-6xl px-6 py-12">
    {breadcrumb}

    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
      {/* Book cover */}
      <div className="relative h-[420px] w-full overflow-hidden rounded-xl bg-[#F7F6F4]">
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

      {/* Book details */}
      <div>
        <h1 className="text-3xl font-bold text-[#1F3864] md:text-4xl">
          {book.title}
        </h1>

        <p className="mt-2 text-gray-600">{book.author}</p>

        <hr className="my-6 border-gray-200" />

        <p className="leading-7 text-gray-700">{book.description}</p>

        {/* Available counter */}
        <p className="mt-4 text-sm">
          <span className="font-semibold text-gray-900">Available Books:</span>{" "}
          <span
            className={`font-bold ${
              available === 0 ? "text-gray-400" : "text-[#B3372B]"
            }`}
          >
            {available}
          </span>{" "}
          {available === 1 ? "copy" : "copies"}
          {quantity > 0 && available > 0 && (
            <span className="text-gray-400"> (of {book.stock} in stock)</span>
          )}
        </p>

        {/* Quantity stepper + Add To Cart */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-md border border-gray-300">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => {
                setQuantity((q) => Math.max(1, q - 1));
                setAdded(false);
              }}
              disabled={quantity <= 1}
              className="cursor-pointer px-3 py-3 text-gray-600 transition-colors hover:text-[#B3372B] disabled:pointer-events-none disabled:opacity-40"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="w-10 text-center text-sm font-bold text-gray-900">
              {String(quantity).padStart(2, "0")}
            </span>

            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => {
                setQuantity((q) => Math.min(book.stock, q + 1));
                setAdded(false);
              }}
              disabled={!canIncrease}
              className="cursor-pointer px-3 py-3 text-gray-600 transition-colors hover:text-[#B3372B] disabled:pointer-events-none disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!canAdd}
            className="cursor-pointer rounded-md bg-[#B3372B] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
          >
            {added ? "Added ✓" : "Add To Cart"}
          </button>
        </div>

        <hr className="my-6 border-gray-200" />

        {book.category && (
          <p className="text-sm">
            <span className="font-bold text-[#1F3864]">Category:</span>{" "}
            <span className="text-gray-600">{book.category}</span>
          </p>
        )}
      </div>
    </div>
  </div>
);
}
