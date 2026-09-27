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
  const [department, setDepartment] = useState<any>([])
  const [teams, setTeams] = useState<string[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState('')
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const samplesData = await getAllSamples({status, department});
        setLabTechSamples(samplesData.samples);
      } catch (err) {
        setError("Could not load samples. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [status, department]);
  
useEffect(() => {
  const fetchTeams = async () => {
    try {
      const scientists = await getScientists();
      const uniqueTeams = [...new Set(scientists.map((s: { department: string | null }) => s.department).filter(Boolean))] as string[];
      setTeams(uniqueTeams);
    } catch (err) {
      console.error(err);   // the page still works without the list, so don't block it
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
