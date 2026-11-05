"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

const SUBJECTS = [
  "Question about jobs",
  "Problem with my application",
  "Account or login issue",
  "Report a bug",
  "Feedback or suggestion",
  "Other",
];

export default function ContactForm() {
  const supabase = createClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  // If the visitor is logged in, fill in their details
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setEmail((e) => e || user.email || "");
      const { data: p } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();
      if (p?.full_name) setName((n) => n || p.full_name);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !subject || !message.trim()) {
      setError("Please fill in all the fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert({
      name: name.trim(),
      email: email.trim(),
      subject,
      message: message.trim(),
    });

    if (error) {
      setStatus("idle");
      setError("Sorry, the message could not be sent. Please try again.");
      return;
    }
    setStatus("sent");
    setSubject("");
    setMessage("");
  }

  const field =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 " +
    "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";

  if (status === "sent") {
    return (
      <div className="rounded-2xl bg-white p-8 shadow">
        <h2 className="text-xl font-semibold text-gray-900">Message sent</h2>
        <p className="mt-2 text-gray-600">
          Thank you. We have received your message and will reply to your email.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 rounded-xl bg-[#0f2a5c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow sm:p-8">
      <h2 className="text-xl font-semibold text-gray-900">Send a Message</h2>
      <p className="mt-1 border-b border-gray-200 pb-4 text-sm text-gray-600">
        Write to us and we will reply to your email.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1 block text-xs font-semibold text-gray-700">
            Full Name
          </label>
          <input
            id="c-name"
            className={field}
            placeholder="Your name"
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1 block text-xs font-semibold text-gray-700">
            Email
          </label>
          <input
            id="c-email"
            type="email"
            className={field}
            placeholder="you@gmail.com"
            maxLength={200}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="c-subject" className="mb-1 block text-xs font-semibold text-gray-700">
          Subject
        </label>
        <select
          id="c-subject"
          className={field}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">Select an issue or topic...</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="c-message" className="mb-1 block text-xs font-semibold text-gray-700">
          Message
        </label>
        <textarea
          id="c-message"
          rows={5}
          className={field}
          placeholder="How can we help you today?"
          maxLength={2000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <div className="mt-5 flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0f2a5c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-900 disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m22 2-7 20-4-9-9-4 20-7Z" />
          </svg>
        </button>
        <span className="text-xs text-gray-500">Your message is stored securely</span>
      </div>
    </form>
  );
}