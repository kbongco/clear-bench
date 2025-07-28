import NavBar from './Layout/NavBar/NavBar'
import { mockSamples } from './mockData/sampleData';
import DashBoard from './Views/Dashboard/Dashboard'
import Home from './Views/Dashboard/Home'
import { Routes, Route } from 'react-router-dom';

function App() {
    const currentUser = mockSamples[0].owner.name;

  return (
    <>
      <NavBar />
      <div className="ml-64">
        <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
        {/* <DashBoard /> */}
      </div>
    </>
  )
}

export default App
