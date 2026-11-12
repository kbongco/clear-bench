import NavBar from "./Layout/NavBar/NavBar";
import Home from "./Views/Home/Home";
import { Routes, Route } from "react-router-dom";
import LabTechContainer from "./Containers/LabTechContainer";
import AllSamplesContainer from "./Containers/AllSamplesContainer";
import SampleDetailsContainer from "./Containers/SampleDetailsContainer";
import SubmitSamplesContainer from "./Containers/SubmitSamplesContainer";
import SpecsViewContainer from "./Containers/SpecsViewContainer";
import WhatsNext from "./Views/WhatsNext";
import { useEffect } from "react";
import { useCurrentUserStore } from "./store/useCurrentUserStore";
import LoginContainer from "./Containers/LoginContainer";
import RequireAuth from "./Layout/NavBar/RequireAuth";
import AppLayout from "./Layout/NavBar/AppLayout";

function App() {
  const status = useCurrentUserStore((state) => state.status);
  const user = useCurrentUserStore((state) => state.user);
  const loadCurrentUser = useCurrentUserStore((state) => state.loadCurrentUser);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  if (status === "loading") return <p className="p-6">Loading…</p>;
  if (!user) return <LoginContainer />;
  return (
    <>
      <NavBar />
      <div className="md:ml-64">
        <Routes>
          <Route path="/login" element={<LoginContainer />} />
          <Route element={<AppLayout />}>
            <Route path="/whats-next" element={<WhatsNext />} />
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/samples/:id" element={<SampleDetailsContainer />} />
              <Route path="/submit-samples" element={<SubmitSamplesContainer />} />
              <Route path="/approve-samples" element={<LabTechContainer />} />
              <Route path="/view-samples" element={<AllSamplesContainer />} />
              <Route path="/specs" element={<SpecsViewContainer />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
