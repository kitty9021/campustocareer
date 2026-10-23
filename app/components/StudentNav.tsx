import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function StudentNav() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex items-center justify-between text-sm">
      <div className="flex gap-6">
        <span className="font-semibold">CampusToCareer</span>
        <Link href="/jobs" className="underline">
          Find Jobs
        </Link>
        <Link href="/my-applications" className="underline">
          My Applications
        </Link>
      </div>
      <LogoutButton redirectTo="/login" />
    </nav>
  );
}