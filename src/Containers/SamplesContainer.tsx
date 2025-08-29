import { useEffect, useState } from "react";
import SampleView from "../Views/SampleView";
import { getSampleResults } from "../services/samples";
import { useParams } from "react-router-dom";

export default function SamplesContainer() {
  const { id } = useParams(); 
  const [sampleResults, setSampleResults] = useState([]);

  const sampleId = id ? parseInt(id, 10) : undefined;
  console.log(sampleId)

if (!sampleId) {
  return <p>Invalid sample ID</p>; // handle missing/invalid ID
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const id = 2 ; 
  //       const resultsData = await getSampleResults(id);
  //       setSampleResults(resultsData);
  //       console.log(sampleResults,'sample')
  //     } catch (err: any) {
  //       console.error(err.message);
  //     }
  //   }
  //   fetchData();
  // }, [])

  return ( 
    <>
      <SampleView data={sampleResults} />
    </>
  )
}