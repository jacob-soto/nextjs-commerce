"use client";

export function StatCard({
  label,
  value,
  sub,
  color = "text-cyan-400",
}: {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-700 bg-neutral-800/60 p-5 backdrop-blur">
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
        {label}
      </p>
      <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
      {sub ? <p className="mt-1 text-xs text-neutral-500">{sub}</p> : null}
    </div>
  );
}
