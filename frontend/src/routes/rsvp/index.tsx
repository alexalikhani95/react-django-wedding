import { useState } from "react"
import { PinScreen } from "./PinScreen"
import RsvpScreen from "./RsvpScreen"

export type AccessCode = "nightBefore" | "weddingDay"

function Rsvp() {
    const [access, setAccess] = useState<AccessCode | null>(null)

    return <>{!access ? <PinScreen setAccess={setAccess} /> : <RsvpScreen />}</>
}

export default Rsvp
