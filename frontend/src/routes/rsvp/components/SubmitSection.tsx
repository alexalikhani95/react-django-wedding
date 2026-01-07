import { Loader2 } from "lucide-react"
import type { FieldErrors } from "react-hook-form"
import { Button } from "@/components/ui/button"
import type { Inputs } from "../types"

type Props = {
  nightBeforeAccess: boolean
  errors: FieldErrors<Inputs>
  isSubmitting?: boolean
  weddingDayValue?: "accept" | "decline" | null
}

export const SubmitSection = ({
  nightBeforeAccess,
  errors,
  isSubmitting = false,
  weddingDayValue,
}: Props) => {
  // Filter out menu and allergy errors if wedding day is declined
  const filteredErrors = weddingDayValue === "decline"
    ? Object.fromEntries(
      Object.entries(errors).filter(
        ([key]) =>
          !["starter", "main", "dessert", "allergies", "allergyNotes"].includes(
            key,
          ),
      ),
    )
    : errors

  return (
    <div
      className={`${nightBeforeAccess ? "bg-forest-green text-beige" : "bg-beige text-forest-green"} flex flex-col justify-center items-center justify-center py-10 gap-5`}
    >
      {Object.values(filteredErrors).length > 0 && (
        <div className="w-full max-w-[550px] mx-auto mb-6">
          <div
            className="
        bg-white 
        text-[#9b1c1c]            /* warm muted red */
        border-2 border-forest-green 
        px-5 py-4 
        shadow-md 
        font-adega 
        text-base 
        tracking-wide
      "
          >
            <div className="flex w-full justify-center">
              <p className="text-5xl mb-2 font-mattedly">
                Please check the following
              </p>
            </div>

            <ul className="list-disc list-inside space-y-1 font-evafiya text-lg">
              {Object.values(filteredErrors).map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Button
        type="submit"
        variant={nightBeforeAccess ? "primary" : "secondary"}
        className="w-[300px] px-10 py-5 font-adega text-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            SUBMITTING...
          </>
        ) : (
          "SUBMIT YOUR RSVP"
        )}
      </Button>
    </div>
  )
}
