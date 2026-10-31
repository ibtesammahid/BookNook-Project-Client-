"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";

const MAX_WORDS = 500;

/** Seeded with the site's categories so the dropdown is never empty. */
const DEFAULT_CATEGORIES = ["Fiction", "Non-Fiction", "Education", "Kids", "Self Help"];

/**
 * TODO(API): replace the body with your API call returning the previously
 * added categories as a string array.
 *
 * Example:
 *   const res = await fetch("https://your-api.example.com/categories");
 *   if (!res.ok) throw new Error("Failed to load categories");
 *   return res.json();
 */
async function fetchCategories(): Promise<string[]> {
  return DEFAULT_CATEGORIES;
}

/** Everything the backend needs to create a book. */
type NewBook = {
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  image: File;
  description: string;
  userName: string;
  userEmail: string;
};

/**
 * TODO(API): replace the body with your backend call — e.g. build FormData
 * from the fields below (append `image` as a file) and POST it. Once your
 * backend serves them, the book shows up on All Books and Recently Added.
 *
 * Example:
 *   const form = new FormData();
 *   form.append("title", book.title);
 *   form.append("author", book.author);
 *   form.append("category", book.category);
 *   form.append("totalCopies", String(book.totalCopies));
 *   form.append("description", book.description);
 *   form.append("userName", book.userName);
 *   form.append("userEmail", book.userEmail);
 *   form.append("image", book.image);
 *   const res = await fetch("/api/books", { method: "POST", body: form });
 *   if (!res.ok) throw new Error("Failed to add book");
 */
async function addBook(book: NewBook): Promise<void> {
  // Empty placeholder — add your backend here.
  console.log("TODO(API): addBook placeholder", book);
}

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

const INPUT_CLASS =
  "h-10 rounded-md border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-[#B3372B] focus-visible:ring-[#B3372B]/30";
const LABEL_CLASS = "text-sm font-semibold text-[#1F3864]";
const ERROR_CLASS = "text-sm text-[#B3372B]";

export default function AddBookForm() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [copies, setCopies] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetchCategories()
      .then((data) => {
        // Keep the seeded categories when the API returns nothing.
        if (!cancelled && data.length > 0) setCategories(data);
      })
      .catch((error) => console.error("Failed to load categories:", error));
    return () => {
      cancelled = true;
    };
  }, []);

  const wordCount = countWords(description);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = "Book title is required.";
    if (!author.trim()) next.author = "Author name is required.";
    if (!category) next.category = "Please select a category.";
    const totalCopies = Number(copies);
    if (!copies || !Number.isInteger(totalCopies) || totalCopies < 1) {
      next.copies = "Enter a whole number of at least 1.";
    }
    if (!image) next.image = "Please choose a book image.";
    if (!description.trim()) next.description = "Short description is required.";
    else if (wordCount > MAX_WORDS) {
      next.description = `Description must be ${MAX_WORDS} words or fewer.`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch("http://localhost:5000/addbooks", {
      method: "POST",
      body: JSON.stringify({
        title: title.trim(),
        author: author.trim(),
        category: category as string,
        totalCopies: Number(copies),
        image: image as File,
        description: description.trim(),
        userName: user?.name ?? "",
        userEmail: user?.email ?? "",
      }),
    });

    if (!res.ok) {
      setErrors({ submit: "Failed to add the book. Please try again." });
      return;
    }

    setSuccess(false);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await addBook({
        title: title.trim(),
        author: author.trim(),
        category: category as string,
        totalCopies: Number(copies),
        image: image as File,
        description: description.trim(),
        userName: user?.name ?? "",
        userEmail: user?.email ?? "",
      });
      // Reset for the next entry.
      setTitle("");
      setAuthor("");
      setCategory(null);
      setCopies("");
      setImage(null);
      setDescription("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSuccess(true);
    } catch (error) {
      console.error("Failed to add book:", error);
      setErrors({ submit: "Failed to add the book. Please try again." });
    } finally {
      setSubmitting(false);
    }
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="mx-auto max-w-3xl px-6">
      <Card className="rounded-2xl bg-[#F5F5F3] shadow-none ring-0">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-[#1F3864]">
            Book Information
          </CardTitle>
          <CardDescription className="text-gray-600">
            Fill in the details below to add a new book to the collection.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="book-title" className={LABEL_CLASS}>
                  Book Title
                </Label>
                <Input
                  id="book-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Beyond The Mountains"
                  className={INPUT_CLASS}
                />
                {errors.title && <p className={ERROR_CLASS}>{errors.title}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="book-author" className={LABEL_CLASS}>
                  Author Name
                </Label>
                <Input
                  id="book-author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Daniel Carter"
                  className={INPUT_CLASS}
                />
                {errors.author && <p className={ERROR_CLASS}>{errors.author}</p>}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label className={LABEL_CLASS}>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-10! w-full rounded-md border-gray-300 bg-white text-sm text-gray-900 focus-visible:border-[#B3372B] focus-visible:ring-[#B3372B]/30 data-placeholder:text-gray-400">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className={ERROR_CLASS}>{errors.category}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="book-copies" className={LABEL_CLASS}>
                  Total Copies
                </Label>
                <Input
                  id="book-copies"
                  type="number"
                  min={1}
                  step={1}
                  value={copies}
                  onChange={(e) => setCopies(e.target.value)}
                  placeholder="e.g. 25"
                  className={INPUT_CLASS}
                />
                {errors.copies && <p className={ERROR_CLASS}>{errors.copies}</p>}
              </div>
            </div>

            <div className="grid gap-2">
              <Label className={LABEL_CLASS}>Book Image</Label>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  ref={fileInputRef}
                  id="book-image"
                  type="file"
                  accept="image/*"
                  className="peer sr-only"
                  onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                />
                <Label
                  htmlFor="book-image"
                  className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 peer-focus-visible:border-[#B3372B] peer-focus-visible:ring-3 peer-focus-visible:ring-[#B3372B]/30"
                >
                  <ImagePlus className="h-4 w-4" />
                  Choose file
                </Label>
                <span className="max-w-full truncate text-sm text-gray-500">
                  {image ? image.name : "No file chosen"}
                </span>
              </div>
              {errors.image && <p className={ERROR_CLASS}>{errors.image}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="book-description" className={LABEL_CLASS}>
                Short Description
              </Label>
              <Textarea
                id="book-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short summary of the book…"
                className={`min-h-32 rounded-md border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-[#B3372B] focus-visible:ring-[#B3372B]/30 ${
                  errors.description ? "border-[#B3372B]" : ""
                }`}
              />
              <div className="flex justify-between gap-4 text-sm">
                <span className={ERROR_CLASS}>{errors.description}</span>
                <span
                  className={`shrink-0 ${
                    wordCount > MAX_WORDS ? "font-semibold text-[#B3372B]" : "text-gray-500"
                  }`}
                >
                  {wordCount}/{MAX_WORDS} words
                </span>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="user-name" className={LABEL_CLASS}>
                  User Name
                </Label>
                <Input
                  id="user-name"
                  readOnly
                  value={user?.name ?? ""}
                  placeholder="Not signed in"
                  className={`${INPUT_CLASS} cursor-not-allowed bg-gray-100 text-gray-600`}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="user-email" className={LABEL_CLASS}>
                  User Email
                </Label>
                <Input
                  id="user-email"
                  readOnly
                  value={user?.email ?? ""}
                  placeholder="Not signed in"
                  className={`${INPUT_CLASS} cursor-not-allowed bg-gray-100 text-gray-600`}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-5">
              <div className="text-sm">
                {errors.submit && <p className={ERROR_CLASS}>{errors.submit}</p>}
                {success && (
                  <p className="font-medium text-green-600">Book added successfully.</p>
                )}
                {!user && !errors.submit && !success && (
                  <p className="text-gray-500">
                    Not signed in — sign in so the book is linked to your account.
                  </p>
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="h-11 rounded-md bg-[#B3372B] px-10 text-sm font-semibold text-white hover:bg-[#B3372B]/90"
              >
                {submitting ? "Adding…" : "Add Book"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
