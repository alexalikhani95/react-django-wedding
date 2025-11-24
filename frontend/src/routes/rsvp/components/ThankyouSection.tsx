import type { Ref } from "react"
import GreenCheers from "@/assets/Green-cheers-Thankyou.png"
import WhiteCheers from "@/assets/White-cheers-Thankyou.png"
import { Button } from "@/components/ui/button"

type Props = {
  nightBeforeAccess: boolean
  ref: Ref<HTMLDivElement> | undefined
  showSubmitted: boolean
  onScroll: () => void
}

export const ThankyouSection = ({
  nightBeforeAccess,
  ref,
  showSubmitted,
  onScroll,
}: Props) => {
  return (
    <div>
      <div
        className={`${nightBeforeAccess ? "bg-beige text-forest-green" : "bg-forest-green text-beige"} py-10 text-center`}
        ref={ref}
      >
        {showSubmitted && (
          <div className="animate-fade-in duration-700 flex flex-col items-center gap-5">
            <p className="text-7xl font-mattedly">Thank you!</p>
            <p className="text-2xl font-adega">YOUR RSVP HAS BEEN RECEIVED</p>

            <img
              src={nightBeforeAccess ? GreenCheers : WhiteCheers}
              alt="Thank you"
              className="w-[200px] h-[200px] mx-auto my-6"
            />

            <p className="text-2xl font-adega">WITH LOVE,</p>
            <p className="text-4xl font-mattedly">Alexander & Charlotte</p>

            <Button
              variant={nightBeforeAccess ? "secondary" : "primary"}
              size="lg"
              className="max-w-[300px] font-adega text-xl mt-10"
              onClick={onScroll}
            >
              FINER DETAILS
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
