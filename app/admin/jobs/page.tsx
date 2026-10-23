import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import DeleteButton from "./DeleteButton";

export default function AdminJobsPage() {
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
          <JobsTable />
        </Suspense>
      </div>
    </main>
  );
}

async function JobsTable() {
  const supabase = await createClient();
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return <p className="text-red-600">Error: {error.message}</p>;
  if (!jobs || jobs.length === 0)
    return <p className="text-gray-600">No jobs yet. Add your first job.</p>;

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
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
  );
}