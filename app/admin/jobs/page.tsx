import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import DeleteButton from "./DeleteButton";
import JobFilters from "@/app/components/JobFilters";

type SearchParams = Promise<{ q?: string; location?: string; sort?: string }>;

export default function AdminJobsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Manage Jobs</h1>
          <Link
            href="/admin/jobs/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add job
          </Link>
        </div>
        <Suspense fallback={<p className="text-gray-600">Loading jobs...</p>}>
          <JobsSection searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function JobsSection({ searchParams }: { searchParams: SearchParams }) {
  const { q, location, sort } = await searchParams;
  const supabase = await createClient();

  // all locations, for the dropdown
  const { data: locationRows } = await supabase.from("jobs").select("location");
  const locations = [
    ...new Set(
      (locationRows ?? []).map((r) => r.location as string).filter(Boolean)
    ),
  ].sort();

  // jobs query with search, filter and sort
  let query = supabase.from("jobs").select("*");

  if (q) {
    const safe = q.replace(/[%,()]/g, " ").trim();
    if (safe) {
      query = query.or(
        `title.ilike.%${safe}%,company.ilike.%${safe}%,location.ilike.%${safe}%`
      );
    }
  }
  if (location) query = query.eq("location", location);

  if (sort === "oldest") query = query.order("created_at", { ascending: true });
  else if (sort === "title") query = query.order("title", { ascending: true });
  else query = query.order("created_at", { ascending: false });

  const { data: jobs, error } = await query;

  return (
    <>
      <Suspense fallback={null}>
        <JobFilters locations={locations} />
      </Suspense>

      {error ? (
        <p className="text-red-600">Error: {error.message}</p>
      ) : (
        <>
          <p className="mb-3 text-sm text-gray-500">
            {jobs?.length ?? 0} jobs found
          </p>

          {(!jobs || jobs.length === 0) && (
            <p className="text-gray-600">
              {q || location
                ? "No jobs match your search."
                : "No jobs yet. Add your first job."}
            </p>
          )}

          <div className="space-y-3">
            {jobs?.map((job) => (
              <div
                key={job.id}
                className="bg-white p-4 rounded-lg shadow flex items-center justify-between gap-4"
              >
                <div>
                  <h2 className="font-semibold text-gray-900">{job.title}</h2>
                  <p className="text-gray-600 text-sm">
                    {job.company} · {job.location}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <Link
                    href={`/admin/jobs/${job.id}/applicants`}
                    className="text-green-700 underline"
                  >
                    Applicants
                  </Link>
                  <Link
                    href={`/admin/jobs/${job.id}/edit`}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={job.id} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}