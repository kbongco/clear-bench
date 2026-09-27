import { useEffect, useState } from "react";
import ScientistAllSamples from "../Views/Dashboard/ScientistAllSamples";
import { getScientists } from "../services/scientists";

export default function ScientistSamplesContainer() {
  const [loading, setLoading] = useState<boolean>(true);
  const [scientists, setScientists] = useState('');
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scientists = await getScientists();
        setScientists(scientists);
      } catch (error) {
        setError('Is the back end running properly?')
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  },[])
  return (<>
    <ScientistAllSamples/>
  </>)
}