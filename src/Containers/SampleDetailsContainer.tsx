import { useParams } from "react-router-dom";
import SampleDetail from "../Views/SampleDetail";
import { useEffect, useState } from "react";
import { getSample,  } from "../services/samples";
import type { SampleWithOwner } from "../types/Samples/sample";

export default function SampleDetailsContainer() {
  const { id } = useParams();
  
  const sampleId = id ? parseInt(id, 10) : undefined;
  const [sampleDetails, setSampleDetails] = useState<SampleWithOwner | null>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let ignore = false;
    if (!sampleId) return;
    const fetchData = async () => {
      try {
        const sample = await getSample(sampleId);
        setSampleDetails(sample);
        if (!sample) {
          setError('No samples available')
          return;
        }

      } catch {
        setError('Is the backend running properly? ');
      } finally {
         setLoading(false);
      }
    }
    fetchData();
      return () => {
      ignore = true
    }
  }, [sampleId]);

  console.log(sampleDetails);


  if (!sampleId) {
  return <p>Invalid sample ID</p>; 
  }
  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <>
      <SampleDetail/>
    </>
  )
}