import { Library } from "lucide-react";
import AddBookForm from "@/components/AddBookForm";

export default function AddBooksPage() {
  return (
    <section className="py-16">
      {/* Section header */}
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
        <p className="mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-[#B3372B]">
          <Library className="h-5 w-5" />
          Add A Book
        </p>
        <h1 className="text-3xl font-bold text-[#1F3864] md:text-4xl lg:text-5xl">
          Add A New Book
        </h1>
      </div>

      <AddBookForm />
    </section>
  );
}
