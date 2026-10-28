import Link from "next/link";
import LogoutButton from "./LogoutButton";
import Logo from "./Logo";

export default function StudentNav() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex items-center justify-between text-sm">
      <div className="flex items-center gap-6">
        <Logo light size={40} href="/jobs" />
        <Link href="/jobs" className="hover:underline">
          Find Jobs
        </Link>
        <Link href="/my-applications" className="hover:underline">
          My Applications
        </Link>
      </div>
      <LogoutButton redirectTo="/login" />
    </nav>
  );
}