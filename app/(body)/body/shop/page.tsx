import Link from "next/link";
import { BodyNav } from "components/body/nav";

export const metadata = {
  title: "Shop",
};

const SHOPS = [
  {
    href: "/body/shop/designer",
    title: "Designer Clothing & Apparel",
    subtitle: "Custom-crafted fashion pieces for every body",
    icon: "✂️",
    gradient: "from-purple-600 to-purple-900",
    productCount: 8,
    priceRange: "$95 - $345",
  },
  {
    href: "/body/shop/intimates",
    title: "Intimates & Accessories",
    subtitle: "Premium underwear, toys, and self-care essentials",
    icon: "🔥",
    gradient: "from-pink-600 to-pink-900",
    productCount: 8,
    priceRange: "$28 - $110",
  },
  {
    href: "/body/shop/athletics",
    title: "Athletics Shop",
    subtitle: "Vitamins, supplements, and sports equipment",
    icon: "💪",
    gradient: "from-indigo-600 to-indigo-900",
    productCount: 10,
    priceRange: "$30 - $299",
  },
];

export default function ShopIndexPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <BodyNav />
      <div className="mx-auto max-w-5xl px-4 pt-24 pb-12">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">
            Shop{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              body.app
            </span>
          </h1>
          <p className="text-zinc-400">
            Three curated stores. One platform. Everything for your body.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {SHOPS.map((shop) => (
            <Link
              key={shop.href}
              href={shop.href}
              className="group overflow-hidden rounded-2xl border border-zinc-800 transition-all hover:border-zinc-600 hover:shadow-lg hover:shadow-pink-500/5"
            >
              <div
                className={`bg-gradient-to-br ${shop.gradient} flex h-40 items-center justify-center`}
              >
                <span className="text-6xl transition-transform group-hover:scale-110">
                  {shop.icon}
                </span>
              </div>
              <div className="bg-zinc-900/50 p-5">
                <h2 className="mb-1 text-lg font-semibold text-white">
                  {shop.title}
                </h2>
                <p className="mb-3 text-sm text-zinc-400">{shop.subtitle}</p>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{shop.productCount} products</span>
                  <span>{shop.priceRange}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
