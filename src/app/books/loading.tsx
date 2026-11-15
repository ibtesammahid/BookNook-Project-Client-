import { Library } from "lucide-react";
import BooksSkeleton from "@/components/skeletons/BooksSkeleton";

export default function Loading() {
  return (
    <section className="py-16">
      {/* Section header */}
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
        <p className="mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-[#B3372B]">
          <Library className="h-5 w-5" />
          All Books
        </p>
        <h1 className="text-3xl font-bold text-[#1F3864] md:text-4xl lg:text-5xl">
          Explore Every Book
        </h1>
      </div>

      <BooksSkeleton />
    </section>
  );
}
