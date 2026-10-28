import type { JSX, ReactNode } from "react";

export type TableRow = Record<string, ReactNode>;

export interface TableHeader {
  header: string[];
}

export interface TableBody {
  body: string[];
  tableHeader: TableHeader;
}

export interface Table {
  tableTitle: string;
  data: TableRow[];
  tableHeader: string[];
  tableBody: TableBody;
  renderRow: (row: TableRow, rowIndex: number) => JSX.Element;
}
