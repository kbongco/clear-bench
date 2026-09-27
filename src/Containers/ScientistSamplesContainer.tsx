import { useEffect, useState } from "react";
import ScientistAllSamples from "../Views/Dashboard/ScientistAllSamples";
import { getScientists } from "../services/scientists";
import { CURRENT_SCIENTIST_ID } from "../services/currentUser";

export default function ScientistSamplesContainer() {
  const [loading, setLoading] = useState<boolean>(true);
  const [department, setDepartment] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scientists = await getScientists();
        const currentDepartment = scientists.find((sci) => sci.id === CURRENT_SCIENTIST_ID);
        setDepartment(currentDepartment?.department ?? '');
      } catch (error) {
        setError('Is the back end running properly?')
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  },[])
  return (<>
    <ScientistAllSamples department={ department} />
  </>)
}