// Advanced feature catalog for the NEXUS admin platform.
// Each feature is a self-contained card with optional embedded tooling.

export type FeatureStatus = "stable" | "beta" | "experimental" | "deprecated";
export type FeatureCategory =
  | "platform"
  | "commerce"
  | "security"
  | "observability"
  | "developer";

export interface AdvancedFeature {
  id: string;
  title: string;
  category: FeatureCategory;
  status: FeatureStatus;
  summary: string;
  details: string;
  metrics: { label: string; value: string }[];
  docsUrl?: string;
  /** Stable selector used by Playwright tests across browsers. */
  testId: string;
}

export const ADVANCED_FEATURES: AdvancedFeature[] = [
  {
    id: "feature-flags",
    title: "Feature Flag Manager",
    category: "platform",
    status: "stable",
    summary:
      "Roll out features progressively with percentage-based exposure and per-segment overrides.",
    details:
      "Targets are evaluated at the edge so flag lookups add <1ms to request latency. Audit log entries are emitted on every flag toggle and exported to the Security audit trail.",
    metrics: [
      { label: "Active flags", value: "37" },
      { label: "Edge p99", value: "0.8 ms" },
      { label: "Rollback time", value: "<1s" },
    ],
    testId: "card-feature-flags",
  },
  {
    id: "rate-limiter",
    title: "Adaptive Rate Limiter",
    category: "security",
    status: "stable",
    summary:
      "Sliding-window token bucket per principal with automatic burst detection and circuit breaking.",
    details:
      "Backed by Redis with a Lua atomic increment script. Default policy: 100 req/min per IP, 5000 req/min per authenticated tenant. Bypass tokens supported for internal probes.",
    metrics: [
      { label: "Policies", value: "12" },
      { label: "Throttled / hr", value: "1.2k" },
      { label: "False positives", value: "<0.1%" },
    ],
    testId: "card-rate-limiter",
  },
  {
    id: "cache-inspector",
    title: "Cache Inspector & Invalidator",
    category: "observability",
    status: "stable",
    summary:
      "Inspect Next.js Data Cache entries and dispatch tag-based revalidation without redeploying.",
    details:
      "Uses revalidateTag under the hood with idempotency keys to prevent thundering herds. Per-tag TTL histograms and hit/miss ratios are surfaced live.",
    metrics: [
      { label: "Hit ratio", value: "94.2%" },
      { label: "Cached tags", value: "248" },
      { label: "Last purge", value: "12m ago" },
    ],
    testId: "card-cache-inspector",
  },
  {
    id: "webhook-replay",
    title: "Webhook Replay Console",
    category: "developer",
    status: "beta",
    summary:
      "Inspect, filter, and replay Shopify / Stripe / GitHub webhooks against any environment.",
    details:
      "Signature verification status is preserved on replay. Bodies are encrypted at rest with envelope keys rotated every 90 days.",
    metrics: [
      { label: "Captured / day", value: "8,431" },
      { label: "Replay success", value: "99.6%" },
      { label: "Sources", value: "9" },
    ],
    testId: "card-webhook-replay",
  },
  {
    id: "ab-tests",
    title: "Server-Side A/B Tests",
    category: "commerce",
    status: "beta",
    summary:
      "SSR-safe split testing with sticky bucketing and automated SRM (Sample Ratio Mismatch) detection.",
    details:
      "Variants are resolved in middleware so bots and CDN traffic don't pollute the bucketing distribution. Experiment results stream to BigQuery for downstream stats.",
    metrics: [
      { label: "Running tests", value: "6" },
      { label: "Bucketing skew", value: "0.4%" },
      { label: "Sig. winners", value: "11 / 32" },
    ],
    testId: "card-ab-tests",
  },
  {
    id: "audit-trail",
    title: "Tamper-Evident Audit Trail",
    category: "security",
    status: "stable",
    summary:
      "Hash-chained, append-only audit log of every admin action with optional WORM export.",
    details:
      "Each entry is signed with the previous entry's hash, allowing forensic verification of an unbroken chain. Hourly anchor hashes are published to a public ledger.",
    metrics: [
      { label: "Events / 24h", value: "14,902" },
      { label: "Chain length", value: "2,184,773" },
      { label: "Last anchor", value: "06 min ago" },
    ],
    testId: "card-audit-trail",
  },
  {
    id: "perf-profiler",
    title: "Real-User Performance Profiler",
    category: "observability",
    status: "stable",
    summary:
      "Captures Core Web Vitals and INP traces from production traffic with privacy-preserving sampling.",
    details:
      "10% sample rate by default, increased to 100% for the slowest 1% of sessions. Reports broken down by route, device, and network class.",
    metrics: [
      { label: "LCP p75", value: "1.9 s" },
      { label: "INP p75", value: "172 ms" },
      { label: "CLS p75", value: "0.04" },
    ],
    testId: "card-perf-profiler",
  },
  {
    id: "data-export",
    title: "Data Export & DSAR Tool",
    category: "security",
    status: "stable",
    summary:
      "GDPR / CCPA-compliant subject access requests with redaction templates and signed download URLs.",
    details:
      "Exports are signed with a per-tenant Ed25519 key and expire after 7 days. PII redaction is applied via a configurable rules engine.",
    metrics: [
      { label: "Requests / mo", value: "23" },
      { label: "Median TAT", value: "4h 12m" },
      { label: "SLA compliance", value: "100%" },
    ],
    testId: "card-data-export",
  },
];

export const FEATURE_CATEGORIES: { id: FeatureCategory; label: string }[] = [
  { id: "platform", label: "Platform" },
  { id: "commerce", label: "Commerce" },
  { id: "security", label: "Security" },
  { id: "observability", label: "Observability" },
  { id: "developer", label: "Developer" },
];

export interface FeatureToolDefinition {
  id: string;
  title: string;
  description: string;
  testId: string;
}

export const FEATURE_TOOLS: FeatureToolDefinition[] = [
  {
    id: "cache-purge",
    title: "Cache Tag Purge",
    description: "Trigger revalidateTag for a comma-separated list of tags.",
    testId: "tool-cache-purge",
  },
  {
    id: "flag-toggle",
    title: "Feature Flag Toggle",
    description: "Flip a flag on/off and emit an audit-log entry.",
    testId: "tool-flag-toggle",
  },
  {
    id: "webhook-replay",
    title: "Webhook Replay",
    description: "Re-deliver a webhook by ID to a chosen environment.",
    testId: "tool-webhook-replay",
  },
];
