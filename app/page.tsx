import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900">CampusToCareer</h1>
      <p className="mt-3 text-gray-600 max-w-md">
        Your first job starts here. Register, search, and apply in minutes.
      </p>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          href="/register"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Student Register
        </Link>
        <Link
          href="/login"
          className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded hover:bg-blue-50"
        >
          Student Login
        </Link>
      </div>

      <Link
        href="/admin-login"
        className="mt-6 text-sm text-gray-500 underline"
      >
        Admin login
      </Link>
    </main>
  );
}