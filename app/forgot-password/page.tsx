
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  // Show a message if the reset link was invalid or expired
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("error") === "reset_failed") {
      setError(
        "The reset link is invalid or has expired. Please request a new one."
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const cleanEmail = email.trim();

    // Detect whether the app is running inside Electron
    const isElectron = navigator.userAgent.includes("Electron");

    // Use the custom protocol inside Electron,
    // and the normal HTTPS callback in a browser
    const redirectTo = isElectron
      ? "campustocareer://auth/callback?next=/reset-password"
      : `${window.location.origin}/auth/callback?next=/reset-password`;

    // Send the password reset email
    const { error } = await supabase.auth.resetPasswordForEmail(
      cleanEmail,
      {
        redirectTo,
      }
    );

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(
      "If an account exists with this email, a password reset link has been sent. Please check your inbox and spam folder."
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Forgot Password?
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Enter your registered email address to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full rounded-lg border border-gray-300 p-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-700">
            {error}
          </p>
        )}

        {success && (
          <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-center text-sm text-green-700">
            {success}
          </p>
        )}

        <div className="mt-6 flex flex-col items-center gap-2 text-sm">
          <Link href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
