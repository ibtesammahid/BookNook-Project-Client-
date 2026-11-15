/** One label + input pair from the Book Information form. */
function FieldSkeleton({ labelWidth = "w-20" }: { labelWidth?: string }) {
  return (
    <div className="grid gap-2">
      <div className={`h-4 ${labelWidth} animate-pulse rounded bg-gray-200`} />
      <div className="h-10 animate-pulse rounded-md border border-gray-300 bg-white" />
    </div>
  );
}

/** Placeholder for AddBookForm — the card exactly as the page renders it. */
export default function AddBookFormSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <div
        aria-hidden="true"
        className="flex flex-col gap-4 overflow-hidden rounded-2xl bg-[#F5F5F3] py-4 shadow-none ring-0"
      >
        {/* Card header */}
        <div className="grid gap-1 px-4">
          <div className="h-5 w-44 animate-pulse rounded bg-gray-200" />
          <div className="mt-1 h-4 w-80 max-w-full animate-pulse rounded bg-gray-200" />
        </div>

        {/* Form */}
        <div className="grid gap-5 px-4">
          <div className="grid gap-5 sm:grid-cols-2">
            <FieldSkeleton labelWidth="w-20" />
            <FieldSkeleton labelWidth="w-24" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FieldSkeleton labelWidth="w-16" />
            <FieldSkeleton labelWidth="w-24" />
          </div>

          {/* Book image */}
          <div className="grid gap-2">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            <div className="flex flex-wrap items-center gap-3">
              <div className="h-10 w-32 animate-pulse rounded-md border border-gray-300 bg-white" />
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* Short description */}
          <div className="grid gap-2">
            <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
            <div className="min-h-32 animate-pulse rounded-md border border-gray-300 bg-white" />
            <div className="flex justify-end">
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* User name + email */}
          <div className="grid gap-5 sm:grid-cols-2">
            <FieldSkeleton labelWidth="w-20" />
            <FieldSkeleton labelWidth="w-20" />
          </div>

          {/* Footer note + submit */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-5">
            <div className="h-4 w-64 max-w-full animate-pulse rounded bg-gray-200" />
            <div className="h-11 w-40 animate-pulse rounded-md bg-[#B3372B]" />
          </div>
        </div>
      </div>
    </div>
  );
}
