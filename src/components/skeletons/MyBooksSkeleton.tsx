/** Placeholder rows for the My Books list — mirrors MyBooksCard. */
export default function MyBooksSkeleton() {
  return (
    <section className="w-full space-y-4">
      <div>
        <h2 className="text-lg font-bold text-[#1F3864] sm:text-xl">My Books</h2>
        <p className="mt-1 text-sm text-gray-500">
          Books you have added to BookNook.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-1">
        {Array.from({ length: 3 }, (_, i) => (
          <article
            key={`skeleton-${i}`}
            aria-hidden="true"
            className="flex min-w-0 gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="h-32 w-24 shrink-0 animate-pulse rounded-md bg-gray-200" />

            <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
                <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-gray-200" />
                <div className="mt-3 h-3 w-1/4 animate-pulse rounded bg-gray-200" />
              </div>

              {/* Edit (outline) and Delete (filled) actions */}
              <div className="flex gap-2">
                <div className="h-9 w-16 animate-pulse rounded-md border-2 border-[#B3372B]" />
                <div className="h-9 w-16 animate-pulse rounded-md bg-[#B3372B]" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
