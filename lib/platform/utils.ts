export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyPrecise(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function statusColor(status: string): string {
  const colors: Record<string, string> = {
    healthy: "text-green-400",
    active: "text-green-400",
    compliant: "text-green-400",
    completed: "text-green-400",
    success: "text-green-400",
    met: "text-green-400",
    released: "text-green-400",
    verified: "text-green-400",
    deployed: "text-green-400",
    disbursed: "text-green-400",
    degraded: "text-yellow-400",
    warning: "text-yellow-400",
    partial: "text-yellow-400",
    pending: "text-yellow-400",
    "in-progress": "text-yellow-400",
    scanning: "text-blue-400",
    deploying: "text-blue-400",
    building: "text-blue-400",
    running: "text-blue-400",
    in_progress: "text-blue-400",
    critical: "text-red-400",
    error: "text-red-400",
    unhealthy: "text-red-400",
    failed: "text-red-400",
    "non-compliant": "text-red-400",
    blocked: "text-red-400",
    rejected: "text-red-400",
    under_investigation: "text-orange-400",
    inactive: "text-gray-400",
    unknown: "text-gray-400",
    idle: "text-gray-400",
    paused: "text-gray-400",
    archived: "text-gray-400",
  };
  return colors[status] ?? "text-gray-400";
}

export function statusBgColor(status: string): string {
  const colors: Record<string, string> = {
    healthy: "bg-green-400/10 border-green-400/30",
    active: "bg-green-400/10 border-green-400/30",
    success: "bg-green-400/10 border-green-400/30",
    compliant: "bg-green-400/10 border-green-400/30",
    degraded: "bg-yellow-400/10 border-yellow-400/30",
    warning: "bg-yellow-400/10 border-yellow-400/30",
    pending: "bg-yellow-400/10 border-yellow-400/30",
    critical: "bg-red-400/10 border-red-400/30",
    error: "bg-red-400/10 border-red-400/30",
    deploying: "bg-blue-400/10 border-blue-400/30",
    scanning: "bg-blue-400/10 border-blue-400/30",
    stabilizing: "bg-blue-400/10 border-blue-400/30",
    pushing: "bg-blue-400/10 border-blue-400/30",
  };
  return colors[status] ?? "bg-gray-400/10 border-gray-400/30";
}

export function providerLabel(
  provider: string,
): { label: string; color: string } {
  const providers: Record<string, { label: string; color: string }> = {
    "aws-ecs": { label: "AWS ECS", color: "text-orange-400" },
    "gcp-gke": { label: "GCP GKE", color: "text-blue-400" },
    "gcp-cloudrun": { label: "GCP Cloud Run", color: "text-blue-300" },
    kubernetes: { label: "Kubernetes", color: "text-cyan-400" },
    vercel: { label: "Vercel", color: "text-white" },
    static: { label: "Static", color: "text-neutral-400" },
    none: { label: "None", color: "text-neutral-500" },
  };
  return providers[provider] ?? { label: provider, color: "text-neutral-400" };
}
