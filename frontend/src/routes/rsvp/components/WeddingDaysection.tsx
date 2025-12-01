import { type Control, Controller } from "react-hook-form"
import WeddingDayGreen from "@/assets/Green-Church-Wedding-day.png"
import WeddingDayWhite from "@/assets/White-Church-Wedding-day.png"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Inputs } from "../types"

type Props = {
  nightBeforeAccess: boolean
  control: Control<Inputs>
}

export const WeddingDaysection = ({ nightBeforeAccess, control }: Props) => {
  return (
    <div
      className={`grid gap-3 grid-cols-1 sm:grid-cols-2 ${nightBeforeAccess ? "bg-forest-green text-beige" : "bg-beige text-forest-green"} py-15`}
    >
      <div className="flex flex-col items-center text-center gap-5">
        <p className="text-6xl font-mattedly">Our Wedding Day</p>
        <p className="font-adega">
          FRIDAY <span className="text-xl">14</span>TH AUGUST{" "}
          <span className="text-xl">2026</span>
        </p>

        <img
          src={nightBeforeAccess ? WeddingDayWhite : WeddingDayGreen}
          alt="Wedding day"
          className="w-[200px] h-[200px]"
        />

        <p className="font-evafiya text-xl">
          Please let us know if you’ll be joining us on the day
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-full font-adega">
        <Controller
          name="weddingDay"
          control={control}
          rules={{ required: "Confirm Wedding attendance" }}
          render={({ field }) => (
            <RadioGroup
              value={field.value ?? ""}
              onValueChange={field.onChange}
              className="flex flex-col gap-4 w-full max-w-[340px]"
            >
              {/* Accept */}
              <Label
                htmlFor="wd-accept"
                className={`
            flex items-center gap-4 w-full
            px-5 py-3
            border
            ${nightBeforeAccess ? "bg-beige/95 text-forest-green" : "bg-forest-green/95 text-beige"}
            shadow-sm
            cursor-pointer
          `}
              >
                <RadioGroupItem id="wd-accept" value="accept" />
                <span className="text-lg tracking-wide">Joyfully Accepts</span>
              </Label>

              {/* Decline */}
              <Label
                htmlFor="wd-decline"
                className={`
            flex items-center gap-4 w-full
            px-5 py-3
            border
            ${nightBeforeAccess ? "bg-beige/95 text-forest-green" : "bg-forest-green/95 text-beige"}
            shadow-sm
            cursor-pointer
          `}
              >
                <RadioGroupItem
                  id="wd-decline"
                  value="decline"
                  className="border-forest-green text-forest-green"
                />
                <span className="text-lg tracking-wide">
                  Regretfully Declines
                </span>
              </Label>
            </RadioGroup>
          )}
        />
      </div>
    </div>
  )
}
