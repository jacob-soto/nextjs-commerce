import { BodyNav } from "components/body/nav";
import { MerchantDashboard } from "components/body/merchant-dashboard";

export const metadata = {
  title: "Merchant Dashboard",
};

export default function MerchantsPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <BodyNav />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Merchant Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage your shops, track revenue, and monitor orders across all
            categories
          </p>
        </div>
        <MerchantDashboard />
      </div>
    </div>
  );
}
