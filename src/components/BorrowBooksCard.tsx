"use client";

import Image from "next/image";
import { redirect } from "next/navigation";

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
          You haven’t borrowed any books yet.
        </p>
      </section>
    );
  }

  const handleReturn = async() => {
    const res = await fetch(`http://localhost:5000/my-borrows/${books._id}`, {
        method: 'DELETE'
    })
    const data = await res.json();
    console.log(data);
    redirect("/my-borrows");
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
            <h3 className="text-lg font-bold text-[#1F3864]">
              {book.bookTitle}
            </h3>

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
            <button
              type="button"
              disabled={book.returned}
              onClick={handleReturn}
              className="w-full rounded-md bg-[#B3372B] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto"
            >
              {book.returned ? "Returned" : "Return Book"}
            </button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default BorrowBooksCard;