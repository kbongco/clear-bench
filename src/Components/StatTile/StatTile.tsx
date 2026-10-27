type StatTileProps = {
  label: string;
  value: number;
  highlight?: boolean;
};

export default function StatTile({ label, value, highlight = false }: StatTileProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className={`text-3xl font-semibold ${highlight ? "text-red-600" : "text-gray-900"}`}>
        {value}
      </p>
      <p className="mt-1 text-sm text-gray-600">{label}</p>
    </div>
  );
}
