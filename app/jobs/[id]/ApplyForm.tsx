"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

export default function ApplyForm({
  jobId,
  userId,
}: {
  jobId: string;
  userId: string;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleApply(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please choose a PDF file.");
      return;
    }
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Maximum size is 5 MB.");
      return;
    }

    setLoading(true);

    // 1. Upload the resume into the student's own folder
    const path = `${userId}/${jobId}-${Date.now()}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(path, file, { contentType: "application/pdf" });

    if (uploadError) {
      setLoading(false);
      setError(uploadError.message);
      return;
    }

    // 2. Save the application
    const { error: insertError } = await supabase
      .from("applications")
      .insert({ job_id: jobId, student_id: userId, resume_url: path });

    if (insertError) {
      await supabase.storage.from("resumes").remove([path]);
      setLoading(false);
      setError(
        insertError.code === "23505"
          ? "You have already applied for this job."
          : insertError.message
      );
      return;
    }

    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleApply} className="space-y-3">
      <label className="block text-sm font-medium text-gray-900">
        Upload your resume (PDF, max 5 MB)
      </label>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block w-full text-sm text-gray-900"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Applying..." : "Apply now"}
      </button>
    </form>
  );
}