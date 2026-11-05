"use client";

import Image from "next/image";
import BorrowBookDialog from "@/components/ReturnBookDialog";
import Link from "next/link";

export type BorrowedBook = {
  _id: string;
  bookTitle: string;
  bookImage?: string | null;
  borrowDate: string;
  returnDate: string;
  returned?: boolean;
};

type BorrowBooksCardProps = {
  books: BorrowedBook[];
  onReturn?: (borrowId: string) => void;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString();

const BorrowBooksCard = ({ books }: BorrowBooksCardProps) => {
  if (books.length === 0) {
    return (
      <section className="w-full rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
        <h2 className="text-lg font-bold text-[#1F3864]">My Borrows</h2>
        <p className="mt-2 text-sm text-gray-500">
          You haven@apos;t borrowed any books yet.
        </p>
      </section>
    );
  }


  return (
    <section className="w-full space-y-4">
      <div>
        <h2 className="text-lg font-bold text-[#1F3864] sm:text-xl">
          My Borrows
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Books you have borrowed from BookNook.
        </p>
      </div>

      {books.map((book) => (
        <article
          key={book._id}
          className="flex w-full flex-col gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
        >
          {/* Book cover */}
          <div className="relative h-36 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100">
            {book.bookImage && (
              <Image
                src={book.bookImage}
                alt={`Cover of ${book.bookTitle}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            )}
          </div>

          {/* Book details */}
          <div className="min-w-0 flex-1">
            <Link key={book._id} href={`/books/${book._id}`} className="hover:underline">
            <h3 className="text-lg font-bold text-[#1F3864]">
              {book.bookTitle}
            </h3> 
            </Link>

            <div className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  Borrow Date:
                </span>{" "}
                {formatDate(book.borrowDate)}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  Return Date:
                </span>{" "}
                {formatDate(book.returnDate)} <span className="text-sm text-gray-400">(After 14 days)</span>
              </p>
            </div>
          </div>

          {/* Return action */}
          <div className="shrink-0 sm:ml-auto">
            
            <BorrowBookDialog book={book} />
          </div>
        </article>
      ))}
    </section>
  );
};

export default BorrowBooksCard;