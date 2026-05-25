"use client";

import { statusColor, statusBgColor } from "lib/platform/utils";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusColor(status)} ${statusBgColor(status)}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
