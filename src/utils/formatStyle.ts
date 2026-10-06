import type { SampleStatus } from "../Components/ComponentInterfaces/PillInterface";

export const statusStyles: Record<SampleStatus, string> = {
  pending: "bg-gray-100 text-gray-700",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};
