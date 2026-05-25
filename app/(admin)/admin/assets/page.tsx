import { StatCard } from "components/platform/stat-card";
import { StatusBadge } from "components/platform/status-badge";
import { ASSETS, ASSET_CLAIMS, REPOSITORIES } from "lib/platform/data";
import { timeAgo } from "lib/platform/utils";

export const metadata = { title: "Assets — NEXUS Platform" };

export default function AssetsPage() {
  const activeAssets = ASSETS.filter((a) => a.status === "active");
  const totalMonthlyCost = ASSETS.reduce((sum, a) => {
    const match = a.value.match(/\$([\d,]+)/);
    if (match) {
      const val = parseInt(match[1]!.replace(/,/g, ""), 10);
      if (a.value.includes("/mo")) return sum + val;
      if (a.value.includes("/yr")) return sum + Math.round(val / 12);
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Asset Management</h1>
        <p className="text-sm text-neutral-400">
          Unified inventory of digital assets, infrastructure, and financial
          claims
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total Assets"
          value={ASSETS.length}
          sub={`${activeAssets.length} active`}
          color="text-purple-400"
        />
        <StatCard
          label="Monthly Cost"
          value={`$${totalMonthlyCost.toLocaleString()}`}
          sub="Infrastructure spend"
          color="text-cyan-400"
        />
        <StatCard
          label="Repositories"
          value={REPOSITORIES.length}
          sub="Code assets managed"
          color="text-blue-400"
        />
        <StatCard
          label="Pending Claims"
          value={ASSET_CLAIMS.length}
          sub="Recovery in progress"
          color="text-amber-400"
        />
      </div>

      {/* Asset Inventory */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Infrastructure Assets
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-700 text-xs uppercase text-neutral-500">
                <th className="pb-2 pr-4">Asset</th>
                <th className="pb-2 pr-4">Type</th>
                <th className="pb-2 pr-4">Value</th>
                <th className="pb-2 pr-4">Owner</th>
                <th className="pb-2 pr-4">Access</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {ASSETS.map((asset) => (
                <tr key={asset.id} className="text-neutral-300">
                  <td className="py-2.5 pr-4">
                    <p className="font-medium text-white">{asset.name}</p>
                    <p className="text-xs text-neutral-500">
                      {asset.description}
                    </p>
                  </td>
                  <td className="py-2.5 pr-4">
                    <span className="rounded bg-neutral-700 px-2 py-0.5 text-xs capitalize">
                      {asset.type.replace(/-/g, " ")}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 font-mono text-sm text-white">
                    {asset.value}
                  </td>
                  <td className="py-2.5 pr-4 text-xs text-neutral-400">
                    {asset.owner}
                  </td>
                  <td className="py-2.5 pr-4">
                    <span
                      className={`rounded px-2 py-0.5 text-xs capitalize ${
                        asset.accessLevel === "admin"
                          ? "bg-red-400/10 text-red-400"
                          : asset.accessLevel === "developer"
                            ? "bg-blue-400/10 text-blue-400"
                            : "bg-gray-400/10 text-gray-400"
                      }`}
                    >
                      {asset.accessLevel}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <StatusBadge status={asset.status} />
                  </td>
                  <td className="py-2.5 text-xs text-neutral-500">
                    {timeAgo(asset.lastUpdated)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Repository Assets */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Repository Assets ({REPOSITORIES.length})
        </h2>
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {REPOSITORIES.map((repo) => (
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
                <p className="truncate text-xs text-neutral-500">
                  {repo.description}
                </p>
              </div>
              <div className="ml-2 shrink-0">
                <StatusBadge status={repo.status} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Asset Claims & Recovery */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Asset Claims & Recovery Tracking
        </h2>
        <div className="space-y-3">
          {ASSET_CLAIMS.map((claim) => (
            <div
              key={claim.id}
              className="flex items-center justify-between rounded-lg border border-neutral-700 bg-neutral-900/50 p-4"
            >
              <div>
                <p className="text-sm font-medium text-white">{claim.label}</p>
                <p className="text-xs text-neutral-500">
                  Last updated {timeAgo(claim.lastUpdated)}
                  {claim.filingId ? ` — Filing: ${claim.filingId}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-medium text-amber-400">
                  {claim.amount}
                </span>
                <StatusBadge status={claim.status} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Asset Metadata */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Asset Metadata
        </h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {ASSETS.filter((a) => Object.keys(a.metadata).length > 0).map(
            (asset) => (
              <div
                key={asset.id}
                className="rounded-lg border border-neutral-700 bg-neutral-900/50 p-3"
              >
                <p className="text-sm font-medium text-white">{asset.name}</p>
                <div className="mt-2 space-y-1">
                  {Object.entries(asset.metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="capitalize text-neutral-500">{key}</span>
                      <span className="text-neutral-300">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
