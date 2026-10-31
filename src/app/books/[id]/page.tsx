import { Suspense } from "react";
import BookDetails from "@/components/BookDetails";

type PageProps = { params: Promise<{ id: string }> };

export default function BookDetailsPage({ params }: PageProps) {
  // params must be read inside <Suspense> when cacheComponents is enabled —
  // otherwise the route cannot be prerendered (see build error docs).
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-3xl animate-pulse px-6 py-12">
          <div className="h-4 w-64 rounded bg-gray-200" />
          <div className="mt-10 h-9 w-3/4 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-40 rounded bg-gray-200" />
          <div className="mt-8 h-px w-full bg-gray-200" />
          <div className="mt-6 space-y-3">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
          </div>
        </section>
      }
    >
      <BookDetailsContent params={params} />
    </Suspense>
  );
}

async function BookDetailsContent({ params }: PageProps) {
  const { id } = await params;
  return <BookDetails id={id} />;
}
