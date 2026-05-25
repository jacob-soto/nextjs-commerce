/**
 * Shared TypeScript types for body.app data.
 *
 * NOTE: this module used to export large arrays of mock products,
 * users, and merchant stats. The static data has been removed in
 * favor of live backends:
 *
 *   - Map "users" (now merchants) come from
 *     `lib/body/suppliers.ts` (parses the public README of
 *     jcnrs3/best-dropshipping-tools).
 *   - Shop products come from `lib/body/shopify-products.ts`
 *     (Shopify Storefront API; falls back to an empty array if the
 *     SHOPIFY_* env vars are not configured).
 *   - Merchant analytics (orders, revenue, conversion) require the
 *     Shopify Admin API and are not yet wired up — those panels
 *     render empty-state placeholders.
 *
 * Keeping the type definitions here so existing components can
 * continue importing `Product`, `MapUser`, etc.
 */

export interface MapUser {
  id: string;
  username: string;
  avatar: string;
  lat: number;
  lng: number;
  status: "online" | "idle" | "offline";
  bio: string;
  lastSeen: string;
  distance: string;
  /** Optional outbound link (real-merchant homepage). */
  url?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  /** Either an emoji glyph or an absolute image URL. */
  image: string;
  category: string;
  shop: "designer" | "intimates" | "athletics";
  description: string;
  rating: number;
  reviews: number;
  badge?: string;
  colors?: string[];
  sizes?: string[];
}

export interface MerchantStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  conversionRate: number;
  avgOrderValue: number;
  monthlyGrowth: number;
}
