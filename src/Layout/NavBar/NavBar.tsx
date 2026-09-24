import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHouse, faFlask, faCheckSquare, faFile, faRightFromBracket, faUsers } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useRoleStore } from '../../store/useRoleStore';

export default function NavBar() {
  const role = useRoleStore((state) => state.role);
  const setRole = useRoleStore((state) => state.setRole);

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
              <NavLink to='/' className='text-white text-lg font-bold'>
                Home
              </NavLink>
            </div>
          </li>
          <li className='m-8'>
            <div className='flex gap-4 items-center'>
              <FontAwesomeIcon className='text-2xl text-white' icon={faBell} />
              <NavLink to='/notifications' className='text-white text-lg font-bold'>
                Notifications
              </NavLink>
            </div>
          </li>
          <li className='m-8'>
            <div className='flex gap-4 items-center'>
              <FontAwesomeIcon className='text-2xl text-white' icon={faFile} />
              <NavLink to='/view-samples' className='text-white text-lg font-bold'>
                All Samples
              </NavLink>
            </div>
          </li>
          <li className='m-8'>
            <div className='flex gap-4 items-center'>
              <FontAwesomeIcon className='text-2xl text-white' icon={faUsers} />
              <NavLink to='/scientists' className='text-white text-lg font-bold'>
                Team
              </NavLink>
            </div>
          </li>
          <li className='m-8'>
            <div className='flex gap-4 items-center'>
              <FontAwesomeIcon className='text-2xl text-white' icon={faFlask} />
              <NavLink to='/current-samples' className='text-white text-lg font-bold'>
                Current Samples
              </NavLink>
            </div>
          </li>

          {/* Conditionally render based on role */}
          {role === 'scientist' ? (
            <li className='m-8'>
              <div className='flex gap-4 items-center'>
                <FontAwesomeIcon className='text-2xl text-white' icon={faCheckSquare} />
                <NavLink to='/submit-samples' className='text-white text-lg font-bold'>
                  Submit Samples
                </NavLink>
              </div>
            </li>
          ) : (
            <li className='m-8'>
              <div className='flex gap-4 items-center'>
                <FontAwesomeIcon className='text-2xl text-white' icon={faCheckSquare} />
                <NavLink to='/approve-samples' className='text-white text-lg font-bold'>
                  Approve Samples
                </NavLink>
              </div>
            </li>
          )}

          <li className='m-8'>
            <div className='flex gap-4 items-center'>
              <FontAwesomeIcon className='text-2xl text-white' icon={faFile} />
              <NavLink to='/generate-report' className='text-white text-lg font-bold'>
                Generate Report
              </NavLink>
            </div>
          </li>
        </ul>
      </div>

      {/* Role switcher + logout */}
      <div className='m-4'>
        <div className='mb-4'>
          <label className='text-white font-semibold block mb-1'>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'scientist' | 'labtech')}
            className='w-full px-2 py-1 rounded text-black'
          >
            <option value='scientist'>Scientist</option>
            <option value='labtech'>Lab Tech</option>
          </select>
        </div>
        <hr/>
        <div className='flex items-center gap-2'>
          <FontAwesomeIcon className='text-2xl text-white' icon={faRightFromBracket} />
          <h1 className='text-lg text-white font-bold'>Logout</h1>
        </div>
      </div>
    </div>
  );
}