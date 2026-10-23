import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import StatusSelect from "./StatusSelect";

export default function ApplicantsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/jobs" className="text-blue-600 underline text-sm">
          ← Back to jobs
        </Link>
        <Suspense fallback={<p className="mt-4 text-gray-600">Loading...</p>}>
          <Applicants params={params} />
        </Suspense>
      </div>
    </main>
  );
}

async function Applicants({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select("title, company")
    .eq("id", id)
    .single();

  if (!job) notFound();

  const { data: applications, error } = await supabase
    .from("applications")
    .select("id, status, created_at, resume_url, profiles(full_name)")
    .eq("job_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="mt-4 text-red-600">Error: {error.message}</p>;
  }

  // Temporary links so the admin can open each private resume
  const paths = (applications ?? []).map((a) => a.resume_url);
  const urlByPath = new Map<string, string>();
  if (paths.length > 0) {
    const { data: signed } = await supabase.storage
      .from("resumes")
      .createSignedUrls(paths, 3600);
    signed?.forEach((s) => {
      if (s.path && s.signedUrl) urlByPath.set(s.path, s.signedUrl);
    });
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 my-4">
        Applicants: {job.title}
      </h1>
      <p className="text-gray-600 mb-4">{job.company}</p>

      {(!applications || applications.length === 0) && (
        <p className="text-gray-600">No applications yet.</p>
      )}

      <div className="space-y-3">
        {applications?.map((app) => {
          const profile = Array.isArray(app.profiles)
            ? app.profiles[0]
            : app.profiles;
          const resumeUrl = urlByPath.get(app.resume_url);
          return (
            <div
              key={app.id}
              className="bg-white p-4 rounded-lg shadow flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {profile?.full_name ?? "Unnamed student"}
                </p>
                <p className="text-gray-500 text-sm">
                  Applied on{" "}
                  {new Date(app.created_at).toLocaleDateString("en-IN")}
                </p>
                {resumeUrl ? (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View resume (PDF)
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm">Resume unavailable</span>
                )}
              </div>
              <StatusSelect id={app.id} current={app.status} />
            </div>
          );
        })}
      </div>
    </>
  );
}