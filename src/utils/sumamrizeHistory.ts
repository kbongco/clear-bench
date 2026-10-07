// src/utils/summarizeHistory.ts
import type { AuditEvent } from "../types/Results/results";

export type HistorySummary = {
  submitted: AuditEvent | null;
  approved: AuditEvent | null;
  lastUpdate: AuditEvent | null;
};

export function summarizeHistory(events: AuditEvent[]): HistorySummary {
  const submitted = events.find((event) => event.action === "submitted");
  const approved = events.find((event) => event.action === "approved");
  const lastUpdate = events[0];

  return {
    submitted: submitted ?? null,
    approved: approved ?? null,
    lastUpdate: lastUpdate ?? null,
  };
}