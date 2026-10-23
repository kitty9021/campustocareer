import Link from "next/link";
import JobForm from "../JobForm";

export default function NewJobPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <Link href="/admin/jobs" className="text-blue-600 underline text-sm">
          ← Back to jobs
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 my-4">Add a job</h1>
        <JobForm />
      </div>
    </main>
  );
}