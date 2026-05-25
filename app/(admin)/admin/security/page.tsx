import { StatCard } from "components/platform/stat-card";
import { StatusBadge } from "components/platform/status-badge";
import {
  SECURITY_SCANS,
  KEV_SAMPLE,
  COMPLIANCE_STATUSES,
  AUDIT_LOG,
} from "lib/platform/data";
import { formatDate, timeAgo } from "lib/platform/utils";

export const metadata = { title: "Security — NEXUS Platform" };

export default function SecurityPage() {
  const totalVulns = SECURITY_SCANS.reduce(
    (sum, s) => sum + s.vulnerabilitiesFound,
    0,
  );
  const criticalVulns = SECURITY_SCANS.reduce(
    (sum, s) => sum + s.criticalCount,
    0,
  );
  const completedScans = SECURITY_SCANS.filter((s) => s.status === "completed");
  const runningScans = SECURITY_SCANS.filter((s) => s.status === "scanning");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Security & Compliance</h1>
        <p className="text-sm text-neutral-400">
          DHS BOD compliance, KEV vulnerability management, and audit logging
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total Vulnerabilities"
          value={totalVulns}
          sub={`${criticalVulns} critical`}
          color="text-red-400"
        />
        <StatCard
          label="Scans Completed"
          value={completedScans.length}
          sub={`${runningScans.length} in progress`}
          color="text-blue-400"
        />
        <StatCard
          label="Compliance Directives"
          value={COMPLIANCE_STATUSES.length}
          sub={`${COMPLIANCE_STATUSES.filter((c) => c.status === "compliant").length} compliant`}
          color="text-green-400"
        />
        <StatCard
          label="KEV Catalog"
          value={`${KEV_SAMPLE.length}+`}
          sub="Known exploited vulnerabilities tracked"
          color="text-amber-400"
        />
      </div>

      {/* Security Scans */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Repository Security Scans
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-700 text-xs uppercase text-neutral-500">
                <th className="pb-2 pr-4">Repository</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2 pr-4">Critical</th>
                <th className="pb-2 pr-4">High</th>
                <th className="pb-2 pr-4">Medium</th>
                <th className="pb-2 pr-4">Low</th>
                <th className="pb-2 pr-4">Total</th>
                <th className="pb-2">Completed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {SECURITY_SCANS.map((scan) => (
                <tr key={scan.id} className="text-neutral-300">
                  <td className="py-2.5 pr-4 font-medium text-white">
                    {scan.repoName}
                  </td>
                  <td className="py-2.5 pr-4">
                    <StatusBadge status={scan.status} />
                  </td>
                  <td
                    className={`py-2.5 pr-4 font-medium ${scan.criticalCount > 0 ? "text-red-400" : "text-neutral-500"}`}
                  >
                    {scan.criticalCount}
                  </td>
                  <td
                    className={`py-2.5 pr-4 ${scan.highCount > 0 ? "text-orange-400" : "text-neutral-500"}`}
                  >
                    {scan.highCount}
                  </td>
                  <td
                    className={`py-2.5 pr-4 ${scan.mediumCount > 0 ? "text-yellow-400" : "text-neutral-500"}`}
                  >
                    {scan.mediumCount}
                  </td>
                  <td className="py-2.5 pr-4 text-neutral-500">
                    {scan.lowCount}
                  </td>
                  <td className="py-2.5 pr-4 font-medium text-white">
                    {scan.vulnerabilitiesFound}
                  </td>
                  <td className="py-2.5 text-xs text-neutral-500">
                    {scan.completedAt
                      ? timeAgo(scan.completedAt)
                      : "Running..."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* KEV Catalog */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          CISA Known Exploited Vulnerabilities (KEV)
        </h2>
        <div className="space-y-3">
          {KEV_SAMPLE.map((vuln) => (
            <div
              key={vuln.cveID}
              className="rounded-lg border border-neutral-700 bg-neutral-900/50 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-red-400/10 px-2 py-0.5 text-xs font-mono font-medium text-red-400">
                      {vuln.cveID}
                    </span>
                    {vuln.cwes.map((cwe) => (
                      <span
                        key={cwe}
                        className="rounded bg-neutral-700 px-2 py-0.5 text-xs text-neutral-400"
                      >
                        {cwe}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-medium text-white">
                    {vuln.vulnerabilityName}
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">
                    {vuln.shortDescription}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {vuln.vendorProject} — {vuln.product}
                  </p>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-xs text-neutral-500">
                    Due: {formatDate(vuln.dueDate)}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Ransomware: {vuln.knownRansomwareCampaignUse}
                  </p>
                </div>
              </div>
              <div className="mt-2 rounded bg-neutral-800 p-2 text-xs text-neutral-400">
                <strong>Required Action:</strong> {vuln.requiredAction}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Dashboard */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Compliance Status (DHS Binding Operational Directives)
        </h2>
        <div className="space-y-4">
          {COMPLIANCE_STATUSES.map((comp) => (
            <div
              key={comp.directive}
              className="rounded-lg border border-neutral-700 bg-neutral-900/50 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-blue-400/10 px-2 py-0.5 text-xs font-medium text-blue-400">
                      {comp.directive}
                    </span>
                    <p className="text-sm font-medium text-white">
                      {comp.title}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    Last assessed: {formatDate(comp.lastAssessed)}
                    {comp.dueDate ? ` — Due: ${formatDate(comp.dueDate)}` : ""}
                  </p>
                </div>
                <StatusBadge status={comp.status} />
              </div>
              <div className="mt-3 space-y-2">
                {comp.requirements.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-start gap-2 rounded bg-neutral-800/50 p-2"
                  >
                    <StatusBadge status={req.status} />
                    <div className="flex-1">
                      <p className="text-xs text-neutral-300">
                        {req.description}
                      </p>
                      {req.evidence ? (
                        <p className="mt-0.5 text-[10px] text-neutral-500">
                          Evidence: {req.evidence}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audit Log */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Audit Log
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-700 text-xs uppercase text-neutral-500">
                <th className="pb-2 pr-4">Time</th>
                <th className="pb-2 pr-4">User</th>
                <th className="pb-2 pr-4">Action</th>
                <th className="pb-2 pr-4">Resource</th>
                <th className="pb-2 pr-4">Category</th>
                <th className="pb-2">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {AUDIT_LOG.map((entry) => (
                <tr key={entry.id} className="text-neutral-300">
                  <td className="py-2 pr-4 text-xs text-neutral-500">
                    {timeAgo(entry.timestamp)}
                  </td>
                  <td className="py-2 pr-4 text-xs">{entry.userName}</td>
                  <td className="py-2 pr-4">
                    <span className="font-mono text-xs text-cyan-400">
                      {entry.action}
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-xs text-white">
                    {entry.resource}
                  </td>
                  <td className="py-2 pr-4">
                    <span className="rounded bg-neutral-700 px-2 py-0.5 text-xs capitalize">
                      {entry.category}
                    </span>
                  </td>
                  <td className="py-2 text-xs text-neutral-400">
                    {entry.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* RBAC Info */}
      <section className="rounded-xl border border-neutral-700 bg-neutral-800/40 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
          Role-Based Access Control
        </h2>
        <div className="grid gap-3 md:grid-cols-4">
          {(["admin", "developer", "viewer", "auditor"] as const).map(
            (role) => {
              const permissions: Record<string, string[]> = {
                admin: [
                  "Full platform access",
                  "Deploy to production",
                  "Manage users & roles",
                  "Treasury operations",
                  "Security configuration",
                ],
                developer: [
                  "View all repositories",
                  "Deploy to staging",
                  "View treasury (read-only)",
                  "Run security scans",
                  "Manage own assets",
                ],
                viewer: [
                  "View dashboards",
                  "View deployment status",
                  "View revenue reports",
                  "View asset inventory",
                ],
                auditor: [
                  "View audit logs",
                  "View compliance reports",
                  "View security scans",
                  "Export reports",
                  "View financial records",
                ],
              };
              return (
                <div
                  key={role}
                  className="rounded-lg border border-neutral-700 bg-neutral-900/50 p-3"
                >
                  <p className="text-sm font-medium capitalize text-white">
                    {role}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {permissions[role]!.map((perm) => (
                      <li key={perm} className="text-xs text-neutral-400">
                        {perm}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            },
          )}
        </div>
      </section>
    </div>
  );
}
