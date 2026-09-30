import type { ReactNode } from "react";

export interface DetailItem {
  label: string;
  value: ReactNode;
}

export interface DetailListProps {
  list: DetailItem[];
}