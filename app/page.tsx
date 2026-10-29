import Link from "next/link";
import Logo from "@/app/components/Logo";

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

const categories = [
  {
    key: "it",
    color: "cat-blue",
    title: "IT & Software",
    text: "Developer, IT Support",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
      </svg>
    ),
  },
  {
    key: "marketing",
    color: "cat-purple",
    title: "Marketing",
    text: "Social Media, SEO, Content",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 14-6v14L3 13v-2Z" />
        <path d="M7 13.5V19a1.5 1.5 0 0 0 3 0v-4.5" />
      </svg>
    ),
  },
  {
    key: "design",
    color: "cat-pink",
    title: "Design",
    text: "UI/UX, Graphic Design",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a9 9 0 1 0 0 18c1.7 0 2.5-1 2.5-2.2 0-1.3-1-1.6-1-2.8 0-1 .8-1.5 1.8-1.5H17a4 4 0 0 0 4-4C21 6.5 17 3 12 3Z" />
        <circle cx="7.5" cy="11" r="1" />
        <circle cx="10" cy="7" r="1" />
        <circle cx="15" cy="7.5" r="1" />
      </svg>
    ),
  },
  {
    key: "business",
    color: "cat-green",
    title: "Business & HR",
    text: "HR, Sales, Operations",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Logo size={60} />
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/login" className="text-gray-700 hover:text-blue-700">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden text-white">
        <img
          src="/hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/85" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your first job starts here
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            CampusToCareer connects students and freshers with internships and
            entry-level jobs. Search, apply and track everything in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/register"
              className="bg-[#ffffff] text-[#1d4ed8] font-semibold px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              Get started free
            </Link>
            <Link
              href="/login"
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Explore by Category
          </h2>
          <Link
            href="/jobs"
            className="text-sm text-blue-600 hover:underline whitespace-nowrap"
          >
            View all jobs →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link
              key={c.key}
              href={`/jobs?category=${c.key}`}
              className={`cat-card ${c.color} rounded-2xl p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition`}
            >
              <div className="cat-icon mx-auto w-14 h-14 rounded-xl flex items-center justify-center">
                {c.icon}
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{c.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{c.text}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Search section */}
      <section className="bg-blue-50">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Find Your First Opportunity
          </h2>
          <p className="mt-2 text-gray-600">
            Explore internships and entry-level jobs designed for students and
            freshers.
          </p>

          <form
            action="/jobs"
            method="get"
            className="mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-3 text-left"
          >
            <div className="flex items-center gap-3 px-3 py-3 border-b border-gray-200">
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
                className="w-full outline-none text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="flex items-center gap-3 px-3 py-3">
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
                className="w-full outline-none text-gray-900 placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700"
            >
              Explore Jobs
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500">
            Internships · Freshers Jobs · Entry-Level Roles
          </p>
        </div>
      </section>

      {/* Why CampusToCareer */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center">Why CampusToCareer?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6"
            >
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-center">How it works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-1 text-gray-600 text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
          <span>© 2026 CampusToCareer. College project.</span>
          <Link href="/admin-login" className="hover:text-gray-800 underline">
            Admin login
          </Link>
        </div>
      </footer>
    </div>
  );
}