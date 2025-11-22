import { useState } from "react"
import { PinScreen } from "./PinScreen"
import RsvpScreen from "./RsvpScreen"

function Rsvp() {
  const accessCode = localStorage.getItem("accessCode")
  const [access, setAccess] = useState<string | null>(accessCode)

  return (
    <>
      {!access ? (
        <PinScreen setAccess={setAccess} />
      ) : (
        <RsvpScreen access={access} />
      )}
    </>
  )
}

export default Rsvp
