import type { AuditEvent } from "../types/Results/results";
import { formatDateTime } from "./formatDateTime";

export function describeEvent(event: AuditEvent | null, timeZone?: string): string {
  if (!event) return "No information";
  return `${event.actor_name} · ${formatDateTime(event.created_at, timeZone)}`;
}
