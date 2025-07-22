export default function NavBar() {
  return (
    <>
      <div className='w-64 bg-blue-500 fixed h-full'>
        <div className='m-8'>
          <h1 className='text-2x text-white font-bold'>Sample Management</h1>
        </div>
        <hr />
        <div className='flex'>
          <ul className='m-8 flex flex-col'>
            <li className='m-8'>
              <a href='/' className='text-white text-2x font-bold'>Home</a>
            </li>
            <li className='m-8'>
              <a href='/notifications' className='text-white text-2x font-bold'>Notifications</a>
            </li>
            <li className='m-8'>
              <a href='/all-samples' className='text-white text-2x font-bold'>All Samples</a>
            </li>
            <li className='m-8'>
              <a href='/current-samples' className='text-white text-2x font-bold'>Current Samples</a>
            </li>
            <li className='m-8'>
              <a href='/submit-samples' className='text-white text-2x font-bold'>Submit Samples</a>
            </li>
            <li className='m-8'>
              <a href='/generate-report' className='text-white text-2x font-bold'>Generate Report</a>
            </li>
          </ul>
        </div>
        <hr />
        <div>
          <h1 className='text-2x text-white font-bold'>Logout</h1>
        </div>
      </div>
    </>
  );
}