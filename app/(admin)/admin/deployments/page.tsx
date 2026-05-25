import { StatCard } from "components/platform/stat-card";
import { StatusBadge } from "components/platform/status-badge";
import {
  REPOSITORIES,
  CLUSTERS,
  DEPLOYMENTS,
  DEPLOYMENT_EVENTS,
} from "lib/platform/data";
import { timeAgo } from "lib/platform/utils";

export const metadata = { title: "Deployments — NEXUS Platform" };

export default function DeploymentsPage() {
  const deployableRepos = REPOSITORIES.filter(
    (r) => r.deploymentTarget !== "none",
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Deployment Orchestration
        </h1>
        <p className="text-sm text-neutral-400">
          Multi-cloud deployment management across AWS ECS and Kubernetes
          clusters
        </p>
      </div>

      {/* Cluster Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CLUSTERS.map((cluster) => (
          <div
            key={cluster.id}
            className="rounded-xl border border-neutral-700 bg-neutral-800/60 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                {cluster.name}
              </p>
              <StatusBadge status={cluster.status} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <p className="text-lg font-bold text-white">
                  {cluster.nodesReady}/{cluster.nodesTotal}
                </p>
                <p className="text-[10px] text-neutral-500">Nodes Ready</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white">
                  {cluster.podsRunning}/{cluster.podsDesired}
                </p>
                <p className="text-[10px] text-neutral-500">Pods Running</p>
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              <div>
                <div className="flex justify-between text-[10px] text-neutral-400">
                  <span>CPU</span>
                  <span>{cluster.cpuUtilization}%</span>
                </div>
                <div className="mt-0.5 h-1.5 w-full rounded-full bg-neutral-700">
                  <div
                    className={`h-1.5 rounded-full ${
                      cluster.cpuUtilization > 80
                        ? "bg-red-400"
                        : cluster.cpuUtilization > 60
                          ? "bg-yellow-400"
                          : "bg-green-400"
                    }`}
                    style={{ width: `${cluster.cpuUtilization}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-neutral-400">
                  <span>Memory</span>
                  <span>{cluster.memoryUtilization}%</span>
                </div>
                <div className="mt-0.5 h-1.5 w-full rounded-full bg-neutral-700">
                  <div
                    className={`h-1.5 rounded-full ${
                      cluster.memoryUtilization > 80
                        ? "bg-red-400"
                        : cluster.memoryUtilization > 60
                          ? "bg-yellow-400"
                          : "bg-cyan-400"
                    }`}
                    style={{ width: `${cluster.memoryUtilization}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="mt-2 text-[10px] text-neutral-500">
              {cluster.provider.toUpperCase()} &middot; {cluster.region}
            </p>
          </div>
        ))}
      </div>

      {/* Active Deployments */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Active Deployment Configurations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-700 text-xs uppercase text-neutral-500">
                <th className="pb-2 pr-4">Service</th>
                <th className="pb-2 pr-4">Target</th>
                <th className="pb-2 pr-4">Environment</th>
                <th className="pb-2 pr-4">Strategy</th>
                <th className="pb-2 pr-4">Cluster</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Last Deploy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {DEPLOYMENTS.map((dep) => {
                const repo = REPOSITORIES.find((r) => r.id === dep.repoId);
                return (
                  <tr key={dep.id} className="text-neutral-300">
                    <td className="py-2.5 pr-4">
                      <p className="font-medium text-white">{dep.service}</p>
                      <p className="text-xs text-neutral-500">{repo?.name}</p>
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className="rounded bg-neutral-700 px-2 py-0.5 text-xs font-mono">
                        {dep.target}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 capitalize">
                      {dep.environment}
                    </td>
                    <td className="py-2.5 pr-4 capitalize">{dep.strategy}</td>
                    <td className="py-2.5 pr-4 text-xs">{dep.cluster}</td>
                    <td className="py-2.5 pr-4">
                      <StatusBadge status={dep.status} />
                    </td>
                    <td className="py-2.5 text-xs text-neutral-400">
                      {dep.lastDeployedAt ? timeAgo(dep.lastDeployedAt) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Repository Deployment Grid */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          All Deployable Repositories ({deployableRepos.length})
        </h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {deployableRepos.map((repo) => (
            <div
              key={repo.id}
              className="flex items-center justify-between rounded-lg border border-neutral-700 bg-neutral-900/50 p-3"
            >
              <div className="min-w-0 flex-1">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-sm font-medium text-white hover:text-cyan-400"
                >
                  {repo.name}
                </a>
                <p className="text-xs text-neutral-500">
                  {repo.deploymentTarget} &middot; {repo.environment}
                </p>
              </div>
              <div className="ml-3 flex items-center gap-2">
                <StatusBadge status={repo.status} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deployment Events Timeline */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Deployment Events
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
