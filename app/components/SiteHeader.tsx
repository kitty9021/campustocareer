import Link from "next/link";
import { redirect } from "next/navigation";
import Logo from "@/app/components/Logo";
import { createClient } from "@/app/lib/supabase/server";

async function logout() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export default async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let role: string | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    role = data?.role ?? null;
  }

  const link = "text-gray-700 hover:text-blue-700";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Logo size={60} />
        <nav className="flex items-center gap-4 text-sm">
          {!user && (
            <>
              <Link href="/login" className={link}>
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}

          {user && role === "admin" && (
            <Link href="/admin/dashboard" className={link}>
              Dashboard
            </Link>
          )}

          {user && role !== "admin" && (
            <>
              <Link href="/jobs" className={link}>
                Find Jobs
              </Link>
              <Link href="/my-applications" className={link}>
                My Applications
              </Link>
            </>
          )}

          {user && (
            <form action={logout}>
              <button
                type="submit"
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Logout
              </button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}