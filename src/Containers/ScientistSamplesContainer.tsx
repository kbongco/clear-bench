import { useEffect, useState } from "react";
import ScientistAllSamples from "../Views/Dashboard/ScientistAllSamples";
import { getScientists } from "../services/scientists";
import { CURRENT_SCIENTIST_ID } from "../services/currentUser";
import { getAllSamples } from "../services/samples";

export default function ScientistSamplesContainer() {
  const [loading, setLoading] = useState<boolean>(true);
  const [department, setDepartment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [teamSamples, setTeamSamples] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scientists = await getScientists();
        const currentDepartment = scientists.find((sci) => sci.id === CURRENT_SCIENTIST_ID);
        setDepartment(currentDepartment?.department ?? '');
      } catch {
        setError('Is the back end running properly?')
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const samplesByDept = await getAllSamples({ department });
        console.log(samplesByDept.samples.name);
      } catch {
        console.error(error);
      }
    }
    fetchData();
  }, [department]);
  
  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;
  return (<>
    <ScientistAllSamples department={ department} />
  </>)
}