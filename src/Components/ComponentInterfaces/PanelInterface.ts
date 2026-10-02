import type { ReactNode } from "react";

export interface PanelInterface {
  title: string;
  children: ReactNode;
  className?: string;
}