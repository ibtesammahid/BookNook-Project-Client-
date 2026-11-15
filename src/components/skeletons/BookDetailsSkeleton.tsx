import { ArrowRight } from "lucide-react";

/**
 * Placeholder for a book details page — mirrors the loaded layout:
 * breadcrumb, cover panel and the information column with its controls.
 */
export default function BookDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Breadcrumb — real destinations, the title is still loading */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-3 text-sm text-gray-600"
      >
        <span>Home</span>
        <ArrowRight className="h-4 w-4 text-gray-400" />
        <span>Books</span>
        <ArrowRight className="h-4 w-4 text-gray-400" />
        <span
          aria-hidden="true"
          className="h-4 w-40 animate-pulse rounded bg-gray-200"
        />
      </nav>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {/* Book cover */}
        <div className="relative h-105 w-full overflow-hidden rounded-xl bg-[#F7F6F4]">
          <div
            aria-hidden="true"
            className="absolute inset-2 animate-pulse rounded-lg bg-gray-200"
          />
        </div>

        {/* Book information and borrow controls */}
        <div>
          <div
            aria-hidden="true"
            className="h-9 w-3/4 animate-pulse rounded bg-gray-200"
          />
          <div
            aria-hidden="true"
            className="mt-3 h-4 w-40 animate-pulse rounded bg-gray-200"
          />

          <hr className="my-6 border-gray-200" />

          <div aria-hidden="true" className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
          </div>

          <div
            aria-hidden="true"
            className="mt-4 h-4 w-44 animate-pulse rounded bg-gray-200"
          />

          {/* Borrow button */}
          <div
            aria-hidden="true"
            className="mt-6 h-11 w-44 animate-pulse rounded-md bg-[#B3372B]"
          />

          <hr className="my-6 border-gray-200" />

          <div aria-hidden="true" className="space-y-3">
            <div className="h-4 w-44 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-56 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-60 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
