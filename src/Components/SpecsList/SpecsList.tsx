import type { ProductSpec } from "../../types/Specs/specs";
import formatLimit from "../../utils/formatLimit";

type SpecsListProps = {
  items: ProductSpec[];
};

export default function SpecsList({ items }: SpecsListProps) {
  return (
    <ul className="divide-y divide-gray-100">
      {items.map((spec: any) => (
        <li key={spec.id} className="flex items-baseline justify-between gap-4 py-2">
          <div>
            <p className="font-medium">{spec.parameter_name}</p>
            <p className="text-sm text-gray-500">{spec.test_type}</p>
          </div>
          <span className="text-right">{formatLimit(spec)}</span>
        </li>
      ))}
    </ul>
  );
}
