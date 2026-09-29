interface SpecIndicatorProps {
  stats: string;
}

export default function SpecIndicator({ stats }: SpecIndicatorProps) {
  return (
    <div className='flex items-center gap-2'>
      <div>
        <div className={`h-5 w-5 rounded-3xl ${stats === 'False' ? 'bg-green-800' : 'bg-red-600'}`} />
        </div>
      <div>
        <div className='flex items-center gap-2'>
          <h2 className='text-3xl'>{stats === 'False' ? 'Currently In Spec' : "Out of Spec"}</h2>
          {stats !== 'False' && (
            <p className="text-red-600 font-bold">Needs attention!</p>
          )}
        </div>
      </div>
    </div>
  )
}