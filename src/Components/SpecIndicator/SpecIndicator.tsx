interface SpecIndicatorProps {
  outOfSpec: boolean;
  hasResults: boolean;
}

export default function SpecIndicator({ outOfSpec, hasResults }: SpecIndicatorProps) {
  const dotColor = !hasResults ? "bg-gray-400" : outOfSpec ? "bg-red-600" : "bg-green-800";
  const label = !hasResults ? "No results yet" : outOfSpec ? "Out of Spec" : "Currently in spec";
  return (
    <div className="flex items-center gap-2">
      <div>
        <div className={`h-5 w-5 rounded-full ${dotColor}`} />
      </div>
      <div className="flex items-center gap-2">
        <p className="text-base">{label}</p>
        {outOfSpec && <p className="text-red-600 font-bold">Needs attention!</p>}
      </div>
    </div>
  );
}
