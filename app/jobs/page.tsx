import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";

const PAGE_SIZE = 10;

type Params = Promise<{ q?: string; location?: string; page?: string }>;

export default function JobsPage({ searchParams }: { searchParams: Params }) {
  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Find your first job</h1>
        <p className="text-gray-600 mt-1 mb-6">
          Search openings for students and freshers.
        </p>
        <Suspense fallback={<p className="text-gray-600">Loading jobs...</p>}>
          <JobsList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

function pageLink(
  q: string | undefined,
  location: string | undefined,
  page: number
) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (location) params.set("location", location);
  if (page > 1) params.set("page", String(page));
  const s = params.toString();
  return s ? `/jobs?${s}` : "/jobs";
}

async function JobsList({ searchParams }: { searchParams: Params }) {
  const { q, location, page: pageParam } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("jobs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  const term = q ? q.replace(/[%,()]/g, "").trim() : "";
  const loc = location ? location.replace(/[%,()]/g, "").trim() : "";

  if (loc) {
    query = query.ilike("location", `%${loc}%`);
    if (term) query = query.ilike("title", `%${term}%`);
  } else if (term) {
    query = query.or(`title.ilike.%${term}%,location.ilike.%${term}%`);
  }

  const { data: jobs, count, error } = await query;

  const { data: myApps } = await supabase
    .from("applications")
    .select("job_id, status")
    .eq("student_id", user.id);
  const appliedMap = new Map(
    (myApps ?? []).map((a) => [a.job_id as string, a.status as string])
  );

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <form className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Job title"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
        />
        <input
          type="text"
          name="location"
          defaultValue={location ?? ""}
          placeholder="City or location"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-600">Error: {error.message}</p>}

      <p className="text-sm text-gray-500 mb-4">
        {total} {total === 1 ? "job" : "jobs"} found
        {term ? ` for "${term}"` : ""}
        {loc ? ` in "${loc}"` : ""}
        {total > 0 ? ` · Page ${page} of ${totalPages}` : ""}
      </p>

      {jobs && jobs.length === 0 && (
        <div className="bg-white p-8 rounded-xl text-center text-gray-600">
          No jobs found. Try a different title or city.
        </div>
      )}

      <div className="space-y-4">
        {jobs?.map((job) => {
          const myStatus = appliedMap.get(job.id);
          return (
            <div
              key={job.id}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 hover:shadow-md transition"
            >
              <div className="w-12 h-12 shrink-0 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                {job.company.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h2>
                <p className="text-gray-700 text-sm">{job.company}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {job.location}
                  </span>
                  {myStatus && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      ✓ {myStatus}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                  {job.description}
                </p>
              </div>
              <Link
                href={`/jobs/${job.id}`}
                className="sm:self-center text-center bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap"
              >
                {myStatus ? "View application" : "View details"}
              </Link>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
          {page > 1 ? (
            <Link
              href={pageLink(q, location, page - 1)}
              className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              ← Previous
            </Link>
          ) : (
            <span className="px-4 py-2 text-gray-400">← Previous</span>
          )}

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={pageLink(q, location, page + 1)}
              className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Next →
            </Link>
          ) : (
            <span className="px-4 py-2 text-gray-400">Next →</span>
          )}
        </div>
      )}
    </>
  );
}