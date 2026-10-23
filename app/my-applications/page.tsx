import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";

export default function MyApplicationsPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <Link href="/jobs" className="text-blue-600 underline text-sm">
            Browse jobs
          </Link>
        </div>
        <Suspense fallback={<p className="text-gray-600">Loading...</p>}>
          <ApplicationsList />
        </Suspense>
      </div>
    </main>
  );
}

function statusStyle(status: string) {
  if (status === "Shortlisted") return "bg-green-100 text-green-800";
  if (status === "Rejected") return "bg-red-100 text-red-800";
  return "bg-yellow-100 text-yellow-800";
}

async function ApplicationsList() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: applications, error } = await supabase
    .from("applications")
    .select("id, status, created_at, jobs(title, company, location)")
    .eq("student_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-red-600">Error: {error.message}</p>;
  }

  if (!applications || applications.length === 0) {
    return (
      <p className="text-gray-600">
        You haven&apos;t applied for any jobs yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => {
        const job = Array.isArray(app.jobs) ? app.jobs[0] : app.jobs;
        return (
          <div
            key={app.id}
            className="bg-white p-5 rounded-lg shadow flex items-start justify-between gap-4"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {job?.title ?? "Job removed"}
              </h2>
              <p className="text-gray-700">
                {job?.company} · {job?.location}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Applied on {new Date(app.created_at).toLocaleDateString("en-IN")}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle(
                app.status
              )}`}
            >
              {app.status}
            </span>
          </div>
        );
      })}
    </div>
  );
}