import type { SampleWithOwner } from "../../types/Samples/sample";
import { byDueDate } from "../../utils/needsAttention";

type LabTechHome = {
  name: string;
  pending: SampleWithOwner[];
  loading: boolean;
  inTesting: SampleWithOwner[];
  error: string | null;
};

export default function LabTechHome({ name, pending, inTesting, loading, error }: LabTechHome) {
  const dueSoonest = [...inTesting].sort(byDueDate).slice(0, 5);
  console.log(dueSoonest);

  return (
    <>
      <div>
        <h1>Hello {name}</h1>
      </div>
      {/* <div className="ml-16">
        <h1 className="text-3xl">Welcome! {currentLabTech}</h1>
        <div className="mt-4 flex gap-4">
          <Card title="Overview" description={samplesAssigned} />
          <Card title="Notifications" description={notifications} />
        </div>
      </div> */}
    </>
  );
}
