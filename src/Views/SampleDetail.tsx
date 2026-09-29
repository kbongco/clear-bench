import Pill from "../Components/Pill/Pill";
import SpecIndicator from "../Components/SpecIndicator/SpecIndicator";

export default function SampleDetail() {
  return (
    <>
      <h1>Components Testing </h1>

      <Pill status='completed' />
      <SpecIndicator stats='True'/>
    </>
  )
}