import { NextResponse } from "next/server";
import { getShopProducts } from "lib/body/shopify-products";
import { getSuppliers } from "lib/body/suppliers";

export const revalidate = 3600;

export async function GET() {
  const [designer, intimates, athletics, suppliers] = await Promise.all([
    getShopProducts("designer"),
    getShopProducts("intimates"),
    getShopProducts("athletics"),
    getSuppliers(),
  ]);

  return NextResponse.json({
    platform: "body.app",
    version: "1.0.0",
    status: "operational",
    sources: {
      products: "shopify-storefront",
      merchants:
        "https://github.com/jcnrs3/best-dropshipping-tools (parsed README)",
    },
    stats: {
      merchants: suppliers.length,
      shops: {
        designer: {
          products: designer.length,
          categories: [...new Set(designer.map((p) => p.category))],
        },
        intimates: {
          products: intimates.length,
          categories: [...new Set(intimates.map((p) => p.category))],
        },
        athletics: {
          products: athletics.length,
          categories: [...new Set(athletics.map((p) => p.category))],
        },
      },
    },
  });
}
