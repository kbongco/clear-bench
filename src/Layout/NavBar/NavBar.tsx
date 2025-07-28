import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHouse, faFlask, faCheckSquare, faFile, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
export default function NavBar() {
  return (
    <>
      <div className='w-64 bg-blue-500 fixed h-full'>
        <div className='m-8'>
          <h1 className='text-2x text-white font-bold'>Sample Management</h1>
        </div>
        <hr />
        <div className='flex '>
          <ul className='m-4 flex flex-col'>
            <li className='m-8'>
              <div className='flex'>
                <div className='gap-4'>
                  <FontAwesomeIcon className='text-2xl text-white' icon={faHouse} />
                </div>
                <div>
                  {/* <a href='/' className='text-white text-2x font-bold'>Home</a> */}
                  <NavLink to='/' className='text-white text-2x font-bold'>Home</NavLink>
                </div>
              </div>
            </li>
            <li className='m-8'>
              <div className='flex'>
                <div className='gap-4'>
                  <FontAwesomeIcon className='text-2xl text-white' icon={faBell} />
                </div>
                <a href='/notifications' className='text-white text-2x font-bold'>Notifications</a>
              </div>
            </li>
            <li className='m-8'>
              <div className='flex'>
                <div className='gap-4'>
                  <FontAwesomeIcon className='text-2xl text-white' icon={faFlask} />
                </div>
                <div>
                  <NavLink to ='/view-samples' className='text-white text-2x font-bold'>All Samples</NavLink>
                  {/* <a href='/all-samples' className='text-white text-2x font-bold'>All Samples</a> */}
                </div>
              </div>
            </li>
            <li className='m-8'>
              <div className='flex'>
                <div className='gap-4'>
                  <FontAwesomeIcon className='text-2xl text-white' icon={faFlask} />
                </div>
                <div>
                  <a href='/current-samples' className='text-white text-2x font-bold'>Current Samples</a>
                </div>
              </div>
            </li>
            <li className='m-8'>
              <div className='flex'>
                <div className='gap-4'>
                  <FontAwesomeIcon className='text-2xl text-white' icon={faCheckSquare} />
                </div>
                <div>
                  <a href='/submit-samples' className='text-white text-2x font-bold'>Submit Samples</a>
                </div>
              </div>
            </li>
            <li className='m-8'>
            <div className='flex'>
                <div className='gap-4'>
                <FontAwesomeIcon className='text-2xl text-white' icon={faFile} />
                </div>
                <div>
                <a href='/generate-report' className='text-white text-2x font-bold'>Generate Report</a> 
                </div>
              </div>
            </li>
          </ul>
        </div>
        <hr />
        <div className='flex'>
        <FontAwesomeIcon className='text-2xl text-white' icon={faRightFromBracket} />
          <h1 className='text-2x text-white font-bold'>Logout</h1>
        </div>
      </div>
    </>
  );
}