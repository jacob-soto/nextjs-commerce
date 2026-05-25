"use client";

import { useState } from "react";
import {
  MERCHANT_STATS,
  MONTHLY_REVENUE,
  DESIGNER_PRODUCTS,
  INTIMATES_PRODUCTS,
  ATHLETICS_PRODUCTS,
} from "lib/body/data";

function StatCard({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: string;
}) {
  const isPositive = change.startsWith("+");
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            isPositive
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {change}
        </span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-zinc-400">{label}</div>
    </div>
  );
}

function RevenueChart() {
  const maxVal = Math.max(
    ...MONTHLY_REVENUE.map((m) => m.designer + m.intimates + m.athletics),
  );

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Revenue by Shop</h3>
      <div className="flex items-end gap-3" style={{ height: 200 }}>
        {MONTHLY_REVENUE.map((month) => {
          const total = month.designer + month.intimates + month.athletics;
          const h = (total / maxVal) * 100;
          const dH = (month.designer / total) * 100;
          const iH = (month.intimates / total) * 100;
          const aH = (month.athletics / total) * 100;
          return (
            <div
              key={month.month}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <div
                className="flex w-full flex-col overflow-hidden rounded-t-md"
                style={{ height: `${h}%` }}
              >
                <div
                  className="bg-purple-500"
                  style={{ height: `${dH}%` }}
                  title={`Designer: $${month.designer.toLocaleString()}`}
                />
                <div
                  className="bg-pink-500"
                  style={{ height: `${iH}%` }}
                  title={`Intimates: $${month.intimates.toLocaleString()}`}
                />
                <div
                  className="bg-indigo-500"
                  style={{ height: `${aH}%` }}
                  title={`Athletics: $${month.athletics.toLocaleString()}`}
                />
              </div>
              <span className="text-xs text-zinc-500">{month.month}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center gap-6">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-purple-500" />
          <span className="text-xs text-zinc-400">Designer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-pink-500" />
          <span className="text-xs text-zinc-400">Intimates</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-indigo-500" />
          <span className="text-xs text-zinc-400">Athletics</span>
        </div>
      </div>
    </div>
  );
}

function ProductTable() {
  const [activeShop, setActiveShop] = useState<
    "all" | "designer" | "intimates" | "athletics"
  >("all");

  const allProducts = [
    ...DESIGNER_PRODUCTS,
    ...INTIMATES_PRODUCTS,
    ...ATHLETICS_PRODUCTS,
  ];
  const products =
    activeShop === "all"
      ? allProducts
      : allProducts.filter((p) => p.shop === activeShop);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Product Inventory</h3>
        <div className="flex gap-1">
          {(
            [
              ["all", "All"],
              ["designer", "Designer"],
              ["intimates", "Intimates"],
              ["athletics", "Athletics"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveShop(key)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                activeShop === key
                  ? "bg-zinc-700 text-white"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-xs text-zinc-500">
              <th className="pb-2 font-medium">Product</th>
              <th className="pb-2 font-medium">Shop</th>
              <th className="pb-2 font-medium">Price</th>
              <th className="pb-2 font-medium">Rating</th>
              <th className="pb-2 font-medium">Reviews</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/30"
              >
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <span>{p.image}</span>
                    <span className="font-medium text-white">{p.name}</span>
                  </div>
                </td>
                <td>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      p.shop === "designer"
                        ? "bg-purple-500/10 text-purple-400"
                        : p.shop === "intimates"
                          ? "bg-pink-500/10 text-pink-400"
                          : "bg-indigo-500/10 text-indigo-400"
                    }`}
                  >
                    {p.shop}
                  </span>
                </td>
                <td className="text-zinc-300">${p.price}</td>
                <td className="text-yellow-400">★ {p.rating}</td>
                <td className="text-zinc-400">{p.reviews}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrdersPanel() {
  const recentOrders = [
    {
      id: "#4201",
      customer: "alex_m",
      items: 3,
      total: 289,
      status: "Shipped",
      shop: "designer",
    },
    {
      id: "#4200",
      customer: "jordan_k",
      items: 2,
      total: 67,
      status: "Processing",
      shop: "intimates",
    },
    {
      id: "#4199",
      customer: "sam_r",
      items: 1,
      total: 65,
      status: "Delivered",
      shop: "athletics",
    },
    {
      id: "#4198",
      customer: "taylor_b",
      items: 4,
      total: 412,
      status: "Shipped",
      shop: "designer",
    },
    {
      id: "#4197",
      customer: "chris_v",
      items: 2,
      total: 95,
      status: "Processing",
      shop: "athletics",
    },
    {
      id: "#4196",
      customer: "riley_n",
      items: 1,
      total: 38,
      status: "Delivered",
      shop: "intimates",
    },
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">Recent Orders</h3>
      <div className="space-y-3">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between rounded-lg bg-zinc-800/30 p-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-zinc-400">
                {order.id}
              </span>
              <span className="text-sm text-white">@{order.customer}</span>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  order.shop === "designer"
                    ? "bg-purple-500/10 text-purple-400"
                    : order.shop === "intimates"
                      ? "bg-pink-500/10 text-pink-400"
                      : "bg-indigo-500/10 text-indigo-400"
                }`}
              >
                {order.shop}
              </span>
              <span className="text-sm font-medium text-white">
                ${order.total}
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
  );
}

export function MerchantDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          icon="💰"
          label="Total Revenue"
          value={`$${MERCHANT_STATS.totalRevenue.toLocaleString()}`}
          change="+12.3%"
        />
        <StatCard
          icon="📦"
          label="Total Orders"
          value={MERCHANT_STATS.totalOrders.toLocaleString()}
          change="+8.1%"
        />
        <StatCard
          icon="🏷️"
          label="Products"
          value={MERCHANT_STATS.totalProducts.toString()}
          change="+3"
        />
        <StatCard
          icon="📈"
          label="Conversion Rate"
          value={`${MERCHANT_STATS.conversionRate}%`}
          change="+0.4%"
        />
        <StatCard
          icon="🛒"
          label="Avg. Order Value"
          value={`$${MERCHANT_STATS.avgOrderValue}`}
          change="+$3.20"
        />
        <StatCard
          icon="🚀"
          label="Monthly Growth"
          value={`${MERCHANT_STATS.monthlyGrowth}%`}
          change="+2.1%"
        />
      </div>

      {/* Revenue chart */}
      <RevenueChart />

      {/* Orders + Inventory */}
      <div className="grid gap-6 lg:grid-cols-2">
        <OrdersPanel />
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Shop Performance
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "Designer Clothing",
                icon: "✂️",
                revenue: 139400,
                orders: 1245,
                color: "purple",
              },
              {
                name: "Intimates & Accessories",
                icon: "🔥",
                revenue: 97900,
                orders: 1487,
                color: "pink",
              },
              {
                name: "Athletics Shop",
                icon: "💪",
                revenue: 122000,
                orders: 1110,
                color: "indigo",
              },
            ].map((shop) => (
              <div key={shop.name} className="rounded-lg bg-zinc-800/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{shop.icon}</span>
                    <span className="text-sm font-medium text-white">
                      {shop.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    ${shop.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="mb-1 h-2 overflow-hidden rounded-full bg-zinc-700">
                  <div
                    className={`h-full rounded-full bg-${shop.color}-500`}
                    style={{
                      width: `${(shop.revenue / MERCHANT_STATS.totalRevenue) * 100}%`,
                      backgroundColor:
                        shop.color === "purple"
                          ? "#a855f7"
                          : shop.color === "pink"
                            ? "#ec4899"
                            : "#6366f1",
                    }}
                  />
                </div>
                <div className="text-xs text-zinc-400">
                  {shop.orders.toLocaleString()} orders
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product inventory table */}
      <ProductTable />
    </div>
  );
}
