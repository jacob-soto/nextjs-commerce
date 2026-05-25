import { StatCard } from "components/platform/stat-card";
import { StatusBadge } from "components/platform/status-badge";
import { WORKFLOWS, NOTIFICATIONS } from "lib/platform/data";
import { timeAgo } from "lib/platform/utils";

export const metadata = { title: "Automation — NEXUS Platform" };

export default function AutomationPage() {
  const activeWorkflows = WORKFLOWS.filter((w) => w.status === "active");
  const totalSteps = WORKFLOWS.reduce((sum, w) => sum + w.steps.length, 0);
  const completedSteps = WORKFLOWS.reduce(
    (sum, w) => sum + w.steps.filter((s) => s.status === "completed").length,
    0,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Automation & Orchestration
        </h1>
        <p className="text-sm text-neutral-400">
          kubectl-ai MCP coordination, automated workflows, and batch operations
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Active Workflows"
          value={activeWorkflows.length}
          sub="Currently running"
          color="text-amber-400"
        />
        <StatCard
          label="Total Steps"
          value={totalSteps}
          sub={`${completedSteps} completed`}
          color="text-cyan-400"
        />
        <StatCard
          label="Trigger Types"
          value="4"
          sub="Schedule, Webhook, Event, Manual"
          color="text-purple-400"
        />
        <StatCard
          label="Notifications"
          value={NOTIFICATIONS.length}
          sub="Platform events tracked"
          color="text-blue-400"
        />
      </div>

      {/* Workflows */}
      <section className="space-y-4">
        {WORKFLOWS.map((workflow) => {
          const stepsCompleted = workflow.steps.filter(
            (s) => s.status === "completed",
          ).length;
          const progress = Math.round(
            (stepsCompleted / workflow.steps.length) * 100,
          );

          return (
            <div
              key={workflow.id}
              className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-white">
                      {workflow.name}
                    </h3>
                    <StatusBadge status={workflow.status} />
                  </div>
                  <p className="mt-1 text-sm text-neutral-400">
                    {workflow.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-500">
                    <span className="rounded bg-neutral-700 px-2 py-0.5 capitalize">
                      {workflow.type.replace(/-/g, " ")}
                    </span>
                    <span className="rounded bg-neutral-700 px-2 py-0.5 capitalize">
                      Trigger: {workflow.triggerType}
                    </span>
                    {workflow.schedule ? (
                      <span className="rounded bg-neutral-700 px-2 py-0.5 font-mono">
                        {workflow.schedule}
                      </span>
                    ) : null}
                    {workflow.lastRun ? (
                      <span>Last run: {timeAgo(workflow.lastRun)}</span>
                    ) : null}
                    {workflow.nextRun ? (
                      <span>Next run: {timeAgo(workflow.nextRun)}</span>
                    ) : null}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-cyan-400">
                    {progress}%
                  </p>
                  <p className="text-xs text-neutral-500">
                    {stepsCompleted}/{workflow.steps.length} steps
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-2 w-full rounded-full bg-neutral-700">
                <div
                  className="h-2 rounded-full bg-cyan-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Steps */}
              <div className="mt-4 space-y-1.5">
                {workflow.steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-3 rounded-lg bg-neutral-900/40 p-2.5"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-700 text-xs font-mono text-neutral-400">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-neutral-300">{step.name}</p>
                        <StatusBadge status={step.status} />
                      </div>
                      {step.output ? (
                        <p className="mt-0.5 truncate text-xs text-neutral-500">
                          {step.output}
                        </p>
                      ) : null}
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="rounded bg-neutral-700 px-2 py-0.5 text-[10px] uppercase text-neutral-500">
                        {step.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Batch Operations */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Batch Operations
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              label: "Deploy All Staging",
              desc: "Push all repos to staging environment",
              trigger: "manual",
              icon: ">",
            },
            {
              label: "Run Full Security Scan",
              desc: "Scan all 22 repositories against KEV",
              trigger: "manual",
              icon: "!",
            },
            {
              label: "Revenue Reconciliation",
              desc: "Reconcile all payment sources",
              trigger: "schedule",
              icon: "$",
            },
            {
              label: "Asset Inventory Audit",
              desc: "Verify all asset statuses and values",
              trigger: "manual",
              icon: "#",
            },
            {
              label: "Certificate Renewal Check",
              desc: "Check TLS certificate expiration dates",
              trigger: "schedule",
              icon: "*",
            },
            {
              label: "Compliance Report Export",
              desc: "Generate full BOD compliance report",
              trigger: "manual",
              icon: "/",
            },
          ].map((op) => (
            <div
              key={op.label}
              className="flex items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-900/50 p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-lg font-mono text-cyan-400">
                {op.icon}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{op.label}</p>
                <p className="text-xs text-neutral-500">{op.desc}</p>
              </div>
              <span className="rounded bg-neutral-700 px-2 py-0.5 text-[10px] uppercase text-neutral-500">
                {op.trigger}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Notification History */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Notification History
        </h2>
        <div className="space-y-2">
          {NOTIFICATIONS.map((notif) => (
            <div
              key={notif.id}
              className="flex items-start gap-3 rounded-lg border border-neutral-700/50 bg-neutral-900/30 p-3"
            >
              <StatusBadge status={notif.severity} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-neutral-700 px-2 py-0.5 text-[10px] uppercase text-neutral-500">
                    {notif.type}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {timeAgo(notif.timestamp)}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-white">
                  {notif.title}
                </p>
                <p className="mt-0.5 text-xs text-neutral-400">
                  {notif.message}
                </p>
              </div>
              <div className="shrink-0">
                {notif.read ? (
                  <span className="text-xs text-neutral-600">Read</span>
                ) : (
                  <span className="rounded-full bg-cyan-400 px-2 py-0.5 text-[10px] font-medium text-black">
                    New
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
