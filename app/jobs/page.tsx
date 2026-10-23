import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";

export default function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Find Jobs</h1>
        <Suspense fallback={<p className="text-gray-600">Loading jobs...</p>}>
          <JobsList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function JobsList({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  let query = supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (q) {
    const term = q.replace(/[%,()]/g, "");
    query = query.or(`title.ilike.%${term}%,location.ilike.%${term}%`);
  }

  const { data: jobs, error } = await query;

  return (
    <>
      <form className="flex gap-2 mb-6">
        <input
          type="text"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search by job title or location"
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-600">Error: {error.message}</p>}

      {jobs && jobs.length === 0 && (
        <p className="text-gray-600">No jobs found.</p>
      )}

      <div className="space-y-4">
        {jobs?.map((job) => (
          <div key={job.id} className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
            <p className="text-gray-700">
              {job.company} · {job.location}
            </p>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {job.description}
            </p>
            <Link
              href={`/jobs/${job.id}`}
              className="inline-block mt-3 text-blue-600 underline text-sm"
            >
              View details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}