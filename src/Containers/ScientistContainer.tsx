import { useEffect, useState } from "react";
import { getScientists } from "../services/scientists";
import ManagerView from "../Views/Home/ManagerView";
import { getLabTechs } from "../services/labtechs";
import { getSamples } from "../services/samples";

export default function ScientistContainer() {
  const [scientist, setScientists] = useState([]);
  const [labTechs, setLabTechs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scientistsData, labTechData] = await Promise.all([
          getScientists(),
          getLabTechs(),
        ]);
        setScientists(scientistsData);
        setLabTechs(labTechData);

        const samplesData: Record<number, any[]> = {};
        await Promise.all(
          scientistsData.map(async (s: any) => {
            const data = await getSamples(s.id.toString());
            samplesData[s.id] = data;
          })
        );
        setSamples(samplesData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) return <div>Loading scientists...</div>;
  if (error) return <div>Error: {error}</div>;

  return ( 
    <>
      <ManagerView scientist={scientist} labTechs={labTechs} samples={samples} />
    </>
  )
}