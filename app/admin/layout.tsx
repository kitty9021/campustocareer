import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase/server";
import Logo from "@/app/components/Logo";

async function adminLogout() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin-login");
}

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

  const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/jobs", label: "Manage jobs" },
    { href: "/admin/applicants", label: "Applicants" },
    { href: "/admin/messages", label: "Messages" },
  ];

  return (
    <div>
      <nav className="bg-gray-900 text-white text-sm">
        <div className="px-3 sm:px-6">
          {/* Top row */}
          <div className="flex items-center justify-between gap-3 py-2 sm:py-3">
            <div className="flex min-w-0 items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="sm:hidden">
                  <Logo light size={32} href="/admin/jobs" />
                </span>
                <span className="hidden sm:inline">
                  <Logo light size={40} href="/admin/jobs" />
                </span>
                <span className="shrink-0 whitespace-nowrap rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] leading-none sm:px-2 sm:text-xs">
                  Admin
                </span>
              </div>

              <div className="hidden items-center gap-6 sm:flex">
                {links.map((l) => (
                  <Link key={l.href} href={l.href} className="hover:underline">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <form action={adminLogout}>
              <button
                type="submit"
                className="whitespace-nowrap rounded-md border border-white/40 px-2.5 py-1 text-xs hover:bg-white/10 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm"
              >
                Logout
              </button>
            </form>
          </div>

          {/* Second row: tabs (phones only) */}
          <div className="grid grid-cols-4 border-t border-white/20 text-xs sm:hidden">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-1 py-2.5 text-center hover:bg-white/10 ${i > 0 ? "border-l border-white/20" : ""
                  }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}