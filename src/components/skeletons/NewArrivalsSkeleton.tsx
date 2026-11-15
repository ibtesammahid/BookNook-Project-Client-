import { ArrowRight, ChevronLeft, ChevronRight, Library, Plus } from "lucide-react";

/** Mirrors CARD_WIDTHS in NewArrivals so placeholder cards line up. */
const CARD_WIDTHS =
  "w-[78%] sm:w-[46%] md:w-[31%] lg:w-[calc((100%-60px)/4)]";

/** The scroller's cards only — drop-in for the NewArrivals loading state. */
export function NewArrivalCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={`skeleton-${i}`}
          aria-hidden="true"
          className={`relative aspect-3/4 shrink-0 snap-start overflow-hidden rounded-2xl bg-gray-100 ${CARD_WIDTHS}`}
        >
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
          <div className="absolute inset-x-0 bottom-0 p-5 pt-16">
            <div className="h-5 w-3/4 animate-pulse rounded bg-white/70" />
            <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-white/70" />
          </div>
        </div>
      ))}
    </>
  );
}

/** Full New Arrivals section, exactly as the home page renders it. */
export default function NewArrivalsSkeleton() {
  return (
    <section aria-label="New arrivals" className="py-16">
      {/* Section header — static copy, identical to the real page */}
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
        <p className="mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-[#B3372B]">
          <Library className="h-5 w-5" />
          Recently Added Books
        </p>
        <h2 className="text-3xl font-bold text-[#1F3864] md:text-4xl lg:text-5xl">
          Fresh Stories, Just Added
        </h2>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div
          aria-label="New arrival books"
          className="flex snap-x gap-5 overflow-x-auto px-6 pb-4"
        >
          <NewArrivalCardsSkeleton />

          {/* Trailing "More Books" card — static content of the real page */}
          <div
            aria-hidden="true"
            className={`flex aspect-3/4 shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#1F3864]/30 bg-[#1F3864]/5 px-6 text-center ${CARD_WIDTHS}`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B3372B] text-white">
              <Plus className="h-6 w-6" />
            </span>
            <span className="text-lg font-bold text-[#1F3864]">More Books</span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              See All Books
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Scroll arrows — decorative while the cards load */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1F3864] shadow-md opacity-40"
        >
          <ChevronLeft className="h-5 w-5" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1F3864] shadow-md"
        >
          <ChevronRight className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
}
