import type { Ref } from "react"
import type { UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Inputs } from "../types"

type YourDetailsProps = {
  ref: Ref<HTMLDivElement> | undefined
  register: UseFormRegister<Inputs>
}

export const YourDetails = ({ ref, register }: YourDetailsProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-12 bg-beige"
      ref={ref}
    >
      <h2 className="text-6xl font-mattedly mb-4">Your Details</h2>

      <p className="font-evafiya text-xl mb-4">
        After submitting this form, you'll be prompted to complete it again for
        each additional guest named on your invitation envelope
      </p>

      <div className="flex flex-col gap-4 w-full max-w-[360px] items-center text-center">
        <Label
          htmlFor="firstName"
          className="w-full flex justify-center text-md font-adega"
        >
          FIRST NAME
        </Label>
        <Input
          id="firstName"
          className="bg-white font-evafiya text-forest-green leading"
          {...register("firstName", { required: "Please add your first name" })}
        />

        <Label
          htmlFor="lastName"
          className="w-full flex justify-center text-md font-adega mt-2"
        >
          LAST NAME
        </Label>
        <Input
          id="lastName"
          className="bg-white font-evafiya text-forest-green leading"
          {...register("lastName", { required: "Please add your last name" })}
        />
      </div>
    </div>
  )
}
