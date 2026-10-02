import NavBar from "./Layout/NavBar/NavBar";
import { mockSamples } from "./mockData/sampleData";
import Home from "./Views/Home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import SubmitSamples from "./Views/SubmitSamples";
import ScientistContainer from "./Containers/ScientistContainer";
import LabTechContainer from "./Containers/LabTechContainer";
import Login from "./Views/Home/Login";
import AllSamplesContainer from "./Containers/AllSamplesContainer";
import SampleDetailsContainer from "./Containers/SampleDetailsContainer";

function App() {
  const location = useLocation();
  const hideNavBarRoutes = ["/login"];
  const shouldShowNavBar = !hideNavBarRoutes.includes(location.pathname);
  const currentUser = mockSamples[0].owner.name;

  return (
    <>
      {shouldShowNavBar && <NavBar />}
      <div className={shouldShowNavBar ? "ml-64" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scientists" element={<ScientistContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/samples/:id" element={<SampleDetailsContainer />} />
          <Route
            path="/submit-samples"
            element={<SubmitSamples user={currentUser} />}
          />
          <Route path="/approve-samples" element={<LabTechContainer />} />
          <Route path="/view-samples" element={<AllSamplesContainer />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
