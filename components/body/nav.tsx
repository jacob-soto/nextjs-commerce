"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/body", label: "Explore", icon: "🗺️" },
  { href: "/body/shop/designer", label: "Designer", icon: "✂️" },
  { href: "/body/shop/intimates", label: "Intimates", icon: "🔥" },
  { href: "/body/shop/athletics", label: "Athletics", icon: "💪" },
  { href: "/body/merchants", label: "Merchants", icon: "📊" },
  { href: "/body/profile", label: "Profile", icon: "👤" },
];

export function BodyNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/body" className="flex items-center gap-2">
          <span className="text-2xl">🫧</span>
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-xl font-bold text-transparent">
            body.app
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/body" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                }`}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button className="relative rounded-full bg-zinc-800 p-2 transition-colors hover:bg-zinc-700">
            <span className="text-sm">🔔</span>
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold">
              3
            </span>
          </button>
          <button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1.5 text-sm font-semibold transition-opacity hover:opacity-90">
            Sign In
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="flex border-t border-zinc-800 md:hidden">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/body" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] ${
                isActive ? "text-pink-400" : "text-zinc-500"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
