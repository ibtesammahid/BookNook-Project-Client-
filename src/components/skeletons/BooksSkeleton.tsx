/** Placeholder cards while the grid loads — matches PAGE_SIZE in AllBooks. */
const CARD_COUNT = 9;

function BookCardSkeleton() {
  return (
    <div aria-hidden="true" className="rounded-2xl bg-[#F5F5F3] p-4">
      <div className="aspect-3/4 animate-pulse rounded-lg bg-gray-200" />
      <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
      <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-gray-200" />
    </div>
  );
}

/** Grid children only — drop-in for the AllBooks loading state. */
export function BookCardsSkeleton({ count = CARD_COUNT }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <BookCardSkeleton key={`skeleton-${i}`} />
      ))}
    </>
  );
}

/** Full All Books content, exactly as the page renders it below its header. */
export default function BooksSkeleton() {
  return (
    <section aria-label="All books">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <BookCardsSkeleton />
        </div>
      </div>
    </section>
  );
}
