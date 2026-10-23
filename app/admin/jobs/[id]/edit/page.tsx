import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import JobForm from "../../JobForm";

export default function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/admin/jobs" className="text-blue-600 underline text-sm">
          ← Back to jobs
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 my-4">Edit job</h1>
        <Suspense fallback={<p className="text-gray-600">Loading...</p>}>
          <EditLoader params={params} />
        </Suspense>
      </div>
    </main>
  );
}

async function EditLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select("id, title, company, location, description")
    .eq("id", id)
    .single();

  if (!job) notFound();

  return <JobForm job={job} />;
}