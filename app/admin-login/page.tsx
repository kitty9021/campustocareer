"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/app/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      setLoading(false);
      setError(error?.message ?? "Login failed");
      return;
    }

    // Only admins are allowed in
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profile?.role !== "admin") {
      await supabase.auth.signOut();
      setLoading(false);
      setError("This account does not have admin access.");
      return;
    }

    setLoading(false);
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-1000 via-sky-600 to-slate-1000 p-4">
      <div className="w-full max-w-md">
        
        {/* Logo and brand name */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-white p-1 shadow-lg">
            <Image
              src="/logo32.jpg"
              alt="CampusToCareer logo"
              width={88}
              height={88}
              priority
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0f2a5c]">
            Campus<span className="text-blue-200">To</span>Career
          </h1>
          <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[#0f2a5c]/80">
            Administration Portal
          </p>
        </div>

        {/* Login card */}
        <form
          onSubmit={handleLogin}
          className="w-full rounded-2xl bg-white p-8 shadow-xl space-y-4"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome, Admin!
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Sign in to manage your job portal.
            </p>
          </div>

          <div>
            <label
              htmlFor="admin-email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Login as Admin"}
          </button>

          <p className="text-center text-xs text-gray-500">
            Authorized administrators only
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-blue-100">
          © 2026 CampusToCareer
        </p>
      </div>
    </main>
  );
}