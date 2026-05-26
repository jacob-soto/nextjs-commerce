"use client";

import { useId, useState } from "react";
import { FeatureCard } from "components/platform/advanced/feature-card";
import {
  ADVANCED_FEATURES,
  FEATURE_CATEGORIES,
  type FeatureCategory,
} from "lib/platform/advanced-features";

type FilterValue = FeatureCategory | "all";

export function CategoryFilter() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const groupId = useId();
  const liveId = useId();

  const filtered =
    filter === "all"
      ? ADVANCED_FEATURES
      : ADVANCED_FEATURES.filter((f) => f.category === filter);

  return (
    <section
      aria-labelledby={`${groupId}-label`}
      className="space-y-4"
      data-testid="features-section"
    >
      <div
        role="radiogroup"
        aria-labelledby={`${groupId}-label`}
        className="flex flex-wrap items-center gap-2"
      >
        <span
          id={`${groupId}-label`}
          className="mr-1 text-xs font-semibold uppercase tracking-wider text-neutral-400"
        >
          Filter
        </span>
        <FilterChip
          label="All"
          active={filter === "all"}
          onClick={() => setFilter("all")}
          testId="filter-all"
        />
        {FEATURE_CATEGORIES.map((category) => (
          <FilterChip
            key={category.id}
            label={category.label}
            active={filter === category.id}
            onClick={() => setFilter(category.id)}
            testId={`filter-${category.id}`}
          />
        ))}
      </div>

      <p
        id={liveId}
        role="status"
        aria-live="polite"
        className="text-xs text-neutral-500"
        data-testid="features-count"
      >
        Showing {filtered.length} of {ADVANCED_FEATURES.length} features
      </p>

      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        data-testid="features-grid"
      >
        {filtered.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  testId,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  testId: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      data-testid={testId}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${
        active
          ? "border-cyan-400 bg-cyan-400/10 text-cyan-200"
          : "border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-500 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
