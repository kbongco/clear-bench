interface SpecIndicatorProps {
  stats: string;
}

export default function SpecIndicator({ stats }: SpecIndicatorProps) {
  return (
    <>
      <div className={`h-5 w-5 rounded-lg ${stats === 'False' ? 'bg-green-800' : 'bg-red-600'}`} />
      <div>
        <div>
          <h2 className='text-3xl'>{stats === 'False' ? 'Currently In Spec' : "Out of Spec"}</h2>
          {stats !== 'False' && (
            <p className="text-red-600 font-bold mt-2">Needs attention!</p>
          )}
        </div>
      </div>
    </>
  )
}