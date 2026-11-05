import Image from "next/image";
import Link from "next/link";
import { Library } from "lucide-react";

import category1 from "@/assets/DiscoverBooks/category-item-image-1.png";
import category2 from "@/assets/DiscoverBooks/category-item-image-2.png";
import category3 from "@/assets/DiscoverBooks/category-item-image-3.png";
import category4 from "@/assets/DiscoverBooks/category-item-image-4.png";
import category5 from "@/assets/DiscoverBooks/category-item-image-5.png";
import category6 from "@/assets/DiscoverBooks/category-item-image-6.png";

// TODO: temporary stand-ins — swap for the promo mockups when they land in assets.
import promoClassic from "@/assets/DiscoverBooks/Book1.jpg";
import promoTravel from "@/assets/DiscoverBooks/Book4.webp";
import promoGrowth from "@/assets/DiscoverBooks/Book3.webp";

/** Every card links to the all-books page. */
const CATEGORIES = [
  { name: "Fiction", count: 21, image: category1 },
  { name: "Non-Fiction", count: 24, image: category2 },
  { name: "Education", count: 20, image: category3 },
  { name: "Kids", count: 32, image: category4 },
  { name: "Self Help", count: 12, image: category5 },
  { name: "Comics", count: 28, image: category6 },
];

const PROMOS = [
  {
    title: "Classic read",
    subtitle: "Timeless Books Forever",
    tint: "bg-[#e0deda]",
    image: promoClassic,
  },
  {
    title: "Travel Books",
    subtitle: "Journey Through Every Page",
    tint: "bg-[#cfcfcf]",
    image: promoTravel,
  },
  {
    title: "Self Growth",
    subtitle: "Learn, Improve, Succeed",
    tint: "bg-[#d1c3a1]",
    image: promoGrowth,
  },
];

const DiscoverBooks = () => {
  return (
    <section aria-label="Shop by categories" className="py-16">
      {/* Section header */}
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
        <p className="mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-[#B3372B]">
          <Library className="h-5 w-5" />
          Shop by Categories
        </p>
        <h2 className="text-3xl font-bold text-[#1F3864] md:text-4xl lg:text-5xl">
          Discover Stories for Everyone
        </h2>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-6">
        {/* Category tiles — transparent PNGs sit directly on the card */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map(({ name, count, image }) => (
            <Link
              key={name}
              href="/books"
              className="group rounded-xl bg-[#F7F4EF] p-4 text-center transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image}
                  alt={`${name} books`}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#1F3864]">{name}</h3>
              <p className="mt-1 text-sm text-gray-600">{count} items</p>
            </Link>
          ))}
        </div>

        {/* Promo cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {PROMOS.map(({ title, subtitle, tint, image }) => (
            <Link
              key={title}
              href="#"
              className={`group overflow-hidden rounded-2xl transition-shadow hover:shadow-md ${tint}`}
            >
              <div className="px-6 pt-8 pb-6 text-center">
                <h3 className="text-2xl font-bold text-[#1F3864]">{title}</h3>
                <p className="mt-1 text-gray-600">{subtitle}</p>
              </div>
              <div className="relative aspect-16/10">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 768px) 33vw, 92vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverBooks;
