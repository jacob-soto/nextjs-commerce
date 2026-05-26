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
        <a
          href="#admin-main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-cyan-400 focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-neutral-950"
          data-testid="skip-link"
        >
          Skip to main content
        </a>
        <AdminSidebar />
        <main
          id="admin-main"
          tabIndex={-1}
          className="ml-56 min-h-screen p-6 focus:outline-none"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
