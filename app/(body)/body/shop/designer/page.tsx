import { DESIGNER_PRODUCTS } from "lib/body/data";
import { ShopPage } from "components/body/shop-page";

export const metadata = {
  title: "Designer Clothing & Apparel",
};

export default function DesignerShopPage() {
  return (
    <ShopPage
      title="Designer Clothing & Apparel"
      subtitle="Custom-crafted fashion pieces for every body"
      icon="✂️"
      gradient="from-purple-900/60 via-zinc-950 to-zinc-950"
      products={DESIGNER_PRODUCTS}
      categories={["Tops", "Bottoms", "Outerwear", "Accessories"]}
      bannerText="Free alterations on orders over $200"
    />
  );
}
