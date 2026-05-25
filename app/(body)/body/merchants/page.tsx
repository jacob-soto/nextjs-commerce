import { BodyNav } from "components/body/nav";
import { MerchantDashboard } from "components/body/merchant-dashboard";
import { getShopProducts } from "lib/body/shopify-products";
import { getSuppliers } from "lib/body/suppliers";

export const metadata = {
  title: "Merchant Dashboard",
};

export const revalidate = 3600;

export default async function MerchantsPage() {
  const [designer, intimates, athletics, suppliers] = await Promise.all([
    getShopProducts("designer"),
    getShopProducts("intimates"),
    getShopProducts("athletics"),
    getSuppliers(),
  ]);
  const products = [...designer, ...intimates, ...athletics];

  return (
    <div className="min-h-screen bg-zinc-950">
      <BodyNav />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Merchant Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Live product counts from Shopify · merchant directory from{" "}
            <a
              href="https://github.com/jcnrs3/best-dropshipping-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 underline-offset-2 hover:underline"
            >
              jcnrs3/best-dropshipping-tools
            </a>
          </p>
        </div>
        <MerchantDashboard
          products={products}
          merchantCount={suppliers.length}
        />
      </div>
    </div>
  );
}
