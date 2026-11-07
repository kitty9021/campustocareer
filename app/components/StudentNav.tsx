import Link from "next/link";
import Logo from "@/app/components/Logo";
import LogoutButton from "@/app/components/LogoutButton";

export default function StudentNav() {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        {/* Top row: logo, links (desktop only), logout */}
        <div className="flex items-center justify-between gap-3 py-2 sm:py-3">
          <div className="flex items-center gap-6">
            <span className="sm:hidden">
              <Logo light size={34} href="/jobs" />
            </span>
            <span className="hidden sm:inline">
              <Logo light size={44} href="/jobs" />
            </span>

            <div className="hidden items-center gap-6 text-sm sm:flex">
              <Link href="/jobs" className="hover:underline">
                Find Jobs
              </Link>
              <Link href="/my-applications" className="hover:underline">
                My Applications
              </Link>
            </div>
          </div>

          <LogoutButton redirectTo="/login" />
        </div>

        {/* Second row: tabs (phones only) */}
        <div className="flex border-t border-white/25 text-sm sm:hidden">
          <Link
            href="/jobs"
            className="flex-1 py-2.5 text-center hover:bg-white/10"
          >
            Find Jobs
          </Link>
          <Link
            href="/my-applications"
            className="flex-1 border-l border-white/25 py-2.5 text-center hover:bg-white/10"
          >
            My Applications
          </Link>
        </div>
      </div>
    </nav>
  );
}