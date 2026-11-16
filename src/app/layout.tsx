import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";
import { Toaster } from "@/components/ui/toast"
import AOSProvider from "@/components/AOSProvider";



const poppins = Poppins({
  weight: "400",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  // Template only — no default/absolute. Routes with their own title get
  // "BookNook | <title>"; client pages that set <title> in JSX resolve to an
  // empty string here, so only their JSX title renders (no duplicates).
  title: { template: "BookNook | %s" } as Metadata["title"],
  description:
    "BookNook — a small online library. Browse books, add your own, and borrow a book for a few days.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
        <AOSProvider />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
