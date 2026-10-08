export function formatDateTime(iso: string, timeZone?: string): string {
  const date = new Date(iso);

  if (isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone,
  }).format(date);
}
