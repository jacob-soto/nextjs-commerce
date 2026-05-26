"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { FeatureCard } from "components/platform/advanced/feature-card";
import {
  ADVANCED_FEATURES,
  FEATURE_CATEGORIES,
  type FeatureCategory,
} from "lib/platform/advanced-features";

type FilterValue = FeatureCategory | "all";

interface FilterOption {
  id: FilterValue;
  label: string;
  testId: string;
}

export function CategoryFilter() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const groupId = useId();
  const liveId = useId();
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const options: FilterOption[] = [
    { id: "all", label: "All", testId: "filter-all" },
    ...FEATURE_CATEGORIES.map((category) => ({
      id: category.id satisfies FilterValue,
      label: category.label,
      testId: `filter-${category.id}`,
    })),
  ];

  const filtered =
    filter === "all"
      ? ADVANCED_FEATURES
      : ADVANCED_FEATURES.filter((f) => f.category === filter);

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | null = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % options.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + options.length) % options.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = options.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    const next = options[nextIndex];
    if (!next) return;
    setFilter(next.id);
    buttonRefs.current[nextIndex]?.focus();
  }

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
        {options.map((option, index) => {
          const active = filter === option.id;
          return (
            <button
              key={option.id}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              onClick={() => setFilter(option.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              data-testid={option.testId}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${
                active
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-200"
                  : "border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-500 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          );
        })}
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
