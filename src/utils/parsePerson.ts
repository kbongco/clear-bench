import type { Role } from "../store/useCurrentUserStore";

export default function parsePersonValue(value: string): { role: Role; id: number } | null {
  const [role, idText] = value.split(":");
  const id = Number(idText);

  if (role !== "scientist" && role !== "labtech") return null;
  if (!Number.isInteger(id) || id < 1) return null;

  return { role, id };
}
