import { ShopPage } from "components/body/shop-page";
import { getShopProducts } from "lib/body/shopify-products";

export const metadata = {
  title: "Intimates & Accessories",
};

export const revalidate = 3600;

export default async function IntimatesShopPage() {
  const products = await getShopProducts("intimates");
  return (
    <ShopPage
      title="Intimates & Accessories"
      subtitle="Premium underwear, toys, and self-care essentials"
      icon="🔥"
      gradient="from-pink-900/60 via-zinc-950 to-zinc-950"
      products={products}
      categories={["Underwear", "Bodywear", "Loungewear", "Accessories"]}
      bannerText="Discreet packaging on all orders"
      collectionHandle="intimates"
    />
  );
}
