import { useParams } from "react-router-dom";
import SampleDetail from "../Views/SampleDetail";

export default function SampleDetailsContainer() {
  const { id } = useParams();
  
  const sampleId = id ? parseInt(id, 10) : undefined;


  if (!sampleId) {
  return <p>Invalid sample ID</p>; 
  }
  
  return (
    <>
      <SampleDetail/>
    </>
  )
}