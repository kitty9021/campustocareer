import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

async function markRead(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const supabase = await createClient();
  await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
  revalidatePath("/admin/messages");
}

export default async function AdminMessagesPage() {
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

  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("id, name, email, subject, message, is_read, created_at")
    .order("created_at", { ascending: false });

  const unread = (messages ?? []).filter((m) => !m.is_read).length;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
      <p className="mb-4 text-sm text-gray-500">
        {messages?.length ?? 0} messages, {unread} unread
      </p>

      {error && <p className="text-red-600">Error: {error.message}</p>}
      {messages?.length === 0 && <p className="text-gray-600">No messages yet.</p>}

      <div className="space-y-3">
        {messages?.map((m) => (
          <div key={m.id} className="rounded-lg bg-white p-4 shadow">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-gray-900">
                  {m.subject}
                  {!m.is_read && (
                    <span className="ml-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                      New
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-600">
                  {m.name} · {m.email}
                </p>
              </div>
              <p className="text-xs text-gray-500">
                {new Date(m.created_at).toLocaleString("en-IN")}
              </p>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-gray-700">{m.message}</p>
            <div className="mt-3 flex items-center gap-4 text-sm">
              <a href={`mailto:${m.email}`} className="text-blue-600 underline">
                Reply by email
              </a>
              {!m.is_read && (
                <form action={markRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <button type="submit" className="text-green-700 underline">
                    Mark as read
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}