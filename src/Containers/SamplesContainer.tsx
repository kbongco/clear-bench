import { useEffect, useState } from "react";
import SampleView from "../Views/SampleView";
import { getSampleResults } from "../services/samples";

export default function SamplesContainer() {
  const [sampleResults, setSampleResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = 1; 
        const resultsData = await getSampleResults(id);
        setSampleResults(resultsData);
        console.log(sampleResults,'sample')
      } catch (err: any) {
        console.error(err.message);
      }
    }
    fetchData();
  }, [])

  return ( 
    <>
      <SampleView data={sampleResults} />
    </>
  )
}