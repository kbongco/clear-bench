import type { DetailListProps } from "../ComponentInterfaces/DetailLIstInterface";

export default function DetailList({ items }: DetailListProps) {
  return (
    <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.label}>
            <dt className='text-sm text-gray-600'>{item.label}</dt>
            <dd className='font-medium text-gray-900'>{item.value}</dd>
          </div>
        ))}
    </dl>
  );
}
