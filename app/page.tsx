
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import Footer from "@/app/components/Footer";
import CategoryCarousel from "@/app/components/CategoryCarousel";

const features = [
  {
    title: "Made for freshers",
    text: "Every opening is meant for students and recent graduates. No experience needed.",
  },
  {
    title: "Apply in minutes",
    text: "Upload your resume as a PDF and apply to a job in a few clicks.",
  },
  {
    title: "Track every application",
    text: "See at a glance whether you are Applied, Shortlisted or Rejected.",
  },
];

const steps = [
  { title: "Create your account", text: "Register with your email in under a minute." },
  { title: "Search for jobs", text: "Find roles by job title or by city." },
  { title: "Apply with your resume", text: "Upload a PDF and send your application." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-white text-gray-900">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <img
          src="/hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/45" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-16 md:grid-cols-[1.1fr_0.9fr]">

          {/* Left: Hero Text */}
          <div className="j-in">
            <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-blue-100">
              Built for students and freshers
            </span>

            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Your first job <span className="text-sky-300">starts here</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100 sm:text-lg">
              CampusToCareer connects students and freshers with internships and
              entry-level jobs. Apply with your resume and track everything in one
              place.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 transition hover:scale-[1.03] hover:bg-blue-50"
              >
                Get started free
              </Link>

              <Link
                href="/login"
                className="rounded-lg border border-white px-6 py-3 text-white transition hover:bg-white/10"
              >
                I already have an account
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-blue-100 sm:text-sm">
              <span>✔ Free for students</span>
              <span>✔ 10 job categories</span>
              <span>✔ Track every application</span>
            </div>
          </div>

          {/* Right: Animated Journey */}
          <div
            className="j-in relative hidden h-[340px] md:block"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="j-float-a absolute inset-x-0 top-4 mx-auto w-[90%] rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md">

              <p className="font-semibold">Your path to a first job</p>
              <p className="mt-1 text-xs text-blue-200">
                Three simple steps
              </p>

              {/* Journey Steps */}
              <div className="relative mt-5">

                {/* Background path */}
                <div className="absolute left-[19px] top-5 h-[144px] w-0.5 bg-white/20" />

                {/* Green travelling paths */}
                <div className="j-path-1 absolute left-[19px] top-5 h-[72px] w-[3px] origin-top rounded-full bg-green-400" />

                <div className="j-path-2 absolute left-[19px] top-[92px] h-[72px] w-[3px] origin-top rounded-full bg-green-400" />

                <div className="space-y-6">
                  {[
                    {
                      n: 1,
                      title: "Apply with your resume",
                      text: "Upload a PDF in one click",
                    },
                    {
                      n: 2,
                      title: "Get shortlisted",
                      text: "Track the status online",
                    },
                    {
                      n: 3,
                      title: "Receive interview details",
                      text: "Date, time and place",
                    },
                  ].map((s) => (
                    <div
                      key={s.n}
                      className="relative z-10 flex h-12 items-start gap-4"
                    >
                      {/* Number changes into a green tick */}
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-slate-900/90 text-sm font-semibold">
                        {s.n}

                        <span
                          className={`j-dot-${s.n} absolute inset-0 flex items-center justify-center rounded-full bg-green-500 opacity-0`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="m5 12 5 5 9-10" />
                          </svg>
                        </span>
                      </div>

                      {/* Step Text */}
                      <div className={`j-row-${s.n}`}>
                        <p className="text-sm font-semibold">{s.title}</p>
                        <p className="text-xs text-blue-200">{s.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Interview Card */}
            <div className="j-float-b absolute -bottom-3 left-0 flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5 text-gray-900 shadow-xl">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3v4M8 3v4M3 11h18" />
                </svg>
              </span>

              <span>
                <span className="block text-xs text-gray-500">
                  Interview scheduled
                </span>
                <span className="block text-sm font-semibold">
                  Shown in My Applications
                </span>
              </span>
            </div>

            {/* Floating Category Card */}
            <div className="j-float-a absolute right-0 top-0 rounded-2xl bg-white px-4 py-3 text-gray-900 shadow-xl">
              <span className="block text-xs text-gray-500">Explore</span>
              <span className="block text-sm font-semibold">
                10 job categories
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <div className="w-full min-w-0 overflow-hidden">
        <CategoryCarousel />
      </div>

      {/* Search Section */}
      <section className="section-tint mt-0 w-full min-w-0 border-t border-gray-200">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-14">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
            Find Your First Opportunity
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
            Explore internships and entry-level jobs designed for students and
            freshers.
          </p>

          <form
            action="/jobs"
            method="get"
            className="mt-6 rounded-2xl border border-gray-200 bg-white p-3 text-left shadow-sm sm:mt-8"
          >
            <div className="flex min-w-0 items-center gap-3 border-b border-gray-200 px-2 py-3 sm:px-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="shrink-0 text-gray-500"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>

              <input
                type="text"
                name="q"
                placeholder="What job are you looking for?"
                className="w-full min-w-0 text-sm text-gray-900 outline-none placeholder:text-gray-500 sm:text-base"
              />
            </div>

            <div className="flex min-w-0 items-center gap-3 px-2 py-3 sm:px-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-gray-500"
              >
                <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              <input
                type="text"
                name="location"
                placeholder="Enter city or preferred location"
                className="w-full min-w-0 text-sm text-gray-900 outline-none placeholder:text-gray-500 sm:text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Jobs
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-500 sm:text-sm">
            Internships · Freshers Jobs · Entry-Level Roles
          </p>
        </div>
      </section>

      {/* Why CampusToCareer */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-center text-xl font-bold sm:text-2xl">
          Why CampusToCareer?
        </h2>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6"
            >
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="w-full scroll-mt-20 bg-gray-50"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="text-center text-xl font-bold sm:text-2xl">
            How it works
          </h2>

          <div className="mt-8 grid gap-8 sm:mt-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  {i + 1}
                </div>

                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
