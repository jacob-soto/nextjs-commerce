import { BodyNav } from "components/body/nav";
import { BodyMap } from "components/body/map";

export const metadata = {
  title: "Explore",
};

export default function BodyHomePage() {
  return (
    <div className="h-screen bg-zinc-950">
      <BodyNav />
      <div className="h-full pt-16 md:pt-16">
        <BodyMap />
      </div>
    </div>
  );
}
