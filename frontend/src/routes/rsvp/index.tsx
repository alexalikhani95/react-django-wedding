import { PinScreen } from "./PinScreen"
import RsvpScreen from "./RsvpScreen"

type Props = {
  accessCode: string | null
  setAccessCode: React.Dispatch<React.SetStateAction<string | null>>
}

function Rsvp({ accessCode, setAccessCode }: Props) {
  return (
    <>
      {!accessCode ? (
        <PinScreen setAccess={setAccessCode} />
      ) : (
        <RsvpScreen access={accessCode} />
      )}
    </>
  )
}

export default Rsvp
