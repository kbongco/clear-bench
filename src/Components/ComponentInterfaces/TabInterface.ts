import type { ReactElement } from "react";

export interface TabButtonInterface {
  title: string;
  setSelectedTab: (index: number) => void;
  isActive?: boolean;
  index: number;
}

export interface TabLayoutInterface {
  title: string;
  children: ReactElement |  ReactElement | any
}