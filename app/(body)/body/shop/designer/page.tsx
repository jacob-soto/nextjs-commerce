import { ShopPage } from "components/body/shop-page";
import { getShopProducts } from "lib/body/shopify-products";

export const metadata = {
  title: "Designer Clothing & Apparel",
};

export const revalidate = 3600;

export default async function DesignerShopPage() {
  const products = await getShopProducts("designer");
  return (
    <ShopPage
      title="Designer Clothing & Apparel"
      subtitle="Custom-crafted fashion pieces for every body"
      icon="✂️"
      gradient="from-purple-900/60 via-zinc-950 to-zinc-950"
      products={products}
      categories={["Tops", "Bottoms", "Outerwear", "Accessories"]}
      bannerText="Free alterations on orders over $200"
      collectionHandle="designer"
    />
  );
}
