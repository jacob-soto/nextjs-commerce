import { BodyNav } from "components/body/nav";
import { BodyMap } from "components/body/map";
import { getSuppliers } from "lib/body/suppliers";
import type { MapUser } from "lib/body/data";

export const metadata = {
  title: "Explore",
};

export const revalidate = 3600;

export default async function BodyHomePage() {
  const suppliers = await getSuppliers();
  const users: MapUser[] = suppliers.map((s, i) => ({
    id: s.slug,
    username: s.slug,
    avatar: s.avatar,
    lat: s.lat,
    lng: s.lng,
    status: "online",
    bio: s.tagline,
    lastSeen: "Now",
    distance: `${(0.1 + (i % 10) * 0.2).toFixed(1)} mi`,
    url: s.url,
  }));

  return (
    <div className="h-screen bg-zinc-950">
      <BodyNav />
      <div className="h-full pt-16 md:pt-16">
        <BodyMap users={users} />
      </div>
    </div>
  );
}
