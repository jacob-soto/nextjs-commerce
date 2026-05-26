import { StatCard } from "components/platform/stat-card";
import { CategoryFilter } from "components/platform/advanced/category-filter";
import { FeatureTools } from "components/platform/advanced/feature-tools";
import {
  ADVANCED_FEATURES,
  FEATURE_CATEGORIES,
} from "lib/platform/advanced-features";

export const metadata = { title: "Advanced Features — NEXUS Platform" };

export default function AdvancedFeaturesPage() {
  const stable = ADVANCED_FEATURES.filter((f) => f.status === "stable").length;
  const beta = ADVANCED_FEATURES.filter((f) => f.status === "beta").length;
  const experimental = ADVANCED_FEATURES.filter(
    (f) => f.status === "experimental",
  ).length;

  return (
    <div className="space-y-6" data-testid="admin-advanced-page">
      <header>
        <h1 className="text-2xl font-bold text-white">Advanced Features</h1>
        <p className="text-sm text-neutral-400">
          Cross-cutting capabilities, feature flags, and inline tools for the
          NEXUS platform — fully keyboard navigable and WCAG 2.2 AA compliant.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total Features"
          value={ADVANCED_FEATURES.length}
          sub={`Across ${FEATURE_CATEGORIES.length} categories`}
          color="text-cyan-400"
        />
        <StatCard
          label="Stable"
          value={stable}
          sub="Generally available"
          color="text-green-400"
        />
        <StatCard
          label="Beta"
          value={beta}
          sub="Production-ready, may evolve"
          color="text-amber-400"
        />
        <StatCard
          label="Experimental"
          value={experimental}
          sub="Behind a feature flag"
          color="text-purple-400"
        />
      </div>

      <CategoryFilter />

      <FeatureTools />
    </div>
  );
}
