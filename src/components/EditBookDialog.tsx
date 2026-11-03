
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MdEdit } from "react-icons/md";
import { Button } from "@base-ui/react";
import { ImagePlus } from "lucide-react";
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
import { useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";

const MAX_WORDS = 500;

const DEFAULT_CATEGORIES = [
  "Fiction",
  "Non-Fiction",
  "Education",
  "Kids",
  "Self Help",
];

const countWords = (text: string) =>
  text.trim().split(/\s+/).filter(Boolean).length;

const INPUT_CLASS =
  "h-10 rounded-md border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-[#B3372B] focus-visible:ring-[#B3372B]/30";

const LABEL_CLASS = "text-sm font-semibold text-[#1F3864]";
const ERROR_CLASS = "text-sm text-[#B3372B]";

type NewBook = {
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  image: string;
  description: string;
  userName: string;
  userEmail: string;
};

type EditBookProps = NewBook & {
  _id: string;
};

// Upload a new image to your Express backend.
async function uploadImage(image: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", image);

  const res = await fetch("http://localhost:5000/upload-image", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Image upload failed");
  }

  return data.imageUrl;
}

// Update an existing book in MongoDB.
async function updateBook(
    id: string,
  book: Partial<NewBook>
) {
  const res = await fetch(`http://localhost:5000/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update book");
  }

  return data;
}

const EditBookDialog = ({ book }: { book: EditBookProps }) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [category, setCategory] = useState(book.category);
  const [copies, setCopies] = useState(String(book.totalCopies));
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState(book.description);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = countWords(description);

  // Validate all fields before submission.
  const validate = () => {
    const next: Record<string, string> = {};

    if (!title.trim()) {
      next.title = "Book title is required.";
    }

    if (!author.trim()) {
      next.author = "Author name is required.";
    }

    if (!category) {
      next.category = "Please select a category.";
    }

    const totalCopies = Number(copies);

    if (
      !copies ||
      !Number.isInteger(totalCopies) ||
      totalCopies < 1
    ) {
      next.copies = "Enter a whole number of at least 1.";
    }

    if (!description.trim()) {
      next.description = "Short description is required.";
    } else if (wordCount > MAX_WORDS) {
      next.description = `Description must be ${MAX_WORDS} words or fewer.`;
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  // Handle form submission.
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSuccess(false);

    if (!validate()) return;

    setSubmitting(true);

    try {
      // Keep the current image unless a new image is selected.
      const imageUrl = image
        ? await uploadImage(image)
        : book.image;

      const updatedBook: Partial<NewBook> = {
        title: title.trim(),
        author: author.trim(),
        category,
        totalCopies: Number(copies),
        image: imageUrl,
        description: description.trim(),
        userName: book.userName,
        userEmail: book.userEmail,
      };

      // Update the existing book using its MongoDB ID.
      await updateBook(book._id, updatedBook);

      setSuccess(true);
      setErrors({});
    } catch (error) {
      console.error("Failed to update book:", error);

      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Failed to update the book. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="mt-4 inline-flex w-fit items-center gap-1 rounded-md bg-[#B3372B] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <MdEdit />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>

          <DialogDescription>
            Update the information of your book.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5"
          noValidate
        >
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

              {errors.title && (
                <p className={ERROR_CLASS}>{errors.title}</p>
              )}
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

              {errors.author && (
                <p className={ERROR_CLASS}>{errors.author}</p>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label className={LABEL_CLASS}>Category</Label>

              <Select
                value={category}
                onValueChange={(value) => {
                  if (value !== null) setCategory(value);
                }}
              >
                <SelectTrigger className="h-10! w-full rounded-md border-gray-300 bg-white text-sm text-gray-900">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>

                <SelectContent className="bg-white">
                  {DEFAULT_CATEGORIES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.category && (
                <p className={ERROR_CLASS}>{errors.category}</p>
              )}
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

              {errors.copies && (
                <p className={ERROR_CLASS}>{errors.copies}</p>
              )}
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
                onChange={(e) =>
                  setImage(e.target.files?.[0] ?? null)
                }
              />

              <Label
                htmlFor="book-image"
                className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 peer-focus-visible:border-[#B3372B] peer-focus-visible:ring-3 peer-focus-visible:ring-[#B3372B]/30"
              >
                <ImagePlus className="h-4 w-4" />
                Choose file
              </Label>

              <span className="max-w-full truncate text-sm text-gray-500">
                {image ? image.name : "Keep current image"}
              </span>
            </div>

            {errors.image && (
              <p className={ERROR_CLASS}>{errors.image}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="book-description"
              className={LABEL_CLASS}
            >
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
              <span className={ERROR_CLASS}>
                {errors.description}
              </span>

              <span
                className={`shrink-0 ${
                  wordCount > MAX_WORDS
                    ? "font-semibold text-[#B3372B]"
                    : "text-gray-500"
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
                value={isPending ? "Getting name..." : user?.name ?? ""}
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
                value={
                  isPending ? "Getting email..." : user?.email ?? ""
                }
                placeholder="Not signed in"
                className={`${INPUT_CLASS} cursor-not-allowed bg-gray-100 text-gray-600`}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-5">
            <div className="text-sm">
              {errors.submit && (
                <p className={ERROR_CLASS}>{errors.submit}</p>
              )}

              {success && (
                <p className="font-medium text-green-600">
                  Book updated successfully.
                </p>
              )}

              {!user && !errors.submit && !success && (
                <p className="text-gray-500">
                  Not signed in — sign in so the book is linked to your account.
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="h-11 rounded-md bg-[#B3372B] px-10 text-sm font-semibold text-white hover:bg-[#B3372B]/90"
            >
              {submitting ? "Updating…" : "Update Book"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookDialog;
