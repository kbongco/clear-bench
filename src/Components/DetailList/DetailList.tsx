import type { DetailListProps } from "../ComponentInterfaces/DetailLIstInterface";

export default function DetailList({ list }: DetailListProps) {
  return (
    <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        {list.map((li) => (
          <>
            <dt>{li.label}</dt>
            <dd>{li.value}</dd>
          </>
        ))}

        {/* <dt>Owner</dt>
        <dd>Dr. Alice Nguyen</dd> */}
      </div>
    </dl>
  );
}
