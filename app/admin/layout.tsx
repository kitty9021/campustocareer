import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import LogoutButton from "@/app/components/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<p className="p-6 text-gray-600">Loading...</p>}>
      <AdminGuard>{children}</AdminGuard>
    </Suspense>
  );
}

async function AdminGuard({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin-login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/jobs");

  return (
    <div>
      <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between text-sm">
        <div className="flex gap-6">
          <span className="font-semibold">CampusToCareer Admin</span>
          <Link href="/admin/jobs" className="underline">
            Manage jobs
          </Link>
        </div>
        <LogoutButton redirectTo="/admin-login" />
      </nav>
      {children}
    </div>
  );
}