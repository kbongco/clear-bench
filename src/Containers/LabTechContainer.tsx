import { useEffect, useState } from "react";
import ApproveSamples from "../Views/ApproveSamples";
import { approveSample, getAllSamples } from "../services/samples";
import type { SampleWithOwner } from "../types/Samples/sample";
import { CURRENT_LAB_TECH_ID } from "../services/currentUser";

export default function LabTechContainer() {
  const [pendingSamples, setPendingSamples] = useState<SampleWithOwner[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function handleApprove(id: number) {
    await approveSample(id, CURRENT_LAB_TECH_ID);
    setPendingSamples((prev) => prev.filter((s) => s.id !== id));
  }

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await getAllSamples({ status: "pending" });
        if (!ignore) setPendingSamples(data.samples);
      } catch (err) {
        console.error(err);
        if (!ignore) setError("Couldn't load pending samples. Please try refreshing");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p>Current Samples loading</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>
      <ApproveSamples samples={pendingSamples} onApprove={handleApprove} onReject={() => {}} />
    </>
  );
}
