import Link from "next/link";
import { BookOpen, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
        {/* Book badge — same circle style as the New Arrivals "More Books" card */}
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#B3372B] text-white">
          <BookOpen className="h-6 w-6" />
        </span>

        <p className="mt-5 text-sm font-bold uppercase tracking-wider text-[#B3372B]">
          Error 404
        </p>

        <h1 className="mt-2 text-xl font-bold text-[#1F3864]">
          Page Not Found
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#B3372B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B3372B]/90"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
