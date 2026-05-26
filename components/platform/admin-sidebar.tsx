"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: "/" },
  { href: "/admin/deployments", label: "Deployments", icon: ">" },
  { href: "/admin/revenue", label: "Revenue", icon: "$" },
  { href: "/admin/assets", label: "Assets", icon: "#" },
  { href: "/admin/security", label: "Security", icon: "!" },
  { href: "/admin/automation", label: "Automation", icon: "*" },
  { href: "/admin/advanced", label: "Advanced", icon: "+" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Primary"
      className="fixed left-0 top-0 z-40 flex h-screen w-56 flex-col border-r border-neutral-700 bg-neutral-900 pt-4"
      data-testid="admin-sidebar"
    >
      <div className="px-4 pb-4">
        <Link
          href="/admin"
          className="block rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
        >
          <h1 className="text-lg font-bold text-cyan-300">NEXUS</h1>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400">
            Hosting Platform
          </p>
        </Link>
      </div>

      <nav aria-label="Admin sections" className="flex-1 space-y-0.5 px-2">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${
                    isActive
                      ? "bg-cyan-400/10 text-cyan-200"
                      : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 items-center justify-center rounded bg-neutral-800 font-mono text-xs"
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-neutral-700 p-4">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-green-400"
          />
          <span className="text-xs text-neutral-300">
            All Systems Operational
          </span>
        </div>
      </div>
    </aside>
  );
}
