import NavBar from './Layout/NavBar/NavBar'
import { mockSamples } from './mockData/sampleData';
import DashBoard from './Views/Dashboard/Dashboard'
import Home from './Views/Dashboard/Home'
import { Routes, Route } from 'react-router-dom';
import ViewAllSamples from './Views/Dashboard/ViewAllSamples';
import SubmitSamples from './Views/SubmitSamples';

function App() {
  const currentUser = mockSamples[0].owner.name;
  const currentUserTeamSamples = mockSamples.filter(sample =>
    sample.owner.name === currentUser || sample.owner.managerName === currentUser
  );
  console.log(currentUserTeamSamples)
  

  return (
    <>
      <NavBar />
      <div className="ml-64">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/view-samples' element={<ViewAllSamples user={currentUser} data={currentUserTeamSamples} />} />
          <Route path='/submit-samples' element={<SubmitSamples user={currentUser} />}/>
        </Routes>
        {/* <DashBoard /> */}
      </div>
    </>
  )
}

export default App
