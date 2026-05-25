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
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-56 flex-col border-r border-neutral-700 bg-neutral-900 pt-4">
      <div className="px-4 pb-4">
        <Link href="/admin" className="block">
          <h1 className="text-lg font-bold text-cyan-400">NEXUS</h1>
          <p className="text-[10px] uppercase tracking-widest text-neutral-500">
            Hosting Platform
          </p>
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-cyan-400/10 text-cyan-400"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded bg-neutral-800 text-xs font-mono">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-neutral-700 p-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-xs text-neutral-400">
            All Systems Operational
          </span>
        </div>
      </div>
    </aside>
  );
}
