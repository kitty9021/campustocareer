import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import ApplyForm from "./ApplyForm";

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/jobs" className="text-blue-600 underline text-sm">
          ← Back to jobs
        </Link>
        <Suspense fallback={<p className="mt-4 text-gray-600">Loading...</p>}>
          <JobDetail params={params} />
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

async function JobDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (!job) notFound();

  const { data: existing } = await supabase
    .from("applications")
    .select("id, status")
    .eq("job_id", id)
    .eq("student_id", user.id)
    .maybeSingle();

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 mt-4">
      <div className="flex gap-4 items-start">
        <div className="w-14 h-14 shrink-0 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
          {job.company.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-gray-700 mt-1">{job.company}</p>
          <div className="flex flex-wrap gap-2 mt-3 text-xs">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              {job.location}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              Posted {new Date(job.created_at).toLocaleDateString("en-IN")}
            </span>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              Freshers welcome
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mt-8">
        About this role
      </h2>
      <p className="text-gray-700 mt-2 whitespace-pre-line leading-relaxed">
        {job.description}
      </p>

      <div className="mt-8 border-t border-gray-200 pt-6">
        {existing ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-800 font-medium">
              You have already applied.
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle(
                existing.status
              )}`}
            >
              {existing.status}
            </span>
            <Link
              href="/my-applications"
              className="text-blue-600 underline text-sm"
            >
              View my applications
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Apply for this job
            </h2>
            <ApplyForm jobId={job.id} userId={user.id} />
          </>
        )}
      </div>
    </div>
  );
}