import { useEffect, useState } from "react";
import ScientistAllSamples from "../Views/Dashboard/ScientistAllSamples";
import { getScientists } from "../services/scientists";
import { CURRENT_SCIENTIST_ID } from "../services/currentUser";
import { getAllSamples } from "../services/samples";
import type { SampleWithOwner } from "../types/Samples/sample";

export default function ScientistSamplesContainer() {
  const [loading, setLoading] = useState<boolean>(true);
  const [department, setDepartment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [teamSamples, setTeamSamples] = useState<SampleWithOwner[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scientists = await getScientists();
        const currentDepartment = scientists.find(
          (sci) => sci.id === CURRENT_SCIENTIST_ID,
        );
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
  }, []);

  useEffect(() => {
    if (!department) return;
    const fetchData = async () => {
      try {
        const data = await getAllSamples({ department });
        setTeamSamples(data.samples);
      } catch {
        setError("Could not load samples. Is the backend running?");
      }
    };
    fetchData();
  }, [department]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <ScientistAllSamples department={department} samples={teamSamples} />
    </>
  );
}
