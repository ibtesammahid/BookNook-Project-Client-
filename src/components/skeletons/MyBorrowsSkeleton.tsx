/** Placeholder rows for the My Borrows list — mirrors BorrowBooksCard. */
export default function MyBorrowsSkeleton() {
  return (
    <section className="w-full space-y-4">
      <div>
        <h2 className="text-lg font-bold text-[#1F3864] sm:text-xl">
          My Borrows
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Books you have borrowed from BookNook.
        </p>
      </div>

      {Array.from({ length: 3 }, (_, i) => (
        <article
          key={`skeleton-${i}`}
          aria-hidden="true"
          className="flex w-full flex-col gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
        >
          {/* Book cover */}
          <div className="h-36 w-24 shrink-0 animate-pulse rounded-md bg-gray-200" />

          {/* Book details */}
          <div className="min-w-0 flex-1">
            <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="h-4 w-44 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-56 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* Return action */}
          <div className="shrink-0 sm:ml-auto">
            <div className="h-11 w-32 animate-pulse rounded-md bg-[#B3372B]" />
          </div>
        </article>
      ))}
    </section>
  );
}
