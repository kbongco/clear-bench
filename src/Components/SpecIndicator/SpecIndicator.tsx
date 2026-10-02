interface SpecIndicatorProps {
  outOfSpec: boolean;
}

export default function SpecIndicator({ outOfSpec }: SpecIndicatorProps) {
  return (
    <div className='flex items-center gap-2'>
      <div>
        <div className={`h-5 w-5 rounded-full ${outOfSpec  ? 'bg-red-600' :  'bg-green-800' }`} />
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-base'>{outOfSpec  ? 'Out of Spec' : "Currently in spec"}</p>
          {outOfSpec  && (
            <p className="text-red-600 font-bold">Needs attention!</p>
          )}
        </div>
    </div>
  )
}