import { useState, useEffect } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { getAllSamples } from "../services/samples";
import type { SampleWithOwner } from "../types/Samples/sample";
import LabTechHome from "../Views/Home/LabTechHome";

export default function LabTechHomeContainer() {
  const { id: labTechId, name } = useCurrentUser();
  const [pending, setPending] = useState<SampleWithOwner[]>([]);
  const [inTesting, setInTesting] = useState<SampleWithOwner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const [pendingRes, testingRes] = await Promise.all([
          getAllSamples({ status: "pending" }),
          getAllSamples({ status: "in_progress", labTechId }),
        ]);
        if (!ignore) {
          setPending(pendingRes.samples);
          setInTesting(testingRes.samples);
        }
      } catch {
        if (!ignore) setError("Is the backend running properly?");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [labTechId]);

  return (
    <LabTechHome
      name={name}
      pending={pending}
      inTesting={inTesting}
      loading={loading}
      error={error}
    />
  );
}
