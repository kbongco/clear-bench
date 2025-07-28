import NavBar from './Layout/NavBar/NavBar'
import { mockSamples } from './mockData/sampleData';
import DashBoard from './Views/Dashboard/Dashboard'
import Home from './Views/Dashboard/Home'
import { Routes, Route } from 'react-router-dom';
import ViewAllSamples from './Views/Dashboard/ViewAllSamples';

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
          <Route path='/view-samples' element={<ViewAllSamples user={currentUser} data={currentUserTeamSamples} />}/>
        </Routes>
        {/* <DashBoard /> */}
      </div>
    </>
  )
}

export default App
