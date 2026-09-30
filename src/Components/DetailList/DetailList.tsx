import type { DetailListProps } from "../ComponentInterfaces/DetailLIstInterface";

export default function DetailList({ list }: DetailListProps) {
  return (
    <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((list) => (
          <div key={list.label}>
            <dt className='text-sm text-gray-600'>{list.label}</dt>
            <dd className='font-medium text-gray-900'>{list.value}</dd>
          </div>
        ))}
    </dl>
  );
}
