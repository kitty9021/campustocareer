"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client"; // change to match your project

type Props = {
  applicationId: string;
  date?: string | null;
  time?: string | null;
  place?: string | null;
  note?: string | null;
};

export default function InterviewForm({ applicationId, date, time, place, note }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [d, setD] = useState(date ?? "");
  const [t, setT] = useState(time?.slice(0, 5) ?? "");
  const [p, setP] = useState(place ?? "");
  const [n, setN] = useState(note ?? "");
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!d || !t || !p.trim()) {
      setMsg("Please fill date, time and place.");
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("applications")
      .update({
        interview_date: d,
        interview_time: t,
        interview_place: p.trim(),
        interview_note: n.trim() || null,
      })
      .eq("id", applicationId);
    setSaving(false);
    setMsg(error ? "Error: " + error.message : "Interview saved.");
    if (!error) router.refresh();
  }

  const input =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 " +
    "dark:border-slate-700 dark:bg-slate-800 dark:text-white";

  return (
    <div className="mt-3 rounded-lg border border-gray-200 p-3 dark:border-slate-700">
      <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Interview details</p>
      <div className="grid gap-2 sm:grid-cols-2">
        <input type="date" className={input} value={d} onChange={(e) => setD(e.target.value)} />
        <input type="time" className={input} value={t} onChange={(e) => setT(e.target.value)} />
      </div>
      <input
        className={input + " mt-2"}
        placeholder="Place (office address or meeting link)"
        value={p}
        onChange={(e) => setP(e.target.value)}
      />
      <input
        className={input + " mt-2"}
        placeholder="Note (optional, e.g. bring ID and resume)"
        value={n}
        onChange={(e) => setN(e.target.value)}
      />
      <button
        onClick={save}
        disabled={saving}
        className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {saving ? "Saving..." : date ? "Update interview" : "Schedule interview"}
      </button>
      {msg && <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">{msg}</p>}
    </div>
  );
}