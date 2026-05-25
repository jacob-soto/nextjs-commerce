import { NextResponse } from "next/server";
import {
  MAP_USERS,
  DESIGNER_PRODUCTS,
  INTIMATES_PRODUCTS,
  ATHLETICS_PRODUCTS,
  MERCHANT_STATS,
} from "lib/body/data";

export async function GET() {
  return NextResponse.json({
    platform: "body.app",
    version: "1.0.0",
    status: "operational",
    stats: {
      activeUsers: MAP_USERS.filter((u) => u.status === "online").length,
      totalUsers: MAP_USERS.length,
      shops: {
        designer: {
          products: DESIGNER_PRODUCTS.length,
          categories: [...new Set(DESIGNER_PRODUCTS.map((p) => p.category))],
        },
        intimates: {
          products: INTIMATES_PRODUCTS.length,
          categories: [...new Set(INTIMATES_PRODUCTS.map((p) => p.category))],
        },
        athletics: {
          products: ATHLETICS_PRODUCTS.length,
          categories: [...new Set(ATHLETICS_PRODUCTS.map((p) => p.category))],
        },
      },
      merchant: MERCHANT_STATS,
    },
  });
}
