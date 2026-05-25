import { INTIMATES_PRODUCTS } from "lib/body/data";
import { ShopPage } from "components/body/shop-page";

export const metadata = {
  title: "Intimates & Accessories",
};

export default function IntimatesShopPage() {
  return (
    <ShopPage
      title="Intimates & Accessories"
      subtitle="Premium underwear, toys, and self-care essentials"
      icon="🔥"
      gradient="from-pink-900/60 via-zinc-950 to-zinc-950"
      products={INTIMATES_PRODUCTS}
      categories={["Underwear", "Bodywear", "Loungewear", "Accessories"]}
      bannerText="Discreet packaging on all orders"
    />
  );
}
