interface SpecIndicator {
  word: string;
  status: string;
}

export default function SpecIndicator() {
  return (
    <>
      <div className='h-5 w-5 bg-green-800 bg-green-800 rounded-lg '/>
      <h2 className='text-3xl'>Spec Indicator</h2>
    </>
  )
}