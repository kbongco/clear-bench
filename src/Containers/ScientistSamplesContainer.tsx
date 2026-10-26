import { useEffect, useState } from "react";
import ScientistAllSamples from "../Views/Dashboard/ScientistAllSamples";
import { getScientists } from "../services/scientists";
import { getAllSamples } from "../services/samples";
import type { SampleWithOwner } from "../types/Samples/sample";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function ScientistSamplesContainer() {
  const { id: scientistId } = useCurrentUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [teamSamples, setTeamSamples] = useState<SampleWithOwner[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scientists = await getScientists();
        const currentDepartment = scientists.find((sci) => sci.id === scientistId);
        if (!currentDepartment) {
          setError("We couldn't find your scientist profile.");
          return;
        }
        setDepartment(currentDepartment.department ?? "");
      } catch {
        setError("Is the back end running properly?");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [scientistId]);

  useEffect(() => {
    let ignore = false;
    if (!department) return;
    const fetchData = async () => {
      try {
        const data = await getAllSamples({ department, status });
        if (!ignore) setTeamSamples(data.samples);
      } catch {
        if (!ignore) setError("Could not load samples. Is the backend running?");
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [department, status]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <ScientistAllSamples
        department={department}
        samples={teamSamples}
        status={status}
        onStatusChange={setStatus}
      />
    </>
  );
}
