import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { CelebrateSection } from "./components/CelebrateSection"
import { DetailsSection } from "./components/DetailsSection"
import { IntroSection } from "./components/IntroSection"
import { MenuAndAllergies } from "./components/MenuAndAllergies"
import { NightBeforeSection } from "./components/NightBeforeSection"
import { SubmitSection } from "./components/SubmitSection"
import { ThankyouSection } from "./components/ThankyouSection"
import { WeddingDaysection } from "./components/WeddingDaysection"
import { YourDetails } from "./components/YourDetails"

const API_URL = import.meta.env.VITE_API_URL

type Inputs = {
  guestName: string

  nightBefore: "accept" | "decline" | null
  weddingDay: "accept" | "decline" | null

  starter: "tomato" | "antipasti" | null
  main: "croute" | "risotto" | null
  dessert: "tart" | "jelly" | null

  allergies: "none" | "yes" | null
  allergyNotes: string
}

type Props = {
  access: string
}

const RsvpScreen = ({ access }: Props) => {
  const rsvpRef = useRef<HTMLDivElement | null>(null)
  const detailsRef = useRef<HTMLDivElement | null>(null)
  const submittedRef = useRef<HTMLDivElement | null>(null)
  const [showSubmitted, setShowSubmitted] = useState(false)

  const queryClient = useQueryClient()

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    shouldFocusError: false, // Stop screen jumping up when submitting
  })

  const allergiesValue = watch("allergies")
  const weddingDayValue = watch("weddingDay")

  const mutation = useMutation({
    mutationFn: async (data: Inputs) => {
      const response = await fetch(`${API_URL}/api/rsvp/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.guestName,
          night_before: data.nightBefore,
          wedding_day: data.weddingDay,

          starter: data.starter,
          main: data.main,
          dessert: data.dessert,

          allergies: data.allergies,
          allergy_notes: data.allergyNotes,
        }),
      })
      if (!response.ok) throw new Error("Failed to add Rsvp")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvps"] })
      reset()
      setShowSubmitted(true)
      toast.success("RSVP sent!")
      submittedRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    },
    onError: () => toast.error("Error sending RSVP. Please try again."),
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data)
  }

  const nightBeforeAccess = access === "nightBefore" || access === "charlotte"

  return (
    <>
      <IntroSection
        onScroll={() =>
          detailsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <YourDetails ref={detailsRef} register={register} />

        <CelebrateSection />

        {nightBeforeAccess && <NightBeforeSection control={control} />}

        <WeddingDaysection
          nightBeforeAccess={nightBeforeAccess}
          control={control}
        />

        {weddingDayValue !== "decline" && (
          <MenuAndAllergies
            nightBeforeAccess={nightBeforeAccess}
            control={control}
            register={register}
            allergiesValue={allergiesValue}
          />
        )}

        {/* Submit your RSVP */}
        <SubmitSection nightBeforeAccess={nightBeforeAccess} errors={errors} />
      </form>

      <ThankyouSection
        nightBeforeAccess={nightBeforeAccess}
        ref={submittedRef}
        showSubmitted={showSubmitted}
        onScroll={() =>
          detailsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      />

      <DetailsSection nightBeforeAccess={nightBeforeAccess} ref={detailsRef} />
    </>
  )
}

export default RsvpScreen
