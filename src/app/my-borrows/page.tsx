import BorrowBooksCard from "@/components/BorrowBooksCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyBorrowsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const res = await fetch(`http://localhost:5000/my-borrows/${user?.email}`);
  const borrowedBooks = await res.json();
  console.log(borrowedBooks);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <BorrowBooksCard books={borrowedBooks} />
    </main>
  );
};

export default MyBorrowsPage;
