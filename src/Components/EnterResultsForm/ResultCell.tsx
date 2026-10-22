import type { ProductSpec } from "../../types/Specs/specs";

type ResultCellProps = {
  spec: ProductSpec | undefined;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const choiceClass = (selected: boolean, colour: "green" | "red") =>
  `rounded border px-3 py-1 ${
    selected
      ? colour === "green"
        ? "border-green-600 bg-green-600 text-white"
        : "border-red-600 bg-red-600 text-white"
      : "border-gray-300"
  }`;

export default function ResultCell({ spec, label, value, onChange }: ResultCellProps) {
  if (spec?.kind === "pass_fail") {
    return (
      <div role="group" aria-label={label} className="flex gap-2">
        <button
          type="button"
          aria-pressed={value === "pass"}
          className={choiceClass(value === "pass", "green")}
          onClick={() => onChange("pass")}
        >
          Pass
        </button>
        <button
          type="button"
          aria-pressed={value === "fail"}
          className={choiceClass(value === "fail", "red")}
          onClick={() => onChange("fail")}
        >
          Fail
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        step="any"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-24 rounded border border-gray-300 px-2 py-1"
      />
      {spec?.unit && <span className="text-sm text-gray-500">{spec.unit}</span>}
    </div>
  );
}
