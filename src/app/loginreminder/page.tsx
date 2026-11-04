import Link from "next/link";

export default function LoginReminder() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold text-[#1F3864]">
          Please sign in to access this page
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Sign in to continue using BookNook.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-block rounded-md bg-[#B3372B] px-5 py-2 font-semibold text-white hover:bg-[#172b4d]"
        >
          Go to Sign In
        </Link>
      </div>
    </main>
  );
}