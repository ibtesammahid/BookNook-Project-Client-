"use client";

import Image from "next/image";
import EditBookDialog from "@/components/EditBookDialog";
import DeleteBookDialog from "@/components/DeleteBookDialog";
export type AddedBook = {
  _id: string;
  title: string;
  author: string;
  image?: string | null;
  category?: string;
  totalCopies?: number;
  userEmail: string;
  userName: string;
};

const MyBooksCard = ({ books }: { books: AddedBook[] }) => {
  if (books.length === 0) {
    return (
      <section className="w-full rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
        <h2 className="text-lg font-bold text-[#1F3864]">My Books</h2>
        <p className="mt-2 text-sm text-gray-500">
          You haven’t added any books yet.
        </p>
      </section>
    );
  }

  return (
<section className="w-full space-y-4">
  <div>
    <h2 className="text-lg font-bold text-[#1F3864] sm:text-xl">
      My Books
    </h2>
    <p className="mt-1 text-sm text-gray-500">
      Books you have added to BookNook.
    </p>
  </div>

  <div className="grid gap-4 sm:grid-cols-1">
    {books.map((book) => (
      <article
        key={book._id}
        className="flex min-w-0 gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
      >
        <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100">
          {book.image ? (
            <Image
              src={book.image}
              alt={`Cover of ${book.title}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-2 text-center text-xs text-gray-400">
              No cover image
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-between"> 
        <div className=" min-w-0">
          <h3 className="line-clamp-2 wrap-break-word font-bold text-[#1F3864]">
            {book.title}
          </h3>

          <p className="mt-1 text-sm text-gray-600">{book.author}</p>

          <p className="mt-3 wrap-break-word text-xs text-gray-500">
            Added by: {book.userName || "Unknown"}
          </p>
          </div>
          <div className="flex gap-2">
          
          <EditBookDialog book={book} />
          <DeleteBookDialog id={book._id} />
          </div>
        </div> 
      </article>
    ))}
  </div>
</section>
  );
};

export default MyBooksCard;