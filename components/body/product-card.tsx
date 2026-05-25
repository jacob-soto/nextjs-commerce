"use client";

import { useState } from "react";
import type { Product } from "lib/body/data";

export function ProductCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const isUrl = product.image.startsWith("http");

  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900">
      <div className="relative mb-3 flex h-40 items-center justify-center overflow-hidden rounded-xl bg-zinc-800/50">
        {isUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <span className="text-5xl transition-transform group-hover:scale-110">
            {product.image}
          </span>
        )}
        {product.badge && (
          <span className="absolute top-2 left-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            {product.badge}
          </span>
        )}
      </div>

      <div className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
        {product.category}
      </div>
      <h3 className="mb-1 text-sm font-semibold text-white">{product.name}</h3>
      <p className="mb-2 text-xs text-zinc-400">{product.description}</p>

      {product.rating > 0 && (
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`text-xs ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-zinc-600"}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-zinc-500">({product.reviews})</span>
        </div>
      )}

      {product.colors && product.colors.length > 0 && (
        <div className="mb-2 flex gap-1.5">
          {product.colors.map((color, i) => (
            <button
              key={color}
              onClick={() => setSelectedColor(i)}
              className={`rounded-md px-2 py-0.5 text-[10px] transition-all ${
                selectedColor === i
                  ? "bg-zinc-700 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-300"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      )}

      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {product.sizes.map((size, i) => (
            <button
              key={size}
              onClick={() => setSelectedSize(i)}
              className={`rounded-md px-2 py-0.5 text-[10px] transition-all ${
                selectedSize === i
                  ? "bg-zinc-700 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-white">
          ${product.price.toFixed(2)}
        </span>
        <button className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1.5 text-xs font-semibold transition-opacity hover:opacity-90">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
