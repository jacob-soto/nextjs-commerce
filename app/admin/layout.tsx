import { AdminSidebar } from "components/platform/admin-sidebar";
import { ReactNode } from "react";

export const metadata = {
  title: "NEXUS Platform Admin",
  description: "Unified dynamic hosting platform dashboard",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <AdminSidebar />
      <main className="ml-56 min-h-screen p-6">{children}</main>
    </div>
  );
}
