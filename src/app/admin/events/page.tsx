import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminPanel } from "@/components/admin/AdminPanel";

export default async function AdminEventsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
  return <AdminPanel />;
}
