import type { ReactNode } from "react";
import type { DetailListProps } from "../ComponentInterfaces/DetailListInterface";

export default function DetailList({ items }: DetailListProps) {
  const isEmpty = (value: ReactNode) =>
    value === null || value === undefined || value === "";
  return (
    <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-sm text-gray-600">{item.label}</dt>
          <dd className="font-medium text-gray-900">
            {isEmpty(item.value) ? "-" : item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
