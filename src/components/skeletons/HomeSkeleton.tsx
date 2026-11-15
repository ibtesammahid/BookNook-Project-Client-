import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Library,
  Mail,
  PhoneCall,
} from "lucide-react";
import NewArrivalsSkeleton from "./NewArrivalsSkeleton";

/** Widths that mirror the six category tile names. */
const CATEGORY_NAME_WIDTHS = ["w-16", "w-24", "w-20", "w-12", "w-24", "w-16"];

/** Tints sampled from the three promo cards. */
const PROMO_TINTS = ["bg-[#e0deda]", "bg-[#cfcfcf]", "bg-[#d1c3a1]"];

/** Question bar widths for the five FAQ rows (first row starts open). */
const QUESTION_WIDTHS = ["w-11/12", "w-4/5", "w-5/6", "w-3/4", "w-9/12"];

/**
 * Loading state for the home page — mirrors Slider, New Arrivals,
 * Discover and FAQ exactly, with the dynamic content pulsing in place.
 */
export default function HomeSkeleton() {
  return (
    <>
      {/* Hero banner — Slider */}
      <section
        aria-label="Featured books"
        className="relative w-full overflow-hidden"
      >
        <div className="relative h-[calc(100dvh-4rem)] w-full bg-[#EDEBE6] sm:h-[calc(100dvh-4.5rem)] md:h-[calc(100dvh-7.5rem)]">
          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
            <div className="max-w-xl py-16">
              <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#8C2B22]">
                <Library className="h-5 w-5" />
                Read better every day
              </p>

              <div aria-hidden="true">
                <div className="mb-4 h-9 w-full animate-pulse rounded bg-gray-300 sm:h-12 lg:h-15" />
                <div className="mb-5 h-9 w-3/4 animate-pulse rounded bg-gray-300 sm:h-12 lg:h-15" />
                <div className="mb-3 h-4 w-full animate-pulse rounded bg-gray-300" />
                <div className="mb-3 h-4 w-11/12 animate-pulse rounded bg-gray-300" />
                <div className="mb-8 h-4 w-5/6 animate-pulse rounded bg-gray-300" />
              </div>

              <Link
                href="/books"
                className="inline-flex items-center gap-2 rounded-md bg-[#8C2B22] px-6 py-3 text-sm font-semibold text-white"
              >
                Browse Books
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Arrows (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 text-[#1F3864] shadow-md md:block"
          >
            <ChevronLeft className="h-5 w-5" />
          </div>
          <div
            aria-hidden="true"
            className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/80 p-3 text-[#1F3864] shadow-md md:block"
          >
            <ChevronRight className="h-5 w-5" />
          </div>

          {/* Dot indicators */}
          <div
            aria-hidden="true"
            className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
          >
            <span className="h-2 w-6 rounded-full bg-[#8C2B22]" />
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-black/20" />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals — cards come from the API */}
      <NewArrivalsSkeleton />

      {/* Discover — categories */}
      <section aria-label="Shop by categories" className="py-16">
        <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
          <p className="mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-[#B3372B]">
            <Library className="h-5 w-5" />
            Shop by Categories
          </p>
          <h2 className="text-3xl font-bold text-[#1F3864] md:text-4xl lg:text-5xl">
            Discover Stories for Everyone
          </h2>
        </div>

        <div className="mx-auto max-w-7xl space-y-6 px-6">
          {/* Category tiles */}
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORY_NAME_WIDTHS.map((width, i) => (
              <div
                key={i}
                aria-hidden="true"
                className="rounded-xl bg-[#F7F4EF] p-4 text-center"
              >
                <div className="aspect-[4/3] animate-pulse rounded-lg bg-gray-300" />
                <div
                  className={`mx-auto mt-4 h-4 ${width} animate-pulse rounded bg-gray-300`}
                />
                <div className="mx-auto mt-2 h-3 w-16 animate-pulse rounded bg-gray-300" />
              </div>
            ))}
          </div>

          {/* Promo cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {PROMO_TINTS.map((tint, i) => (
              <div
                key={i}
                aria-hidden="true"
                className={`overflow-hidden rounded-2xl ${tint}`}
              >
                <div className="px-6 pt-8 pb-6 text-center">
                  <div className="mx-auto h-6 w-36 animate-pulse rounded bg-gray-300" />
                  <div className="mx-auto mt-2 h-4 w-52 animate-pulse rounded bg-gray-300" />
                </div>
                <div className="aspect-16/10 animate-pulse bg-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-label="Frequently asked questions"
        className="bg-[#F7F4EF] py-16"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          {/* Left column — heading + contact info */}
          <div>
            <span
              aria-hidden="true"
              className="mb-6 block h-2.5 w-2.5 rounded-full bg-[#B3372B]"
            />

            <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#B3372B]">
              <BookOpen className="h-5 w-5" />
              Frequently Asked Questions
            </p>

            <h2 className="text-3xl font-bold leading-tight text-[#1F3864] md:text-4xl lg:text-5xl">
              Everything you Need to Know Before you Shop
            </h2>

            <div aria-hidden="true" className="mt-4 max-w-xl space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-gray-300" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-gray-300" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300" />
            </div>

            {/* Divider + contact details */}
            <div className="mt-10 border-t border-gray-200 pt-8">
              <div className="flex flex-wrap gap-8">
                {[PhoneCall, Mail].map((Icon, i) => (
                  <div
                    key={i}
                    aria-hidden="true"
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#B3372B] text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div
                        className={`h-4 ${i === 0 ? "w-16" : "w-14"} animate-pulse rounded bg-gray-300`}
                      />
                      <div className="mt-1 h-4 w-28 animate-pulse rounded bg-gray-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — accordion card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <ul>
              {QUESTION_WIDTHS.map((width, i) => (
                <li
                  key={i}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex w-full items-start justify-between gap-4 py-5 text-left">
                    <div aria-hidden="true" className="min-w-0 flex-1">
                      <div
                        className={`h-4 ${width} animate-pulse rounded bg-gray-200`}
                      />
                      {i === 0 && (
                        <div className="mt-4 space-y-3 pr-12">
                          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
                        </div>
                      )}
                    </div>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#B3372B] text-white">
                      {i === 0 ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
