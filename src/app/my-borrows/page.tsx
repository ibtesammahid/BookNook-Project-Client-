import BorrowBooksCard from "@/components/BorrowBooksCard";
import type { BorrowedBook } from "@/components/BorrowBooksCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Borrows",
};

const MyBorrowsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  // Not signed in — don't call the API with an empty email/no token,
  // which would only come back as a `{ message }` error object.
  if (!user?.email) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <section className="w-full rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
          <h2 className="text-lg font-bold text-[#1F3864]">My Borrows</h2>
          <p className="mt-2 text-sm text-gray-500">
            Please sign in to view your borrows.
          </p>
        </section>
      </main>
    );
  }

  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  let borrowedBooks: BorrowedBook[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-borrows/${encodeURIComponent(user.email)}`,
      {
        headers: jwtToken?.token
          ? { Authorization: `Bearer ${jwtToken.token}` }
          : undefined,
        cache: "no-store",
      },
    );

    // The backend answers errors (401/403/500) with `{ message }`, never an
    // array — guard both status and shape so a bad response can't crash
    // `books.map(...)` in BorrowBooksCard.
    if (res.ok) {
      const data: unknown = await res.json();
      borrowedBooks = Array.isArray(data) ? (data as BorrowedBook[]) : [];
      if (!Array.isArray(data)) {
        console.error("Unexpected /my-borrows response shape:", data);
      }
    } else {
      console.error(`Failed to load borrows: HTTP ${res.status}`);
    }
  } catch (error) {
    console.error("Error loading borrows:", error);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6" data-aos="fade-up">
      <BorrowBooksCard books={borrowedBooks} />
    </main>
  );
};

export default MyBorrowsPage;
