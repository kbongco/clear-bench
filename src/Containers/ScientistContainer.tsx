import { useEffect, useState } from "react";
import { getScientists } from "../services/scientists";
import ManagerView from "../Views/Home/ManagerView";
import { getLabTechs } from "../services/labtechs";

export default function ScientistContainer() {
  const [scientist, setScientists] = useState([]);
  const [labTechs, setLabTechs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getScientists(), getLabTechs()]).then(([scientistsData, labTechData]) => {
      setScientists(scientistsData);
      setLabTechs(labTechData);
    }).catch(err => setError(err.message)).finally(() => {
      setLoading(false);
    })
  }, []);

  console.log(scientist,labTechs);

  if (loading) return <div>Loading scientists...</div>;
  if (error) return <div>Error: {error}</div>;

  return ( 
    <>
      <ManagerView scientist={scientist} labTechs={labTechs} />
    </>
  )
}