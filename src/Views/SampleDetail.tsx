import Card from "../Components/Card/Card";
import Pill from "../Components/Pill/Pill";
import SpecIndicator from "../Components/SpecIndicator/SpecIndicator";

export default function SampleDetail() {
  return (
    <>
      <h1>Components Testing </h1>

      <Pill status='completed' />
      <Pill status='in_progress' />
      <Pill status='pending' />
      <Pill status='rejected' />
      <Pill status='on_hold'/>
      
      <SpecIndicator outOfSpec={false} />
       <SpecIndicator outOfSpec={true} />
      {/* <Card/> */}
    </>
  )
}