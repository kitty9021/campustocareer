"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string | null;
};

export default function JobForm({ job }: { job?: Job }) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState(job?.title ?? "");
  const [company, setCompany] = useState(job?.company ?? "");
  const [location, setLocation] = useState(job?.location ?? "");
  const [description, setDescription] = useState(job?.description ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const values = { title, company, location, description };

    const { error } = job
      ? await supabase.from("jobs").update(values).eq("id", job.id)
      : await supabase.from("jobs").insert(values);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/jobs");
    router.refresh();
  }

  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 text-gray-900";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <input
        className={inputClass}
        placeholder="Job title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className={inputClass}
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />
      <input
        className={inputClass}
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <textarea
        className={inputClass}
        placeholder="Description"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : job ? "Save changes" : "Add job"}
      </button>
    </form>
  );
}