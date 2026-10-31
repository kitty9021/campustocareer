"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function JobFilters({ locations }: { locations: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [q, setQ] = useState(params.get("q") ?? "");
  const location = params.get("location") ?? "";
  const sort = params.get("sort") ?? "newest";

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}?${next.toString()}`);
  }

  // wait 400 ms after typing stops, then search
  useEffect(() => {
    const t = setTimeout(() => {
      if (q !== (params.get("q") ?? "")) update("q", q.trim());
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const box =
    "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900";

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <input
        className={box + " min-w-[220px] flex-1"}
        placeholder="Search by title, company or location"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <select
        className={box}
        value={location}
        onChange={(e) => update("location", e.target.value)}
      >
        <option value="">All locations</option>
        {locations.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
      <select
        className={box}
        value={sort}
        onChange={(e) => update("sort", e.target.value)}
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="title">Title A to Z</option>
      </select>
      {(q || location || sort !== "newest") && (
        <button
          onClick={() => {
            setQ("");
            router.replace(pathname);
          }}
          className="rounded-lg px-3 py-2 text-sm text-blue-600 underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}