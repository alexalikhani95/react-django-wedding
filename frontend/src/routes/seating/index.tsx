import { SeatingDesktop } from "./SeatingDesktop"
import { SeatingMobile } from "./SeatingMobile"

export const Seating = () => {
  return (
    <>
      <div className="hidden md:block">
        <SeatingDesktop />
      </div>
      <div className="block md:hidden">
        <SeatingMobile />
      </div>
    </>
  )
}
