import { StatCard } from "components/platform/stat-card";
import { StatusBadge } from "components/platform/status-badge";
import {
  TREASURY,
  REVENUE_METRICS,
  PAYMENT_CONFIGS,
  FUND_ALLOCATIONS,
  GRANT_VERIFICATIONS,
} from "lib/platform/data";
import {
  formatCurrency,
  formatCurrencyPrecise,
  formatDateTime,
  timeAgo,
} from "lib/platform/utils";

export const metadata = { title: "Revenue — NEXUS Platform" };

export default function RevenuePage() {
  const metrics = REVENUE_METRICS;
  const treasury = TREASURY;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Revenue Management</h1>
        <p className="text-sm text-neutral-400">
          Integrated PayPal processing, treasury management, and revenue
          tracking
        </p>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total Revenue"
          value={formatCurrency(metrics.totalRevenue)}
          sub="All time"
          color="text-emerald-400"
        />
        <StatCard
          label="Monthly Revenue"
          value={formatCurrency(metrics.monthlyRevenue)}
          sub="May 2025"
          color="text-green-400"
        />
        <StatCard
          label="Pending Payments"
          value={formatCurrency(metrics.pendingPayments)}
          sub="Awaiting settlement"
          color="text-yellow-400"
        />
        <StatCard
          label="Treasury Balance"
          value={formatCurrencyPrecise(treasury.balance)}
          sub="Current balance"
          color="text-cyan-400"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue by Source */}
        <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
            Revenue by Source
          </h2>
          <div className="space-y-3">
            {(Object.entries(metrics.revenueBySource) as [string, number][])
              .filter(([, amount]) => amount > 0)
              .sort(([, a], [, b]) => b - a)
              .map(([source, amount]) => {
                const pct = Math.round((amount / metrics.totalRevenue) * 100);
                return (
                  <div key={source}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize text-neutral-300">
                        {source.replace(/-/g, " ")}
                      </span>
                      <span className="font-medium text-white">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-neutral-700">
                        <div
                          className="h-2 rounded-full bg-emerald-400"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-neutral-500">{pct}%</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* Monthly Trend */}
        <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
            Monthly Trend
          </h2>
          <div className="space-y-3">
            {metrics.monthlyTrend.map((point) => {
              const net = point.revenue - point.expenses;
              const maxRevenue = Math.max(
                ...metrics.monthlyTrend.map((p) => p.revenue),
              );
              const pct = Math.round((point.revenue / maxRevenue) * 100);
              return (
                <div key={point.month}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-400">{point.month}</span>
                    <div className="flex gap-4">
                      <span className="text-green-400">
                        {formatCurrency(point.revenue)}
                      </span>
                      <span className="text-red-400">
                        -{formatCurrency(point.expenses)}
                      </span>
                      <span className="font-medium text-white">
                        {formatCurrency(net)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-neutral-700">
                    <div
                      className="h-2 rounded-full bg-cyan-400"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Payment Configurations */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Payment Providers
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {PAYMENT_CONFIGS.map((config) => (
            <div
              key={config.provider}
              className="flex items-center justify-between rounded-lg border border-neutral-700 bg-neutral-900/50 p-4"
            >
              <div>
                <p className="text-sm font-medium capitalize text-white">
                  {config.provider}
                </p>
                <p className="text-xs text-neutral-500">
                  Mode: {config.mode} &middot; ID: {config.clientId}
                </p>
              </div>
              <StatusBadge status={config.configured ? "active" : "inactive"} />
            </div>
          ))}
        </div>
      </section>

      {/* Treasury Transactions */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Treasury Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-700 text-xs uppercase text-neutral-500">
                <th className="pb-2 pr-4">ID</th>
                <th className="pb-2 pr-4">Description</th>
                <th className="pb-2 pr-4">Source</th>
                <th className="pb-2 pr-4">Amount</th>
                <th className="pb-2 pr-4">Balance</th>
                <th className="pb-2">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {treasury.transactions.map((tx) => (
                <tr key={tx.id} className="text-neutral-300">
                  <td className="py-2 pr-4 font-mono text-xs text-neutral-500">
                    {tx.id}
                  </td>
                  <td className="py-2 pr-4 text-white">{tx.description}</td>
                  <td className="py-2 pr-4">
                    <span className="rounded bg-neutral-700 px-2 py-0.5 text-xs capitalize">
                      {tx.source.replace(/-/g, " ")}
                    </span>
                  </td>
                  <td
                    className={`py-2 pr-4 font-medium ${tx.amount >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {tx.amount >= 0 ? "+" : ""}
                    {formatCurrencyPrecise(tx.amount)}
                  </td>
                  <td className="py-2 pr-4 text-neutral-400">
                    {formatCurrencyPrecise(tx.balance)}
                  </td>
                  <td className="py-2 text-xs text-neutral-500">
                    {timeAgo(tx.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Fund Allocations */}
        <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
            Fund Allocations
          </h2>
          <div className="space-y-2">
            {FUND_ALLOCATIONS.map((alloc) => (
              <div
                key={alloc.id}
                className="flex items-center justify-between rounded-lg border border-neutral-700 bg-neutral-900/50 p-3"
              >
                <div>
                  <p className="text-sm text-white">{alloc.reason}</p>
                  <p className="text-xs text-neutral-500">
                    Requested {timeAgo(alloc.requestedAt)}
                    {alloc.approvedBy
                      ? ` — Approved by ${alloc.approvedBy}`
                      : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-white">
                    {formatCurrency(alloc.amount)}
                  </span>
                  <StatusBadge status={alloc.status} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Grant Verifications */}
        <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
            Grant Verifications
          </h2>
          <div className="space-y-2">
            {GRANT_VERIFICATIONS.map((grant) => (
              <div
                key={grant.id}
                className="flex items-center justify-between rounded-lg border border-neutral-700 bg-neutral-900/50 p-3"
              >
                <div>
                  <p className="text-sm text-white">{grant.grantName}</p>
                  <p className="text-xs text-neutral-500">
                    Source: {grant.source}
                    {grant.verifiedAt
                      ? ` — Verified ${timeAgo(grant.verifiedAt)}`
                      : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-white">
                    {formatCurrency(grant.amount)}
                  </span>
                  <StatusBadge status={grant.status} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
