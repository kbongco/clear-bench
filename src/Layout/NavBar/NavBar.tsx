import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHouse, faFlask, faCheckSquare, faFile, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
type NavbarProps = {
  role: string;
  setRole: (role: string) => void;
};
export default function NavBar({ role, setRole }: NavbarProps) {
  return (
    <div className='w-64 bg-blue-500 fixed h-full flex flex-col justify-between'>
      <div>
        <div className='m-8'>
          <h1 className='text-2xl text-white font-bold'>Clear Bench</h1>
        </div>
        <hr />
        <ul className='m-4 flex flex-col'>
          <li className='m-8'>
            <div className='flex gap-4 items-center'>
              <FontAwesomeIcon className='text-2xl text-white' icon={faHouse} />
              <NavLink to='/' className='text-white text-lg font-bold'>Home</NavLink>
            </div>
          </li>
          <li className='m-8'>
            <div className='flex gap-4 items-center'>
              <FontAwesomeIcon className='text-2xl text-white' icon={faBell} />
              <a href='/notifications' className='text-white text-lg font-bold'>Notifications</a>
            </div>
          </li>
          <li className='m-8'>
            <div className='flex gap-4 items-center'>
              <FontAwesomeIcon className='text-2xl text-white' icon={faFlask} />
              <NavLink to='/view-samples' className='text-white text-lg font-bold'>All Samples</NavLink>
            </div>
          </li>
          <li className='m-8'>
            <div className='flex gap-4 items-center'>
              <FontAwesomeIcon className='text-2xl text-white' icon={faFlask} />
              <a href='/current-samples' className='text-white text-lg font-bold'>Current Samples</a>
            </div>
          </li>
          {/* <li className='m-8'>
            <div className='flex gap-4 items-center'>
              <FontAwesomeIcon className='text-2xl text-white' icon={faCheckSquare} />
              <a href='/submit-samples' className='text-white text-lg font-bold'>Submit Samples</a>
            </div>
          </li> */}
          {role === 'scientist' ? (
  <li className='m-8'>
    <div className='flex gap-4 items-center'>
      <FontAwesomeIcon className='text-2xl text-white' icon={faCheckSquare} />
      <a href='/submit-samples' className='text-white text-lg font-bold'>Submit Samples</a>
    </div>
  </li>
) : (
  <li className='m-8'>
    <div className='flex gap-4 items-center'>
      <FontAwesomeIcon className='text-2xl text-white' icon={faCheckSquare} />
      <a href='/approve-samples' className='text-white text-lg font-bold'>Approve Samples</a>
    </div>
  </li>
)}

          <li className='m-8'>
            <div className='flex gap-4 items-center'>
              <FontAwesomeIcon className='text-2xl text-white' icon={faFile} />
              <a href='/generate-report' className='text-white text-lg font-bold'>Generate Report</a>
            </div>
          </li>
        </ul>
      </div>

      <div className='m-4'>
        {/* Role Switcher */}
        <div className='mb-4'>
          <label className='text-white font-semibold block mb-1'>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='w-full px-2 py-1 rounded text-black'
          >
            <option value='scientist'>Scientist</option>
            <option value='labtech'>Lab Tech</option>
          </select>
        </div>

        {/* Logout */}
        <div className='flex items-center gap-2'>
          <FontAwesomeIcon className='text-2xl text-white' icon={faRightFromBracket} />
          <h1 className='text-lg text-white font-bold'>Logout</h1>
        </div>
      </div>
    </div>
  );
}