import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";

const FILTERS = ["All", "Applied", "Shortlisted", "Rejected"];

function statusStyle(status: string) {
  if (status === "Shortlisted") return "bg-green-100 text-green-800";
  if (status === "Rejected") return "bg-red-100 text-red-800";
  return "bg-yellow-100 text-yellow-800";
}

export default async function AllApplicants({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = FILTERS.includes(status ?? "") ? status! : "All";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin-login");

  const { data: me } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (me?.role !== "admin") redirect("/admin-login");

  let query = supabase
    .from("applications")
    .select("id, status, created_at, student_id, job_id, jobs(title, company)")
    .order("created_at", { ascending: false });
  if (active !== "All") query = query.eq("status", active);

  const { data: apps, error } = await query;

  const ids = [...new Set((apps ?? []).map((a) => a.student_id))];
  const { data: profs } = ids.length
    ? await supabase.from("profiles").select("id, full_name").in("id", ids)
    : { data: [] };
  const nameOf = new Map((profs ?? []).map((p) => [p.id, p.full_name]));

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">All Applicants</h1>

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f}
            href={f === "All" ? "/admin/applicants" : `/admin/applicants?status=${f}`}
            className={`rounded-full px-4 py-1 text-sm font-medium ${
              active === f
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 shadow"
            }`}
          >
            {f}
          </Link>
        ))}
      </div>

      {error && <p className="text-red-600">Error: {error.message}</p>}
      {apps?.length === 0 && <p className="text-gray-600">No applicants found.</p>}

      <div className="space-y-3">
        {apps?.map((a) => {
          const job = Array.isArray(a.jobs) ? a.jobs[0] : a.jobs;
          return (
            <div
              key={a.id}
              className="flex items-center justify-between gap-4 rounded-lg bg-white p-4 shadow"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {nameOf.get(a.student_id) ?? "Student"}
                </p>
                <p className="text-sm text-gray-700">
                  {job?.title} · {job?.company}
                </p>
                <p className="text-xs text-gray-500">
                  Applied on {new Date(a.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyle(a.status)}`}>
                  {a.status}
                </span>
                <Link
                  href={`/admin/jobs/${a.job_id}/applicants`}
                  className="text-sm text-green-700 underline"
                >
                  Review
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}