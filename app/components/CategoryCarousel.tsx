
"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_MS = 1000;

type Category = {
  key: string;
  title: string;
  text: string;
  cardColor: string;
  iconColor: string;
  icon: React.ReactNode;
};

const svg = (children: React.ReactNode) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const categories: Category[] = [
  {
    key: "it",
    title: "IT & Software",
    text: "Development, Programming, IT Support",
    cardColor: "!bg-blue-50 !border-blue-100",
    iconColor: "!bg-blue-100 !text-blue-700",
    icon: svg(<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />),
  },
  {
    key: "marketing",
    title: "Marketing",
    text: "Social Media, SEO, Content",
    cardColor: "bg-purple-50 border-purple-100",
    iconColor: "bg-purple-100 text-purple-700",
    icon: svg(
      <>
        <path d="m3 11 14-6v14L3 13v-2Z" />
        <path d="M7 13.5V19a1.5 1.5 0 0 0 3 0v-4.5" />
      </>
    ),
  },
  {
    key: "design",
    title: "Design",
    text: "UI/UX, Graphic Design, Video Editing",
    cardColor: "bg-pink-50 border-pink-100",
    iconColor: "bg-pink-100 text-pink-700",
    icon: svg(
      <>
        <path d="M12 3a9 9 0 1 0 0 18c1.7 0 2.5-1 2.5-2.2 0-1.3-1-1.6-1-2.8 0-1 .8-1.5 1.8-1.5H17a4 4 0 0 0 4-4C21 6.5 17 3 12 3Z" />
        <circle cx="7.5" cy="11" r="1" />
        <circle cx="10" cy="7" r="1" />
        <circle cx="15" cy="7.5" r="1" />
      </>
    ),
  },
  {
    key: "business",
    title: "Business & HR",
    text: "HR, Sales, Business, Operations",
    cardColor: "bg-green-50 border-green-100",
    iconColor: "bg-green-100 text-green-700",
    icon: svg(
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
      </>
    ),
  },
  {
    key: "finance",
    title: "Finance & Accounting",
    text: "Accounts, Audit, Banking, Taxation",
    cardColor: "bg-amber-50 border-amber-100",
    iconColor: "bg-amber-100 text-amber-700",
    icon: svg(
      <>
        <path d="M6 3h12M6 8h12m-12 5 8.5 8M6 13h3m0 0c6.667 0 6.667-10 0-10" />
      </>
    ),
  },
  {
    key: "data",
    title: "Data & AI",
    text: "Data Analytics, AI, Machine Learning",
    cardColor: "bg-cyan-50 border-cyan-100",
    iconColor: "bg-cyan-100 text-cyan-700",
    icon: svg(
      <>
        <path d="M3 3v18h18" />
        <path d="M18 17V9M13 17V5M8 17v-3" />
      </>
    ),
  },
  {
    key: "supply",
    title: "Supply Chain & Logistics",
    text: "Logistics, Supply Chain, Coordination",
    cardColor: "bg-orange-50 border-orange-100",
    iconColor: "bg-orange-100 text-orange-700",
    icon: svg(
      <>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </>
    ),
  },
  {
    key: "education",
    title: "Education",
    text: "Tutoring, Teaching, Academic Support",
    cardColor: "bg-teal-50 border-teal-100",
    iconColor: "bg-teal-100 text-teal-700",
    icon: svg(
      <>
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </>
    ),
  },
  {
    key: "engineering",
    title: "Engineering",
    text: "Mechanical, Electrical, Civil, Production",
    cardColor: "bg-indigo-50 border-indigo-100",
    iconColor: "bg-indigo-100 text-indigo-700",
    icon: svg(
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
  },
  {
    key: "customer-support",
    title: "Customer Support",
    text: "Customer Service, Technical Support",
    cardColor: "bg-rose-50 border-rose-100",
    iconColor: "bg-rose-100 text-rose-700",
    icon: svg(
      <>
        <path d="M3 11a9 9 0 0 1 18 0" />
        <path d="M3 11v5a2 2 0 0 0 2 2h2v-7H5a2 2 0 0 0-2 2Z" />
        <path d="M21 11v5a2 2 0 0 1-2 2h-2v-7h2a2 2 0 0 1 2 2Z" />
        <path d="M17 18a5 5 0 0 1-5 3" />
      </>
    ),
  },
];

export default function CategoryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [active, setActive] = useState(0);
  const [slides, setSlides] = useState(1);

  const stepSize = useCallback(() => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;

    if (!el || !first) return 0;

    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  const update = useCallback(() => {
    const el = trackRef.current;
    const s = stepSize();

    if (!el || !s) return;

    const last = Math.max(
      0,
      Math.ceil((el.scrollWidth - el.clientWidth) / s)
    );

    setSlides(last + 1);
    setActive(Math.min(Math.round(el.scrollLeft / s), last));
  }, [stepSize]);

  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current;
      const s = stepSize();

      if (!el || !s) return;

      el.scrollTo({
        left: i * s,
        behavior: "smooth",
      });
    },
    [stepSize]
  );

  const next = useCallback(() => {
    const nextIndex = active >= slides - 1 ? 0 : active + 1;
    goTo(nextIndex);
  }, [active, slides, goTo]);

  const prev = useCallback(() => {
    const prevIndex = active <= 0 ? slides - 1 : active - 1;
    goTo(prevIndex);
  }, [active, slides, goTo]);

  useEffect(() => {
    update();

    const id = requestAnimationFrame(update);
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const id = setInterval(() => {
      if (!pausedRef.current && !document.hidden) {
        next();
      }
    }, AUTOPLAY_MS);

    return () => clearInterval(id);
  }, [next]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
    };
  }, []);

  const pause = () => {
    pausedRef.current = true;

    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
    }
  };

  const resume = (delay: number) => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
    }

    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, delay);
  };

  const arrowClass =
    "hidden md:flex shrink-0 w-10 h-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200";

  return (
    <section
      id="categories"
      className="mx-auto w-full max-w-6xl min-w-0 overflow-hidden px-4 py-10 sm:px-6 sm:py-14"
      aria-roledescription="carousel"
      aria-label="Job categories"
    >
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Explore by Category
        </h2>

        <Link
          href="/jobs"
          className="whitespace-nowrap text-sm text-blue-600 hover:underline"
        >
          View all jobs →
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative mt-6 sm:mt-8">
        <div
          ref={trackRef}
          onScroll={update}
          onMouseEnter={pause}
          onMouseLeave={() => resume(500)}
          onFocus={pause}
          onBlur={() => resume(500)}
          onTouchStart={pause}
          onTouchEnd={() => resume(4000)}
          className="flex w-full min-w-0 gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth py-3 -my-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((c) => (
            <Link
              key={c.key}
              href={`/jobs?category=${c.key}`}
              className={`box-border min-w-0 shrink-0 snap-start basis-full sm:basis-[calc((100%_-_1rem)/2)] lg:basis-[calc((100%_-_3rem)/4)] rounded-2xl border p-5 text-center sm:p-6 ${
                c.cardColor
              } hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-300`}
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl ${c.iconColor}`}
              >
                {c.icon}
              </div>

              <h3
                className={`mt-4 font-semibold ${
                  c.key === "it" ? "!text-gray-900" : "text-gray-900"
                }`}
              >
                {c.title}
              </h3>

              <p
                className={`mt-1 text-sm ${
                  c.key === "it" ? "!text-gray-600" : "text-gray-600"
                }`}
              >
                {c.text}
              </p>
            </Link>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous categories"
          className={`absolute top-1/2 -left-13 z-10 -translate-y-1/2 ${arrowClass}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={next}
          aria-label="Next categories"
          className={`absolute top-1/2 -right-13 z-10 -translate-y-1/2 ${arrowClass}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: slides }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to category slide ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active
                ? "w-6 bg-blue-600"
                : "w-2 bg-gray-300 hover:bg-blue-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
