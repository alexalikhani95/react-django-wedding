import { type Control, Controller } from "react-hook-form"
import NightBeforeGreen from "@/assets/Night-before-green.png"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Inputs } from "../types"

type NightBeforeSectionProps = {
  control: Control<Inputs>
}

export const NightBeforeSection = ({ control }: NightBeforeSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 bg-beige py-15">
      <div className="flex flex-col items-center text-center gap-5">
        <p className="font-mattedly text-6xl">The Night Before</p>
        <p className="font-adega">
          THURSDAY <span className="text-xl">13</span>TH AUGUST{" "}
          <span className="text-xl">2026</span>
        </p>

        <p className="font-evafiya text-xl font-bold">7.00pm - 10.00pm</p>

        <img
          src={NightBeforeGreen}
          alt="Night before scene"
          className="w-[300px] h-[200px]"
        />

        <p className="font-evafiya text-xl font-bold">
          23 High Street, Lyndhurst, SO43 7BE
        </p>

        <p className="font-evafiya text-xl font-bold">
          Please let us know if you&apos;ll be joining us the night before
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-full font-adega">
        <Controller
          name="nightBefore"
          control={control}
          rules={{
            required: "Select night before attendance",
          }}
          render={({ field }) => (
            <RadioGroup
              className="flex flex-col gap-4 w-full max-w-[320px] mt-2"
              value={field.value ?? ""}
              onValueChange={field.onChange}
            >
              <Label
                htmlFor="nb-accept"
                className="flex items-center gap-4 w-full px-5 py-3 border border-forest-green/30 bg-white/95 text-forest-green shadow-sm cursor-pointer"
              >
                <RadioGroupItem id="nb-accept" value="accept" />
                <span className="text-lg tracking-wide">Joyfully Accepts</span>
              </Label>

              <Label
                htmlFor="nb-decline"
                className="flex items-center gap-4 w-full px-5 py-3 border border-forest-green/30 bg-white/95 text-forest-green shadow-sm cursor-pointer"
              >
                <RadioGroupItem id="nb-decline" value="decline" />
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
