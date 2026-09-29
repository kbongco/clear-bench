interface SpecIndicatorProps {
  outOfSpec: boolean;
}

export default function SpecIndicator({ outOfSpec }: SpecIndicatorProps) {
  return (
    <div className='flex items-center gap-2'>
      <div>
        <div className={`h-5 w-5 rounded-full ${outOfSpec  ? 'bg-green-800' : 'bg-red-600'}`} />
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-m'>{outOfSpec  ? 'Out of Spec' : "Currently in spec"}</p>
          {outOfSpec !== false && (
            <p className="text-red-600 font-bold">Needs attention!</p>
          )}
        </div>
    </div>
  )
}