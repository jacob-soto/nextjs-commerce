import { StatusBadge } from "components/platform/status-badge";
import type { AdvancedFeature } from "lib/platform/advanced-features";

const CATEGORY_LABEL: Record<AdvancedFeature["category"], string> = {
  platform: "Platform",
  commerce: "Commerce",
  security: "Security",
  observability: "Observability",
  developer: "Developer",
};

export function FeatureCard({ feature }: { feature: AdvancedFeature }) {
  const headingId = `${feature.id}-heading`;
  const descId = `${feature.id}-desc`;

  return (
    <article
      data-testid={feature.testId}
      aria-labelledby={headingId}
      aria-describedby={descId}
      className="flex h-full flex-col rounded-xl border border-neutral-700 bg-neutral-800/40 p-5 text-neutral-200 focus-within:ring-2 focus-within:ring-cyan-300"
    >
      <header className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
            {CATEGORY_LABEL[feature.category]}
          </p>
          <h3
            id={headingId}
            className="mt-1 text-base font-semibold text-white"
          >
            {feature.title}
          </h3>
        </div>
        <StatusBadge status={feature.status} />
      </header>

      <p id={descId} className="text-sm leading-relaxed text-neutral-300">
        {feature.summary}
      </p>

      <p className="mt-2 text-xs leading-relaxed text-neutral-400">
        {feature.details}
      </p>

      <dl
        className="mt-4 grid grid-cols-3 gap-3 border-t border-neutral-700 pt-3"
        aria-label={`${feature.title} key metrics`}
      >
        {feature.metrics.map((metric) => (
          <div key={metric.label}>
            <dt className="text-[10px] uppercase tracking-wider text-neutral-500">
              {metric.label}
            </dt>
            <dd className="mt-0.5 font-mono text-sm text-cyan-300">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
