import { useState, useEffect } from "react";
// import { CURRENT_SCIENTIST_ID } from "../services/currentUser";
import { getScientists } from "../services/scientists";
import SubmitSamples from "../Views/SubmitSamples";
import type { ScientistSummary } from "../types/Samples/sample";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function SubmitSamplesContainer() {
  const [scientist, setScientist] = useState<ScientistSummary>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const { id: scientistId } = useCurrentUser();

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const scientists = await getScientists();
        const currentScientist = scientists.find((sci) => sci.id === scientistId);
        if (!ignore) setScientist(currentScientist);
      } catch {
        if (!ignore) setError("Unable to find scientist");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [scientistId]);

  if (loading) return <div>Loading Sample submit...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!scientist) return <p> Cannot find scientist info</p>;
  return (
    <div>
      <SubmitSamples scientist={scientist} />
    </div>
  );
}
