import NavBar from './Layout/NavBar/NavBar'
import DashBoard from './Views/Dashboard/Dashboard'
import Home from './Views/Dashboard/Home'

function App() {

  return (
    <>
      <NavBar />
      <div className="ml-64">
        <Home/>
        {/* <DashBoard /> */}
      </div>
    </>
  )
}

export default App
