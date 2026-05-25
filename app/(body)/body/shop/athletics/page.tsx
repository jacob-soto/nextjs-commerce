import { ATHLETICS_PRODUCTS } from "lib/body/data";
import { ShopPage } from "components/body/shop-page";

export const metadata = {
  title: "Athletics Shop",
};

export default function AthleticsShopPage() {
  return (
    <ShopPage
      title="Athletics Shop"
      subtitle="Vitamins, supplements, and sports equipment"
      icon="💪"
      gradient="from-indigo-900/60 via-zinc-950 to-zinc-950"
      products={ATHLETICS_PRODUCTS}
      categories={["Supplements", "Equipment", "Apparel"]}
      bannerText="Subscribe & save 15% on supplements"
    />
  );
}
