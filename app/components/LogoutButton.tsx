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
    <button onClick={handleLogout} className="underline">
      Logout
    </button>
  );
}