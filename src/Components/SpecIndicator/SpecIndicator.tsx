interface SpecIndicatorProps {
  outOfSpec: boolean;
}

export default function SpecIndicator({ outOfSpec }: SpecIndicatorProps) {
  return (
    <div className='flex items-center gap-2'>
      <div>
        <div className={`h-5 w-5 rounded-3xl ${outOfSpec === false ? 'bg-green-800' : 'bg-red-600'}`} />
        </div>
      <div>
        <div className='flex items-center gap-2'>
          <h2 className='text-3xl'>{outOfSpec === false ? 'Currently In Spec' : "Out of Spec"}</h2>
          {outOfSpec !== false && (
            <p className="text-red-600 font-bold">Needs attention!</p>
          )}
        </div>
      </div>
    </div>
  )
}