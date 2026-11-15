import MyBorrowsSkeleton from "@/components/skeletons/MyBorrowsSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <MyBorrowsSkeleton />
    </main>
  );
}
