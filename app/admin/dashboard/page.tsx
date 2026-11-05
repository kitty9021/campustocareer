import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";

export default async function AdminDashboard() {
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

  const head = { count: "exact" as const, head: true };

  const [
    students,
    jobs,
    total,
    applied,
    shortlisted,
    rejected,
    unreadMessages,
    recent,
  ] = await Promise.all([
    supabase.from("profiles").select("*", head).eq("role", "student"),
    supabase.from("jobs").select("*", head),
    supabase.from("applications").select("*", head),
    supabase.from("applications").select("*", head).eq("status", "Applied"),
    supabase.from("applications").select("*", head).eq("status", "Shortlisted"),
    supabase.from("applications").select("*", head).eq("status", "Rejected"),
    supabase.from("contact_messages").select("*", head).eq("is_read", false),
    supabase
      .from("applications")
      .select("id, status, created_at, student_id, job_id, jobs(title, company)")
      .eq("status", "Applied")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const newList = recent.data ?? [];
  const ids = [...new Set(newList.map((a) => a.student_id))];
  const { data: profs } = ids.length
    ? await supabase.from("profiles").select("id, full_name").in("id", ids)
    : { data: [] };
  const nameOf = new Map((profs ?? []).map((p) => [p.id, p.full_name]));

  const unread = unreadMessages.count ?? 0;

  const cards = [
    { label: "Total students", value: students.count ?? 0, color: "text-blue-600" },
    { label: "Total jobs", value: jobs.count ?? 0, color: "text-purple-600" },
    { label: "Total applications", value: total.count ?? 0, color: "text-gray-900" },
    { label: "New (Applied)", value: applied.count ?? 0, color: "text-yellow-700" },
    { label: "Shortlisted", value: shortlisted.count ?? 0, color: "text-green-700" },
    { label: "Rejected", value: rejected.count ?? 0, color: "text-red-700" },
  ];

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className={`mt-1 text-3xl font-bold ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Unread messages */}
      <Link
        href="/admin/messages"
        className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-white p-5 shadow hover:shadow-md"
      >
        <div>
          <p className="text-sm text-gray-500">Unread messages</p>
          <p className="mt-1 text-3xl font-bold text-blue-600">{unread}</p>
          <p className="mt-1 text-xs text-gray-500">
            {unread === 0
              ? "No new messages from visitors"
              : "Messages sent through the Contact page"}
          </p>
        </div>
        <span className="text-sm text-blue-600 underline">View messages</span>
      </Link>

      {/* New applicants */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">New applicants</h2>
        <Link href="/admin/applicants" className="text-sm text-blue-600 underline">
          View all
        </Link>
      </div>

      <div className="mt-3 space-y-3">
        {newList.length === 0 && (
          <p className="text-gray-600">No new applications waiting for review.</p>
        )}
        {newList.map((a) => {
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
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                  Applied
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