import { Suspense } from "react";
import BookDetails from "@/components/BookDetails";
import BookDetailsSkeleton from "@/components/skeletons/BookDetailsSkeleton";

type PageProps = { params: Promise<{ id: string }> };

export default function BookDetailsPage({ params }: PageProps) {
  // params must be read inside <Suspense> when cacheComponents is enabled —
  // otherwise the route cannot be prerendered (see build error docs).
  // The fallback is the same skeleton as loading.tsx for a seamless swap.
  return (
    <Suspense fallback={<BookDetailsSkeleton />}>
      <BookDetailsContent params={params} />
    </Suspense>
  );
}

async function BookDetailsContent({ params }: PageProps) {
  const { id } = await params;
  // key forces a remount per book, so loading/error state resets on id change.
  return <BookDetails key={id} id={id} />;
}
