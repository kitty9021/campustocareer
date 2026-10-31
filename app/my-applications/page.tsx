import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";

export default function MyApplicationsPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6 dark:bg-slate-900">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Applications
          </h1>
          <Link href="/jobs" className="text-blue-600 underline text-sm dark:text-blue-400">
            Browse jobs
          </Link>
        </div>
        <Suspense fallback={<p className="text-gray-600 dark:text-slate-400">Loading...</p>}>
          <ApplicationsList />
        </Suspense>
      </div>
    </main>
  );
}

function statusStyle(status: string) {
  if (status === "Shortlisted")
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
  if (status === "Rejected")
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
  return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
}

async function ApplicationsList() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: applications, error } = await supabase
    .from("applications")
    .select(
      "id, status, created_at, interview_date, interview_time, interview_place, interview_note, jobs(title, company, location)"
    )
    .eq("student_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-red-600">Error: {error.message}</p>;
  }

  if (!applications || applications.length === 0) {
    return (
      <p className="text-gray-600 dark:text-slate-400">
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
            className="bg-white p-5 rounded-lg shadow dark:bg-slate-800"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {job?.title ?? "Job removed"}
                </h2>
                <p className="text-gray-700 dark:text-slate-300">
                  {job?.company} · {job?.location}
                </p>
                <p className="text-gray-500 text-sm mt-1 dark:text-slate-400">
                  Applied on{" "}
                  {new Date(app.created_at).toLocaleDateString("en-IN")}
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

            {app.status === "Shortlisted" && app.interview_date && (
              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100">
                <p className="font-semibold">Interview scheduled</p>
                <p>
                  Date:{" "}
                  {new Date(app.interview_date).toLocaleDateString("en-IN", {
                    dateStyle: "long",
                  })}
                </p>
                <p>Time: {app.interview_time?.slice(0, 5)}</p>
                <p>Place: {app.interview_place}</p>
                {app.interview_note && <p>Note: {app.interview_note}</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}