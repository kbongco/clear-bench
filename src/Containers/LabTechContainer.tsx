import { useEffect, useState } from "react";
import ApproveSamples from "../Views/ApproveSamples";
import { approveSample, getAllSamples, rejectSample } from "../services/samples";
import type { ApprovalFilter, SampleWithOwner } from "../types/Samples/sample";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function LabTechContainer() {
  const [pendingSamples, setPendingSamples] = useState<SampleWithOwner[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<ApprovalFilter>("pending");
  const { id: labTechId } = useCurrentUser();

  async function handleApprove(id: number) {
    const updated = await approveSample(id, labTechId);
    setPendingSamples((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  }

  async function handleReject(id: number, reason: string) {
    const updated = await rejectSample(id, labTechId, reason);
    setPendingSamples((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  }

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    async function load() {
      try {
        const data = await getAllSamples({ status: status });
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
  }, [status]);

  return (
    <ApproveSamples
      samples={pendingSamples}
      status={status}
      loading={loading}
      error={error}
      onStatusChange={setStatus}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
}
