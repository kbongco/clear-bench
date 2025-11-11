import { useEffect, useState } from "react";
import SampleView from "../Views/SampleDetails/SampleView";
import { getSampleResults } from "../services/samples";
import { useParams } from "react-router-dom";

export default function SamplesContainer() {
  const { id } = useParams();
  const [sampleResults, setSampleResults] = useState([]);

  const sampleId = id ? parseInt(id, 10) : undefined;
  console.log(sampleId)

  if (!sampleId) {
    return <p>Invalid sample ID</p>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultsData = await getSampleResults(sampleId);
        setSampleResults(resultsData);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [sampleId]);

  return (
    <>
      <SampleView data={sampleResults} />
    </>
  )
}