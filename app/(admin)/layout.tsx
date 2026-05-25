import { AdminSidebar } from "components/platform/admin-sidebar";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import "../globals.css";

export const metadata = {
  title: {
    default: "NEXUS Platform",
    template: "%s | NEXUS Platform",
  },
  description: "Unified dynamic hosting platform dashboard",
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="min-h-screen bg-neutral-950 text-white">
        <AdminSidebar />
        <main className="ml-56 min-h-screen p-6">{children}</main>
      </body>
    </html>
  );
}
