import Link from "next/link";
import LogoutButton from "./LogoutButton";
import Logo from "./Logo";

export default function StudentNav() {
  return (
    <nav className="sticky top-0 z-40 bg-blue-700 text-white text-sm shadow-sm">
      <div className="flex w-full items-center justify-between px-6 py-3 md:px-8">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <Logo light size={36} href="/jobs" />
          <Link href="/jobs" className="hover:underline">
            Find Jobs
          </Link>
          <Link href="/my-applications" className="hover:underline">
            My Applications
          </Link>
        </div>
        <LogoutButton redirectTo="/login" />
      </div>
    </nav>
  );
}