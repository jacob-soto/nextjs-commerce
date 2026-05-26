/**
 * Adapters that pull body.app shop products from the Shopify
 * Storefront API.
 *
 * The body.app UI components were originally written against a
 * local `Product` shape (see `lib/body/data.ts`). To avoid
 * rewriting every card / table, these adapters reshape Shopify
 * products into that same shape.
 *
 * When the Shopify env vars are not set the upstream
 * `getCollectionProducts` call will throw on `fetch`; we catch
 * that here and return an empty array so the route still renders.
 */

import { getCollectionProducts, getProducts } from "lib/shopify";
import type { Product as ShopifyProduct } from "lib/shopify/types";
import type { Product } from "./data";

const PRODUCT_EMOJI: Record<Product["shop"], string> = {
  designer: "👕",
  intimates: "🩱",
  athletics: "🏋️",
};

function reshape(p: ShopifyProduct, shop: Product["shop"]): Product {
  const priceStr = p.priceRange?.maxVariantPrice?.amount ?? "0";
  const price = Number.parseFloat(priceStr) || 0;
  const tagCategory = p.tags?.find((t) => t.startsWith("category:"));
  const category = tagCategory?.slice("category:".length) ?? "All";
  return {
    id: p.id,
    name: p.title,
    price,
    image: p.featuredImage?.url ?? PRODUCT_EMOJI[shop],
    category,
    shop,
    description: p.description ?? "",
    rating: 0,
    reviews: 0,
    badge: p.availableForSale ? undefined : "Sold Out",
  };
}

export async function getShopProducts(
  shop: Product["shop"],
): Promise<Product[]> {
  try {
    const products = await getCollectionProducts({ collection: shop });
    return products.map((p) => reshape(p, shop));
  } catch {
    return [];
  }
}

export async function getAllShopifyProducts(): Promise<Product[]> {
  try {
    const products = await getProducts({});
    return products.map((p) => {
      const tag = p.tags?.find((t) => t.startsWith("shop:"));
      const shop =
        (tag?.slice("shop:".length) as Product["shop"]) ?? "designer";
      return reshape(p, shop);
    });
  } catch {
    return [];
  }
}
