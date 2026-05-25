"use client";

import { useState } from "react";
import type { Product } from "lib/body/data";
import { ProductCard } from "./product-card";
import { BodyNav } from "./nav";

interface ShopPageProps {
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  products: Product[];
  categories: string[];
  bannerText: string;
  /** Shopify collection handle this shop is wired to. Used in the empty-state hint. */
  collectionHandle: string;
}

export function ShopPage({
  title,
  subtitle,
  icon,
  gradient,
  products,
  categories,
  bannerText,
  collectionHandle,
}: ShopPageProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<
    "featured" | "price-low" | "price-high" | "rating"
  >("featured");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-zinc-950">
      <BodyNav />

      {/* Hero banner */}
      <div className={`bg-gradient-to-r ${gradient} relative pt-28 pb-12`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-white">{title}</h1>
              <p className="text-sm text-white/70">{subtitle}</p>
            </div>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm">
            <span>✨</span> {bannerText}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Filters bar */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | "featured"
                    | "price-low"
                    | "price-high"
                    | "rating",
                )
              }
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-white focus:border-pink-500 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="mb-4 text-sm text-zinc-500">
          {sorted.length} product{sorted.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
            <div className="mb-3 text-4xl">🛍️</div>
            <h2 className="text-lg font-semibold text-white">
              No products from Shopify
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              This shop pulls from the Shopify Storefront collection
              <code className="mx-1 rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-200">
                {collectionHandle}
              </code>
              . Set
              <code className="mx-1 rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-200">
                SHOPIFY_STORE_DOMAIN
              </code>
              and
              <code className="mx-1 rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-200">
                SHOPIFY_STOREFRONT_ACCESS_TOKEN
              </code>
              and create that collection to populate this page.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
