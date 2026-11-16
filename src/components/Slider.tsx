"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Library } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import bannerBhautik from "@/assets/banner/bhautik-patel-DWkI7bCokDU-unsplash.jpg";
import bannerLibrary from "@/assets/banner/books-in-the-library-ai-generated-photo.jpg";
import bannerJessica from "@/assets/banner/jessica-ruscello-OQSCtabGkSY-unsplash.jpg";
import bannerPierre from "@/assets/banner/pierre-bamin-lM4_Nmcj4Xk-unsplash.jpg";
import bannerSusan from "@/assets/banner/susan-q-yin-2JIvboGLeho-unsplash.jpg";
import bannerUgur from "@/assets/banner/ugur-akdemir-XT-o5O458as-unsplash.jpg";
import bannerWill from "@/assets/banner/will-van-wingerden-dsvJgiBJTOs-unsplash.jpg";

/** Red sampled from the reference banner (eyebrow text + button). */
const ACCENT = "#8c2b22";
/** Navy heading color from the reference banner. */
const HEADING = "#1F3864";

const SLIDES = [
  {
    src: bannerBhautik,
    headline: "Discover Your Next Favorite Book",
    sub: "Explore bestselling novels, timeless classics, self-growth guides, and hidden gems carefully curated for every kind of reader.",
  },
  {
    src: bannerLibrary,
    headline: "Stories That Stay With You",
    sub: "From gripping thrillers to tender memoirs, find books that keep you turning pages long past midnight.",
  },
  {
    src: bannerJessica,
    headline: "Curated For Every Reader",
    sub: "Handpicked collections for fiction lovers, lifelong learners, and everyone in between.",
  },
  {
    src: bannerPierre,
    headline: "Classics Worth Re-Reading",
    sub: "Timeless masterpieces that shaped generations of readers — including yours.",
  },
  {
    src: bannerSusan,
    headline: "Grow With Every Chapter",
    sub: "Self-growth guides and practical wisdom to help you learn, focus, and thrive.",
  },
  {
    src: bannerUgur,
    headline: "Fresh Reads Every Week",
    sub: "New arrivals and bestsellers added constantly, so your next favorite is always within reach.",
  },
  {
    src: bannerWill,
    headline: "Reading For Young Minds",
    sub: "Wonder-filled stories and picture books that spark imagination in readers of every age.",
  },
];

const AUTOPLAY_MS = 10000;

export default function Slider() {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [index, setIndex] = useState(0);

  // Autoplay respects prefers-reduced-motion (pause on hover is built in).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      swiperRef.current?.autoplay?.stop();
    }
  }, []);

  return (
    <section
      data-aos="fade-up"
      aria-label="Featured books"
      className="relative w-full overflow-hidden"
    >
      <Swiper
        modules={[Autoplay]}
        loop
        speed={700}
        autoplay={{
          delay: AUTOPLAY_MS,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setIndex(swiper.realIndex)}
        className="w-full"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i}>
            <article className="relative h-[calc(100dvh-4rem)] w-full sm:h-[calc(100dvh-4.5rem)] md:h-[calc(100dvh-7.5rem)]">
              {/* Background photo */}
              <Image
                src={slide.src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              {/* Light overlay so the copy stays readable over any photo */}
              <div className="absolute inset-0 bg-linear-to-r from-[#EDEBE6] via-[#EDEBE6]/90 to-[#EDEBE6]/20 md:via-[#EDEBE6]/80 md:to-transparent" />

              {/* Copy — matches the reference banner */}
              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
                <div className="max-w-xl py-16">
                  <p
                    className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                    style={{ color: ACCENT }}
                  >
                    <Library className="h-5 w-5" />
                    Read better every day
                  </p>
                  {i === 0 ? (
                    <h1
                      className="mb-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
                      style={{ color: HEADING }}
                    >
                      {slide.headline}
                    </h1>
                  ) : (
                    <h2
                      className="mb-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
                      style={{ color: HEADING }}
                    >
                      {slide.headline}
                    </h2>
                  )}
                  <p className="mb-8 text-base text-gray-600 sm:text-lg">
                    {slide.sub}
                  </p>
                  <Link
                    href="/books"
                    className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Browse Books
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Arrows (desktop) */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-3 text-[#1F3864] shadow-md transition-colors hover:bg-white md:block"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-3 text-[#1F3864] shadow-md transition-colors hover:bg-white md:block"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className={`h-2 cursor-pointer rounded-full transition-all ${
              i === index ? "w-6" : "w-2 bg-black/20 hover:bg-black/40"
            }`}
            style={i === index ? { backgroundColor: ACCENT } : undefined}
          />
        ))}
      </div>
    </section>
  );
}
