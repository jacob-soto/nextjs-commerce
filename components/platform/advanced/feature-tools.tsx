"use client";

import { useId, useState } from "react";
import { FEATURE_TOOLS } from "lib/platform/advanced-features";

interface ToolRunResult {
  status: "idle" | "running" | "success" | "error";
  message: string;
}

export function FeatureTools() {
  return (
    <section
      aria-labelledby="feature-tools-heading"
      className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5"
      data-testid="feature-tools"
    >
      <header className="mb-4">
        <h2
          id="feature-tools-heading"
          className="text-sm font-semibold uppercase tracking-wider text-neutral-300"
        >
          Inline Tools
        </h2>
        <p className="mt-1 text-xs text-neutral-500">
          Stateless utilities that operate against the current environment. All
          actions are logged to the audit trail.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <CachePurgeTool />
        <FlagToggleTool />
        <WebhookReplayTool />
      </div>
    </section>
  );
}

function ToolShell({
  toolId,
  title,
  description,
  children,
}: {
  toolId: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const tool = FEATURE_TOOLS.find((t) => t.id === toolId);
  return (
    <div
      data-testid={tool?.testId ?? `tool-${toolId}`}
      className="flex flex-col gap-3 rounded-lg border border-neutral-700 bg-neutral-900/60 p-4 focus-within:ring-2 focus-within:ring-cyan-300"
    >
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-xs text-neutral-400">{description}</p>
      </div>
      {children}
    </div>
  );
}

function ResultLine({ result }: { result: ToolRunResult }) {
  if (result.status === "idle") return null;
  const color =
    result.status === "success"
      ? "text-green-300"
      : result.status === "error"
        ? "text-red-300"
        : "text-blue-300";
  return (
    <p
      role="status"
      aria-live="polite"
      className={`mt-1 font-mono text-xs ${color}`}
      data-testid="tool-result"
    >
      {result.message}
    </p>
  );
}

function CachePurgeTool() {
  const inputId = useId();
  const [tags, setTags] = useState("");
  const [result, setResult] = useState<ToolRunResult>({
    status: "idle",
    message: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const list = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (list.length === 0) {
      setResult({ status: "error", message: "Enter at least one cache tag." });
      return;
    }
    setResult({ status: "running", message: "Dispatching revalidateTag…" });
    window.setTimeout(() => {
      setResult({
        status: "success",
        message: `Purged ${list.length} tag${list.length === 1 ? "" : "s"}: ${list.join(", ")}`,
      });
    }, 250);
  }

  return (
    <ToolShell
      toolId="cache-purge"
      title="Cache Tag Purge"
      description="Trigger revalidateTag for a comma-separated list of tags."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor={inputId} className="sr-only">
          Cache tags to purge
        </label>
        <input
          id={inputId}
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="products, collections:summer"
          className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-sm text-white placeholder:text-neutral-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          data-testid="cache-purge-input"
          autoComplete="off"
        />
        <button
          type="submit"
          className="self-start rounded-md border border-cyan-400 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          data-testid="cache-purge-submit"
        >
          Purge tags
        </button>
        <ResultLine result={result} />
      </form>
    </ToolShell>
  );
}

function FlagToggleTool() {
  const [enabled, setEnabled] = useState(true);
  const switchId = useId();

  return (
    <ToolShell
      toolId="flag-toggle"
      title="Feature Flag Toggle"
      description="Demo: flip the `checkout-v2` flag and emit an audit entry."
    >
      <div className="flex items-center justify-between rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2">
        <label
          htmlFor={switchId}
          className="text-sm font-medium text-neutral-200"
        >
          checkout-v2
        </label>
        <button
          id={switchId}
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label="Toggle the checkout-v2 feature flag"
          onClick={() => setEnabled((v) => !v)}
          data-testid="flag-toggle-switch"
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${
            enabled ? "bg-cyan-500" : "bg-neutral-600"
          }`}
        >
          <span
            aria-hidden="true"
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
              enabled ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className="font-mono text-xs text-neutral-400"
        data-testid="flag-toggle-state"
      >
        State: <span className="text-cyan-300">{enabled ? "ON" : "OFF"}</span>
      </p>
    </ToolShell>
  );
}

function WebhookReplayTool() {
  const inputId = useId();
  const selectId = useId();
  const [webhookId, setWebhookId] = useState("");
  const [env, setEnv] = useState("staging");
  const [result, setResult] = useState<ToolRunResult>({
    status: "idle",
    message: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!webhookId.trim()) {
      setResult({ status: "error", message: "Webhook ID is required." });
      return;
    }
    setResult({ status: "running", message: `Replaying to ${env}…` });
    window.setTimeout(() => {
      setResult({
        status: "success",
        message: `Replayed webhook ${webhookId.trim()} → ${env}`,
      });
    }, 250);
  }

  return (
    <ToolShell
      toolId="webhook-replay"
      title="Webhook Replay"
      description="Re-deliver a webhook by ID to a chosen environment."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor={inputId} className="text-xs text-neutral-400">
          Webhook ID
        </label>
        <input
          id={inputId}
          name="webhookId"
          value={webhookId}
          onChange={(e) => setWebhookId(e.target.value)}
          placeholder="wh_01HQ…"
          className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-sm text-white placeholder:text-neutral-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          data-testid="webhook-replay-id"
          autoComplete="off"
        />
        <label htmlFor={selectId} className="text-xs text-neutral-400">
          Target environment
        </label>
        <select
          id={selectId}
          value={env}
          onChange={(e) => setEnv(e.target.value)}
          className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          data-testid="webhook-replay-env"
        >
          <option value="staging">staging</option>
          <option value="production">production</option>
        </select>
        <button
          type="submit"
          className="self-start rounded-md border border-cyan-400 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          data-testid="webhook-replay-submit"
        >
          Replay
        </button>
        <ResultLine result={result} />
      </form>
    </ToolShell>
  );
}
