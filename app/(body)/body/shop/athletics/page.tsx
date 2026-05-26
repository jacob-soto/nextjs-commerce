import { ShopPage } from "components/body/shop-page";
import { getShopProducts } from "lib/body/shopify-products";

export const metadata = {
  title: "Athletics Shop",
};

export const revalidate = 3600;

export default async function AthleticsShopPage() {
  const products = await getShopProducts("athletics");
  return (
    <ShopPage
      title="Athletics Shop"
      subtitle="Vitamins, supplements, and sports equipment"
      icon="💪"
      gradient="from-indigo-900/60 via-zinc-950 to-zinc-950"
      products={products}
      categories={["Supplements", "Equipment", "Apparel"]}
      bannerText="Subscribe & save 15% on supplements"
      collectionHandle="athletics"
    />
  );
}
