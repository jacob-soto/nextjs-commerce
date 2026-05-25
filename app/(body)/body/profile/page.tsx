"use client";

import { BodyNav } from "components/body/nav";

const PROFILE = {
  username: "jacob_soto",
  displayName: "Jacob Soto",
  avatar: "👤",
  bio: "Platform creator & fashion forward athlete. Building body.app for everyone.",
  location: "New York, NY",
  joined: "May 2026",
  followers: 1247,
  following: 892,
  posts: 56,
};

const STATS = [
  { label: "Orders", value: "23", icon: "📦" },
  { label: "Wishlist", value: "47", icon: "❤️" },
  { label: "Reviews", value: "12", icon: "⭐" },
  { label: "Points", value: "4,820", icon: "💎" },
];

const RECENT_ORDERS = [
  {
    name: "Oversized Cashmere Hoodie",
    shop: "Designer",
    price: 345,
    status: "Delivered",
  },
  {
    name: "Whey Protein Isolate 5lb",
    shop: "Athletics",
    price: 65,
    status: "Shipped",
  },
  {
    name: "Mesh Panel Briefs (3-pack)",
    shop: "Intimates",
    price: 96,
    status: "Processing",
  },
  {
    name: "Adjustable Dumbbell Set",
    shop: "Athletics",
    price: 299,
    status: "Delivered",
  },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <BodyNav />
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-12">
        {/* Profile header */}
        <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="flex items-start gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-4xl">
              {PROFILE.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">
                {PROFILE.displayName}
              </h1>
              <p className="text-sm text-zinc-400">@{PROFILE.username}</p>
              <p className="mt-2 text-sm text-zinc-300">{PROFILE.bio}</p>
              <div className="mt-3 flex items-center gap-4 text-sm text-zinc-400">
                <span>📍 {PROFILE.location}</span>
                <span>📅 Joined {PROFILE.joined}</span>
              </div>
              <div className="mt-3 flex gap-4 text-sm">
                <span className="text-white">
                  <strong>{PROFILE.followers.toLocaleString()}</strong>{" "}
                  <span className="text-zinc-400">followers</span>
                </span>
                <span className="text-white">
                  <strong>{PROFILE.following.toLocaleString()}</strong>{" "}
                  <span className="text-zinc-400">following</span>
                </span>
              </div>
            </div>
            <button className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 text-sm font-semibold transition-opacity hover:opacity-90">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center"
            >
              <div className="mb-1 text-2xl">{stat.icon}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Recent Orders
          </h2>
          <div className="space-y-3">
            {RECENT_ORDERS.map((order, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-zinc-800/30 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">{order.name}</p>
                  <p className="text-xs text-zinc-400">{order.shop}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-white">
                    ${order.price}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-500/10 text-green-400"
                        : order.status === "Shipped"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings section */}
        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Settings</h2>
          <div className="space-y-3">
            {[
              {
                label: "Notifications",
                desc: "Push & email alerts",
                icon: "🔔",
              },
              {
                label: "Privacy",
                desc: "Map visibility & profile",
                icon: "🔒",
              },
              { label: "Payment Methods", desc: "Cards & wallets", icon: "💳" },
              {
                label: "Shipping Addresses",
                desc: "Manage delivery addresses",
                icon: "📍",
              },
            ].map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center gap-3 rounded-lg bg-zinc-800/30 p-3 text-left transition-colors hover:bg-zinc-800/50"
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-zinc-400">{item.desc}</p>
                </div>
                <span className="text-zinc-500">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
