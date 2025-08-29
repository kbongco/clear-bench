import NavBar from './Layout/NavBar/NavBar'
import { mockLabTechs, mockSamples } from './mockData/sampleData';
import DashBoard from './Views/Dashboard/Dashboard'
import Home from './Views/Home/Home'
import { Routes, Route } from 'react-router-dom';
import ViewAllSamples from './Views/Dashboard/ViewAllSamples';
import SubmitSamples from './Views/SubmitSamples';
import ApproveSamples from './Views/ApprovSamples';
import { useRoleStore } from './store/useRoleStore';
import ScientistContainer from './Containers/ScientistContainer';
import SamplesContainer from './Containers/SamplesContainer';


function App() {
  const role = useRoleStore((state) => state.role);
  console.log(role,'test')
  const currentUser = mockSamples[0].owner.name;
  console.log(mockSamples);
  const currentLabTech = mockLabTechs[0].name;
  console.log(currentLabTech, 'current');
  const currentUserTeamSamples = mockSamples.filter(sample =>
    sample.owner.name === currentUser || sample.owner.managerName === currentUser
  );


  const submittedSamples = localStorage.getItem('submittedSamples')

  

  return (
    <>
      <NavBar/>
      <div className="ml-64">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scientists" element={<ScientistContainer />} />
          <Route path='/sample-results/:id' element={<SamplesContainer/>}/>
          <Route path='/view-samples' element={<ViewAllSamples user={currentUser} data={currentUserTeamSamples} />} />
          <Route path='/submit-samples' element={<SubmitSamples user={currentUser} />} />
          <Route path='/approve-samples' element={<ApproveSamples data={submittedSamples} />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
