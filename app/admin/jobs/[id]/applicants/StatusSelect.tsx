"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

const STATUSES = ["Applied", "Shortlisted", "Rejected"];

export default function StatusSelect({
  id,
  current,
}: {
  id: string;
  current: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [value, setValue] = useState(current);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const status = e.target.value;
    setLoading(true);
    setError("");

    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setValue(status);
    router.refresh();
  }

  return (
    <div>
      <select
        value={value}
        onChange={handleChange}
        disabled={loading}
        className="border border-gray-300 rounded px-2 py-1 text-gray-900 bg-white"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}