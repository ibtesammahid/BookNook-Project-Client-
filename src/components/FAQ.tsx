"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Mail, PhoneCall } from "lucide-react";

const FAQS = [
    {
        question: "How do I borrow a book?",
        answer:
            "Sign in to your BookNook account, open the book@apos;s details page, and click Borrow Book. Confirm your account details to complete the request.",
    },
    {
        question: "Can I borrow more than one copy of a book?",
        answer:
            "Each borrow request is for one copy. You can borrow a book only if copies are available.",
    },
    {
        question: "Where can I see the books I borrowed?",
        answer:
            "Visit the My Borrows page while signed in to view your borrowed books.",
    },
    {
        question: "How do I return a borrowed book?",
        answer:
            "Go to My Borrows, find the book you want to return, and click Return. The book will no longer appear as currently borrowed.",
    },
    {
        question: "Can I add books to BookNook?",
        answer:
            "Yes. Sign in and visit Add Books to submit a book with its title, author, category, description, image, and available copies",
    },
];

const CONTACTS = [
    { icon: PhoneCall, label: "Call Us!", value: "123-456-7890" },
    { icon: Mail, label: "Email", value: "support@booknook.com" },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex((current) => (current === index ? null : index));
    };

    return (
        <section aria-label="Frequently asked questions" className="bg-[#F7F4EF] py-16">
            <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-2 lg:gap-16">
                {/* Left column — heading + contact info */}
                <div>
                    <span aria-hidden="true" className="mb-6 block h-2.5 w-2.5 rounded-full bg-[#B3372B]" />

                    <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#B3372B]">
                        <BookOpen className="h-5 w-5" />
                        Frequently Asked Questions
                    </p>

                    <h2 className="text-3xl font-bold leading-tight text-[#1F3864] md:text-4xl lg:text-5xl">
                        Everything you Need to Know Before you Shop
                    </h2>

                    <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
                        Find answers to common questions about orders, shipping, payments, returns,
                        book availability, and customer support.
                    </p>

                    {/* Divider + contact details */}
                    <div className="mt-10 border-t border-gray-200 pt-8">
                        <div className="flex flex-wrap gap-8">
                            {CONTACTS.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-center gap-3">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#B3372B] text-white">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="font-semibold text-[#1F3864]">{label}</p>
                                        <p className="text-gray-600">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right column — accordion card */}
                <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
                    <ul>
                        {FAQS.map(({ question, answer }, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <li key={question} className="border-b border-gray-200 last:border-b-0">
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        onClick={() => toggle(index)}
                                        className="flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left"
                                    >
                                        <span className="font-semibold text-[#1F3864]">
                                            {index + 1}. {question}
                                        </span>
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#B3372B] text-white">
                                            {isOpen ? (
                                                <ChevronUp className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <p className="pb-5 pr-12 leading-7 text-gray-600">{answer}</p>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
