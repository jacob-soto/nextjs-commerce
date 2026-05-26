"use client";

import { useState } from "react";
import type { Product } from "lib/body/data";

function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        {hint ? (
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
            {hint}
          </span>
        ) : null}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-zinc-400">{label}</div>
    </div>
  );
}

function ProductTable({ products }: { products: Product[] }) {
  const [activeShop, setActiveShop] = useState<
    "all" | "designer" | "intimates" | "athletics"
  >("all");

  const filtered =
    activeShop === "all"
      ? products
      : products.filter((p) => p.shop === activeShop);

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
      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-500">
          No products. Configure SHOPIFY_STORE_DOMAIN and
          SHOPIFY_STOREFRONT_ACCESS_TOKEN to load real inventory.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs text-zinc-500">
                <th className="pb-2 font-medium">Product</th>
                <th className="pb-2 font-medium">Shop</th>
                <th className="pb-2 font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/30"
                >
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      {p.image.startsWith("http") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-8 w-8 rounded object-cover"
                        />
                      ) : (
                        <span>{p.image}</span>
                      )}
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
                  <td className="text-zinc-300">${p.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

interface MerchantDashboardProps {
  products: Product[];
  merchantCount: number;
}

export function MerchantDashboard({
  products,
  merchantCount,
}: MerchantDashboardProps) {
  const designerCount = products.filter((p) => p.shop === "designer").length;
  const intimatesCount = products.filter((p) => p.shop === "intimates").length;
  const athleticsCount = products.filter((p) => p.shop === "athletics").length;
  const shopifyConfigured = products.length > 0;

  return (
    <div className="space-y-6">
      {/* Stat cards: only counts we can derive from live data */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          icon="🏷️"
          label="Total Products"
          value={products.length.toString()}
          hint={shopifyConfigured ? "Shopify" : "—"}
        />
        <StatCard
          icon="🤝"
          label="Merchants"
          value={merchantCount.toString()}
          hint="GitHub"
        />
        <StatCard icon="✂️" label="Designer" value={designerCount.toString()} />
        <StatCard
          icon="🔥"
          label="Intimates"
          value={intimatesCount.toString()}
        />
        <StatCard
          icon="💪"
          label="Athletics"
          value={athleticsCount.toString()}
        />
      </div>

      {/* Honest banner about what's missing */}
      <div className="rounded-xl border border-amber-700/40 bg-amber-500/5 p-4 text-sm text-amber-200">
        <strong>Revenue / orders / conversion analytics not available.</strong>{" "}
        The Shopify Storefront API does not expose order data. Configure a
        Shopify Admin API token (separate from the Storefront token) to wire up
        revenue charts, recent orders, and conversion-rate cards.
      </div>

      {/* Shop performance: real product counts per collection */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Shop Performance
        </h3>
        <div className="space-y-4">
          {[
            {
              name: "Designer Clothing",
              icon: "✂️",
              count: designerCount,
              color: "#a855f7",
            },
            {
              name: "Intimates & Accessories",
              icon: "🔥",
              count: intimatesCount,
              color: "#ec4899",
            },
            {
              name: "Athletics Shop",
              icon: "💪",
              count: athleticsCount,
              color: "#6366f1",
            },
          ].map((shop) => {
            const pct =
              products.length === 0 ? 0 : (shop.count / products.length) * 100;
            return (
              <div key={shop.name} className="rounded-lg bg-zinc-800/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{shop.icon}</span>
                    <span className="text-sm font-medium text-white">
                      {shop.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {shop.count} products
                  </span>
                </div>
                <div className="mb-1 h-2 overflow-hidden rounded-full bg-zinc-700">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: shop.color,
                    }}
                  />
                </div>
                <div className="text-xs text-zinc-400">
                  {pct.toFixed(1)}% of catalog
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProductTable products={products} />
    </div>
  );
}
