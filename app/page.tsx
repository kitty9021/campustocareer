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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200">
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
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50"
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