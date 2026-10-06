export function formatStatus(status: string | null): string {
  if (!status) return "Unknown";
  const words = status?.replace(/[_-]/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}
