import { useRoleStore } from "../store/useRoleStore";
import ViewAllSamples from "../Views/Dashboard/ViewAllSamples";
import { mockSamples } from "../mockData/sampleData";
import LabTechAllSamples from "../Views/Dashboard/LabTechAllSamples";
import { useEffect, useState } from "react";
import { getAllSamples } from "../services/samples";
import type { SampleWithOwner } from "../types/Samples/sample";
import { getScientists } from "../services/scientists";

export default function AllSamplesContainer({ user }: { user: string }) {
  const role = useRoleStore((state) => state.role);
  const [labTechSamples, setLabTechSamples] = useState<SampleWithOwner[]>([]);
  const [department, setDepartment] = useState('');
  const [teams, setTeams] = useState<string[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState('')
  const [error, setError] = useState<string | null>("");

useEffect(() => {
  let ignore = false;                     

  const fetchData = async () => {
    try {
      const samplesData = await getAllSamples({ status, department });
      if (!ignore) setLabTechSamples(samplesData.samples);   
    } catch (err) {
      if (!ignore) setError("Could not load samples. Is the backend running?");
    } finally {
      if (!ignore) setLoading(false);
    }
  };
  fetchData();

  return () => { ignore = true; };       
}, [status, department]);
  
useEffect(() => {
  const fetchTeams = async () => {
    try {
      const scientists = await getScientists();
      const uniqueTeams = [...new Set(scientists.map((s: { department: string | null }) => s.department).filter(Boolean))] as string[];
      setTeams(uniqueTeams);
    } catch (err) {
      console.error(err); 
    }
  };
  fetchTeams();
}, []);

  if (role === "labtech") {
    if (loading) return <p>Loading samples…</p>;
    if (error) return <p>{error}</p>;
    return <LabTechAllSamples   samples={labTechSamples}
  status={status} onStatusChange={setStatus}
  department={department} onDepartmentChange={setDepartment}
  teams={teams} />
  }

  const currentUserTeamSamples = mockSamples.filter(
    (sample) => sample.owner.name === user || sample.owner.managerName === user,
  );
  return <ViewAllSamples user={user} data={currentUserTeamSamples} />;
}
