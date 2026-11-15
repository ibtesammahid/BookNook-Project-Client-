export default function Loading() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div
        aria-hidden="true"
        className="h-8 w-72 max-w-full animate-pulse rounded bg-gray-200"
      />
      <div
        aria-hidden="true"
        className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-gray-200"
      />
    </section>
  );
}
