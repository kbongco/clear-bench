import { useParams } from "react-router-dom";
import SampleDetailView from "../Views/SampleDetailView";
import { useEffect, useState } from "react";
import { getSample } from "../services/samples";
import type { SampleDetail as SampleDetailData } from "../types/Results/results";
import type { ProductSpec } from "../types/Specs/specs";
import { getSpecs } from "../services/specs";

export default function SampleDetailsContainer() {
  const { id } = useParams();

  const sampleId = id ? parseInt(id, 10) : undefined;
  const [sampleDetails, setSampleDetails] = useState<SampleDetailData | null>(null);
  const [specs, setSpecs] = useState<ProductSpec[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [specsError, setSpecsError] = useState<string | null>(null); // new
  const sampleType = sampleDetails?.sample_type;

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

  useEffect(() => {
    if (!sampleType) return;
    let ignore = false;
    const fetchData = async () => {
      try {
        const data = await getSpecs(sampleType);
        if (!ignore) setSpecs(data);
      } catch {
        if (!ignore) setSpecsError("Couldn't load specs");
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [sampleType]);

  if (!sampleId) {
    return <p>Invalid sample ID</p>;
  }
  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;
  if (!sampleDetails) return <p>Sample not found</p>;

  const sampleSpecs = specs.filter((spec) => sampleDetails.test_types.includes(spec.test_type));

  return (
    <>
      <SampleDetailView
        sample={sampleDetails}
        specs={sampleSpecs}
        specsError={specsError}
        onSaved={setSampleDetails}
      />
    </>
  );
}
