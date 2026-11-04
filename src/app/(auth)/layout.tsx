export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">{children}</div>
    </section>
  );
}
