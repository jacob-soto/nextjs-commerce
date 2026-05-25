import { BodyNav } from "components/body/nav";

export const metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <BodyNav />
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-12">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <div className="mb-3 text-5xl">👤</div>
          <h1 className="text-2xl font-bold text-white">
            Sign in to view your profile
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Profile data — name, orders, wishlist, and rewards — comes from the
            Shopify Customer Account API. body.app does not store this
            information locally and the customer-account integration is not yet
            wired up.
          </p>
          <p className="mt-4 text-xs text-zinc-500">
            To enable profile data, set up a Shopify Customer Account API client
            and add the OAuth login flow to this route.
          </p>
        </div>
      </div>
    </div>
  );
}
