import NavBar from "./Layout/NavBar/NavBar";
import Home from "./Views/Home/Home";
import { Routes, Route } from "react-router-dom";
import LabTechContainer from "./Containers/LabTechContainer";
import AllSamplesContainer from "./Containers/AllSamplesContainer";
import SampleDetailsContainer from "./Containers/SampleDetailsContainer";
import SubmitSamplesContainer from "./Containers/SubmitSamplesContainer";
import SpecsViewContainer from "./Containers/SpecsViewContainer";

function App() {
  return (
    <>
      <NavBar />
      <div className="ml-64">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/samples/:id" element={<SampleDetailsContainer />} />
          <Route path="/submit-samples" element={<SubmitSamplesContainer />} />
          <Route path="/approve-samples" element={<LabTechContainer />} />
          <Route path="/view-samples" element={<AllSamplesContainer />} />
          <Route path="/specs" element={<SpecsViewContainer />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
