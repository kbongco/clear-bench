export default function ManagerView({ scientist, labTechs }: any) {
  const directReports = scientist.filter(s => s.manager_id === 1);
  console.log(directReports, 'mem')
  return ( 
    <>
      <section className=''>
      <h1 className='text-center p-16'>Your Current Team</h1>
      </section>
      
    </>
  )
} 