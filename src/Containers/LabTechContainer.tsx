import { useEffect, useState } from "react";
import ApproveSamples from "../Views/ApproveSamples";
import { getAllSamples } from "../services/samples";
import type { SampleWithOwner } from "../types/Samples/sample";

export default function LabTechContainer() {
  const [pendingSamples, setPendingSamples] = useState<SampleWithOwner[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await getAllSamples({ status: "pending" });
        if (!ignore) setPendingSamples(data?.samples); // the response is { total, samples }
      } catch (err) {
        if (!ignore) setError("____");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <ApproveSamples data={pendingSamples} />
    </>
  );
}
