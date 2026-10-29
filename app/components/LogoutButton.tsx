"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

export default function LogoutButton({
  redirectTo = "/login",
}: {
  redirectTo?: string;
}) {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push(redirectTo);
    router.refresh();
  }

  return (
        <button
      onClick={handleLogout}
      className="border border-white/70 rounded-lg px-4 py-1.5 hover:bg-white/10"
    >
      Logout
    </button>
  );
}