import { useParams } from "react-router-dom";
import SampleDetailView from "../Views/SampleDetailView";
import { useEffect, useState } from "react";
import { getSample } from "../services/samples";
import type { SampleDetail as SampleDetailData } from "../types/Results/results";

export default function SampleDetailsContainer() {
  const { id } = useParams();

  const sampleId = id ? parseInt(id, 10) : undefined;
  const [sampleDetails, setSampleDetails] = useState<SampleDetailData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!sampleId) return;
    let ignore = false;
    const fetchData = async () => {
      try {
        const sample = await getSample(sampleId);
        if (!ignore) setSampleDetails(sample);
      } catch {
        if (!ignore) setError("Is the backend running properly? ");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [sampleId]);

  if (!sampleId) {
    return <p>Invalid sample ID</p>;
  }
  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;
  if (!sampleDetails) return <p>Sample not found</p>;

  return (
    <>
      <SampleDetailView sample={sampleDetails} />
    </>
  );
}
