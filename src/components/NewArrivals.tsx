"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Library, Plus } from "lucide-react";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image?: string | null;
};

async function fetchNewArrivals(): Promise<Book[]> {
  const res = await fetch("http://localhost:5000/new-arrivals");

  if (!res.ok) {
    throw new Error("Failed to fetch new arrivals");
  }

  return res.json();
}

const CARD_WIDTHS =
  "w-[78%] sm:w-[46%] md:w-[31%] lg:w-[calc((100%-60px)/4)]";

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * Math.max(el.clientWidth * 0.8, 240),
      behavior: "smooth",
    });
  };

  useEffect(() => {
  if (!loading && scrollerRef.current) {
    scrollerRef.current.scrollLeft = 0;
    updateScrollButtons();
  }
}, [loading, books]);

  useEffect(() => {
    let cancelled = false;
    fetchNewArrivals()
      .then((data) => {
        if (cancelled) return;
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Failed to load new arrivals:", error);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section aria-label="New arrivals" className="py-16">
      {/* Section header */}
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
        <p className="mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-[#B3372B]">
          <Library className="h-5 w-5" />
          New Arrivals
        </p>
        <h2 className="text-3xl font-bold text-[#1F3864] md:text-4xl lg:text-5xl">
          Fresh Stories, Just Released
        </h2>
      </div>

      {/* Horizontal scroller — 4 cards visible on desktop, scroll via arrows or touch */}
      <div className="relative mx-auto max-w-7xl">
        <div
          ref={scrollerRef}
          role="list"
          aria-label="New arrival books"
          onScroll={updateScrollButtons}
          className="flex snap-x gap-5 overflow-x-auto px-6 pb-4"
        >
        {/* Loading skeletons — 4 cards while the API responds */}
        {loading &&
          Array.from({ length: 4 }, (_, i) => (
            <div
              key={`skeleton-${i}`}
              aria-hidden="true"
              className={`aspect-3/4 shrink-0 animate-pulse rounded-2xl bg-gray-100 ${CARD_WIDTHS}`}
            />
          ))}

        {books.map((book) => (
          <article
            key={book._id}
            role="listitem"
            className={`relative aspect-3/4 shrink-0 snap-start overflow-hidden rounded-2xl bg-gray-100 ${CARD_WIDTHS}`}
          >
            {/* Cover photo — empty placeholder until the API supplies one */}
            {book.image ? (
              <Image
                src={book.image}
                alt={book.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 78vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="h-14 w-14 text-gray-300" strokeWidth={1.4} />
              </div>
            )}

            {/* Title overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/45 to-transparent p-5 pt-16">
              <h3 className="text-lg font-bold text-white">{book.title}</h3>
              <p className="mt-1 text-sm text-white/85">By {book.author}</p>
            </div>
          </article>
        ))}

        {/* Trailing "More Books" card */}
        <Link
          href="/books"
          role="listitem"
          className={`group flex aspect-3/4 shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#1F3864]/30 bg-[#1F3864]/5 px-6 text-center transition-colors hover:border-[#B3372B] hover:bg-[#B3372B]/5 ${CARD_WIDTHS}`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B3372B] text-white">
            <Plus className="h-6 w-6" />
          </span>
          <span className="text-lg font-bold text-[#1F3864]">More Books</span>
          <span className="flex items-center gap-1 text-sm text-gray-500 group-hover:text-[#B3372B]">
            See All Books
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        </div>

        {/* Scroll arrows */}
        <button
          type="button"
          aria-label="Scroll cards left"
          onClick={() => scrollBy(-1)}
          disabled={!canScrollLeft}
          className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-[#1F3864] shadow-md transition-colors hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Scroll cards right"
          onClick={() => scrollBy(1)}
          disabled={!canScrollRight}
          className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-[#1F3864] shadow-md transition-colors hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
