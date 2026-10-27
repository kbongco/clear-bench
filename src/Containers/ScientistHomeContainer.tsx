import { useEffect, useState } from "react";
import type { SampleAPI } from "../types/Samples/sample";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { getSamples } from "../services/samples";
import ScientistHome from "../Views/Home/ScientistHome";

export default function ScientistHomeContainer() {
  const { id: scientistId, name } = useCurrentUser();
  const [samples, setSamples] = useState<SampleAPI[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const sampleItems = await getSamples(scientistId);
        if (!ignore) setSamples(sampleItems.samples);
      } catch {
        if (!ignore) setError("Is the backend running properly? ");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [scientistId]);

  return <ScientistHome name={name} samples={samples} error={error} loading={loading} />;
}
