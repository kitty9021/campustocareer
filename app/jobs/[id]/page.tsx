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
    <div className="bg-white p-6 rounded-lg shadow mt-4">
      <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
      <p className="text-gray-700 mt-1">
        {job.company} · {job.location}
      </p>
      <p className="text-gray-700 mt-4 whitespace-pre-line">
        {job.description}
      </p>

      <div className="mt-6 border-t pt-4">
        {existing ? (
          <p className="text-green-700 font-medium">
            You have applied for this job. Status: {existing.status}
          </p>
        ) : (
          <ApplyForm jobId={job.id} userId={user.id} />
        )}
      </div>
    </div>
  );
}