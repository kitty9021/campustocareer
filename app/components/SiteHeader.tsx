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

  const isStudent = !!user && role !== "admin";
  const link = "px-1 py-1 text-gray-700 hover:text-blue-700";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        {/* Top row */}
        <div className="flex items-center justify-between gap-3 py-2 sm:py-3">
          <span className="sm:hidden">
            <Logo size={34} />
          </span>
          <span className="hidden sm:inline">
            <Logo size={60} />
          </span>

          <nav className="flex items-center gap-1.5 sm:gap-4 text-xs sm:text-sm">
            {!user && (
              <>
                <Link href="/login" className={link}>
                  Login
                </Link>
                <Link
                  href="/register"
                  className="whitespace-nowrap rounded-md bg-blue-600 px-2.5 py-1 text-white hover:bg-blue-700 sm:rounded-lg sm:px-4 sm:py-2"
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

            {isStudent && (
              <>
                <Link href="/jobs" className={`${link} hidden sm:inline-block`}>
                  Find Jobs
                </Link>
                <Link
                  href="/my-applications"
                  className={`${link} hidden sm:inline-block`}
                >
                  My Applications
                </Link>
              </>
            )}

            {user && (
              <form action={logout}>
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-md border border-gray-300 px-2.5 py-1 text-gray-700 hover:bg-gray-50 sm:rounded-lg sm:px-4 sm:py-2"
                >
                  Logout
                </button>
              </form>
            )}
          </nav>
        </div>

        {/* Second row: tabs for logged-in students, phones only */}
        {isStudent && (
          <div className="flex border-t border-gray-200 text-sm sm:hidden">
            <Link
              href="/jobs"
              className="flex-1 py-2.5 text-center text-gray-700 hover:bg-gray-50"
            >
              Find Jobs
            </Link>
            <Link
              href="/my-applications"
              className="flex-1 border-l border-gray-200 py-2.5 text-center text-gray-700 hover:bg-gray-50"
            >
              My Applications
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}