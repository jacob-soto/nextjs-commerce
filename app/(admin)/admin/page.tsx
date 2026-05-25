import { StatCard } from "components/platform/stat-card";
import { StatusBadge } from "components/platform/status-badge";
import {
  PLATFORM_OVERVIEW,
  REPOSITORIES,
  CLUSTERS,
  NOTIFICATIONS,
  DEPLOYMENT_EVENTS,
} from "lib/platform/data";
import { formatCurrency, timeAgo } from "lib/platform/utils";
import Link from "next/link";

export const metadata = { title: "Dashboard — NEXUS Platform" };

export default function AdminDashboardPage() {
  const overview = PLATFORM_OVERVIEW;
  const recentRepos = REPOSITORIES.filter((r) => r.lastDeployed)
    .sort(
      (a, b) =>
        new Date(b.lastDeployed!).getTime() -
        new Date(a.lastDeployed!).getTime(),
    )
    .slice(0, 5);
  const unreadNotifs = NOTIFICATIONS.filter((n) => !n.read);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Platform Overview</h1>
        <p className="text-sm text-neutral-400">
          Unified view of repositories, deployments, revenue, assets, and
          security
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          label="Repositories"
          value={overview.repositories.total}
          sub={`${overview.repositories.active} active`}
          color="text-cyan-400"
        />
        <StatCard
          label="Deployments"
          value={overview.deployments.healthy}
          sub={`${overview.deployments.degraded} degraded`}
          color="text-green-400"
        />
        <StatCard
          label="Monthly Revenue"
          value={formatCurrency(overview.revenue.monthly)}
          sub={`${formatCurrency(overview.revenue.pending)} pending`}
          color="text-emerald-400"
        />
        <StatCard
          label="Assets"
          value={overview.assets.total}
          sub={`${overview.assets.pendingClaims} claims pending`}
          color="text-purple-400"
        />
        <StatCard
          label="Vulnerabilities"
          value={overview.security.vulnerabilities}
          sub={`${overview.security.critical} critical`}
          color="text-red-400"
        />
        <StatCard
          label="Workflows"
          value={overview.automation.activeWorkflows}
          sub={`${overview.automation.completedToday} completed today`}
          color="text-amber-400"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cluster Health */}
        <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Cluster Health
            </h2>
            <Link
              href="/admin/deployments"
              className="text-xs text-cyan-400 hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {CLUSTERS.map((cluster) => (
              <div
                key={cluster.id}
                className="flex items-center justify-between rounded-lg border border-neutral-700 bg-neutral-900/50 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {cluster.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {cluster.provider.toUpperCase()} &middot; {cluster.region}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-neutral-400">
                      CPU {cluster.cpuUtilization}% &middot; MEM{" "}
                      {cluster.memoryUtilization}%
                    </p>
                    <p className="text-xs text-neutral-500">
                      {cluster.podsRunning}/{cluster.podsDesired} pods
                    </p>
                  </div>
                  <StatusBadge status={cluster.status} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Notifications
              {unreadNotifs.length > 0 && (
                <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {unreadNotifs.length}
                </span>
              )}
            </h2>
          </div>
          <div className="space-y-2">
            {NOTIFICATIONS.map((notif) => (
              <div
                key={notif.id}
                className={`rounded-lg border p-3 ${
                  notif.read
                    ? "border-neutral-700/50 bg-neutral-900/30"
                    : "border-neutral-600 bg-neutral-800/60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={notif.severity} />
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
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Recent Deployments */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
            Recent Deployments
          </h2>
          <Link
            href="/admin/deployments"
            className="text-xs text-cyan-400 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-700 text-xs uppercase text-neutral-500">
                <th className="pb-2 pr-4">Repository</th>
                <th className="pb-2 pr-4">Target</th>
                <th className="pb-2 pr-4">Environment</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Last Deployed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {recentRepos.map((repo) => (
                <tr key={repo.id} className="text-neutral-300">
                  <td className="py-2.5 pr-4">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-white hover:text-cyan-400"
                    >
                      {repo.name}
                    </a>
                    <p className="text-xs text-neutral-500">{repo.language}</p>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span className="rounded bg-neutral-700 px-2 py-0.5 text-xs font-mono">
                      {repo.deploymentTarget}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 capitalize">{repo.environment}</td>
                  <td className="py-2.5 pr-4">
                    <StatusBadge status={repo.status} />
                  </td>
                  <td className="py-2.5 text-xs text-neutral-400">
                    {repo.lastDeployed ? timeAgo(repo.lastDeployed) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Deployment Events */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Deployment Activity
        </h2>
        <div className="space-y-2">
          {DEPLOYMENT_EVENTS.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 rounded-lg border border-neutral-700/50 bg-neutral-900/30 p-3"
            >
              <StatusBadge status={event.type} />
              <div className="flex-1">
                <p className="text-sm text-neutral-300">{event.message}</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {timeAgo(event.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
