"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";

/** Shape expected from the API — `cover` is provided by the API later on. */
type Book = {
  id: string;
  title: string;
  author: string;
  image?: string | null;
};

type ApiBook = {
  _id: string;
  title: string;
  author: string;
  image?: string | null;
}; 

/** Number of books revealed per click of the Load More button. */
const PAGE_SIZE = 9;

/**
 * TODO(API): replace the body with your own API call. It must resolve to an
 * array of `Book` objects — `title` and `author` are rendered dynamically on
 * each card, and `cover` is the book's cover photo (may be null/omitted).
 *
 * Example:
 *   const res = await fetch("https://your-api.example.com/books");
 *   if (!res.ok) throw new Error("Failed to load books");
 *   const data = await res.json();
 *   return data.map((b) => ({
 *     id: b.id,
 *     title: b.title,
 *     author: b.author,
 *     cover: b.cover,
 *   }));
 */
async function fetchBooks(): Promise<Book[]> {
  // Empty placeholder — add your API here.
  const res = await fetch('http://localhost:5000/books');
//   const data = await res.json();
//  console.log(data);
//   return [];
  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data: ApiBook[] = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid books data received from server");
  }

  return data.map((book) => ({
    id: book._id,
    title: book.title,
    author: book.author,
    image: book.image,
  }));
}

export default function AllBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    let cancelled = false;

    const loadBooks = async () => {
      try {
        const data = await fetchBooks();

        if (cancelled) return;

        setBooks(data);
      } catch (error) {
        if (cancelled) return;

        console.error("Failed to load books:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading books."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadBooks();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleBooks = books.slice(0, visibleCount);
  const hasMore = visibleCount < books.length;

  return (
    <section aria-label="All books">
      <div className="mx-auto max-w-7xl px-6">
        <div
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Loading skeletons */}
          {loading &&
            Array.from({ length: PAGE_SIZE }, (_, i) => (
              <div
                key={`skeleton-${i}`}
                aria-hidden="true"
                className="animate-pulse rounded-2xl bg-gray-100 p-4"
              >
                <div className="aspect-3/4 rounded-lg bg-gray-200" />
                <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-1/3 rounded bg-gray-200" />
              </div>
            ))}

          {/* Error state */}
          {!loading && error && (
            <p className="col-span-full py-12 text-center text-red-500">
              {error}
            </p>
          )}

          {/* Empty state */}
          {!loading && !error && books.length === 0 && (
            <p className="col-span-full py-12 text-center text-gray-500">
              No books found.
            </p>
          )}

          {/* Book cards */}
          {!loading &&
            !error &&
            visibleBooks.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                role="listitem"
                className="group rounded-2xl bg-[#F5F5F3] p-4 transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-white/70">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      loading= "eager"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen
                        className="h-14 w-14 text-gray-300"
                        strokeWidth={1.4}
                      />
                    </div>
                  )}
                </div>

                <h3 className="mt-4 text-base font-bold text-gray-900 transition-colors group-hover:text-[#B3372B]">
                  {book.title}
                </h3>

                <p className="mt-1 text-sm font-medium text-[#B3372B]">
                  By {book.author}
                </p>
              </Link>
            ))}
        </div>

        {/* Load More */}
        {!loading && !error && hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((count) => count + PAGE_SIZE)
              }
              className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#B3372B] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Load More
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

