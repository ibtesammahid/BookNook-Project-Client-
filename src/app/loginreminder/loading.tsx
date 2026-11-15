export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
        <div
          aria-hidden="true"
          className="mx-auto h-6 w-72 max-w-full animate-pulse rounded bg-gray-200"
        />
        <div
          aria-hidden="true"
          className="mx-auto mt-3 h-4 w-56 animate-pulse rounded bg-gray-200"
        />
        <div
          aria-hidden="true"
          className="mx-auto mt-6 h-10 w-36 animate-pulse rounded-md bg-[#B3372B]"
        />
      </div>
    </main>
  );
}
