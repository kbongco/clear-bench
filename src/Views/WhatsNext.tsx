import Panel from "../Components/Panel/Panel";
import { ROADMAP } from "../constants/roadmap";

export default function WhatsNext() {
  const next = ROADMAP.filter((item) => item.stage === "next");
  const later = "later";

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">What's next</h1>
      <p className="mt-2 text-gray-600">
        This version of Clear Bench is a working demo which demonstrates the basic features.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Panel title="Next">
          <ul className="divide-y divide-gray-100">
            {next.map((item) => (
              <li key={item.title} className="py-3">
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
