"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/client";
import Logo from "@/app/components/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/login");
  }

  const inputClass =
    "auth-input w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-gray-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <main className="auth-page min-h-screen bg-[#faf9f6] md:grid md:grid-cols-2">
      <div
        role="img"
        aria-label="CampusToCareer"
        className="min-h-[35vh] bg-cover bg-center md:min-h-screen"
        style={{ backgroundImage: "url('/auth-background.jpg')" }}
      />

      <section className="flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <div className="mb-6 flex flex-col items-center text-center">
            <Logo size={90} showText={false} />
            <p className="auth-brand-name mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Campus<span className="text-sky-500">To</span>Career
            </p>
            <p className="mt-1 text-xs text-gray-600">
              Your Education <span className="px-1 text-sky-500">•</span>
              Our Support <span className="px-1 text-sky-500">•</span>
              Your Future
            </p>
          </div>

          <form onSubmit={handleRegister} className="w-full space-y-5">
            <div>
              <h1 className="font-serif text-2xl font-bold text-[#0b315f]">
                Create your account
              </h1>
              <p className="mt-3 text-base text-slate-500">
                Join CampusToCareer and start applying in minutes.
              </p>
            </div>

            <div className="relative">
              <svg
                aria-hidden="true"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21a7 7 0 0 1 14 0" />
              </svg>
              <input
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={`${inputClass} pl-12`}
              />
            </div>

            <div className="relative">
              <svg
                aria-hidden="true"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <input
                type="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`${inputClass} pl-12`}
              />
            </div>

            <div className="relative">
              <svg
                aria-hidden="true"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 1 1 8 0v3" />
                <path d="M12 14v3" />
              </svg>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className={`${inputClass} pl-12`}
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#082e5c] py-3.5 font-semibold text-white hover:bg-[#0b417e] disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Register"}
            </button>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}