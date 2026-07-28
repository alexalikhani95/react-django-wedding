import { type SubmitHandler, useForm } from "react-hook-form"
import LogoBeige from "@/assets/Logo-Biege.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  setAccess: React.Dispatch<React.SetStateAction<string | null>>
}

type FormInput = {
  password: string
}

export const PinScreen = ({ setAccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const code = data.password.toLowerCase()

    if (code === "140826") {
      setAccess("weddingDay")
      localStorage.setItem("accessCode", "weddingDay")
    } else if (code === "1408wedding") {
      setAccess("weddingDayNoMeals")
      localStorage.setItem("accessCode", "weddingDayNoMeals")
    } else if (code === "charlotte") {
      setAccess("charlotte")
      localStorage.setItem("accessCode", "charlotte")
    } else if (code === "alikhaniwedding") {
      setAccess("nightBefore")
      localStorage.setItem("accessCode", "nightBefore")
    } else {
      setError("password", {
        type: "manual",
        message: "Incorrect password. Please try again.",
      })
    }
  }

  return (
    <div className="bg-forest-green text-beige min-h-screen flex flex-col items-center gap-6 px-5 text-center justify-center">
      <img src={LogoBeige} alt="" className="w-[120px] opacity-80" />
      <h2 className="text-5xl font-mattedly">Welcome</h2>
      <p className="text-md font-evafiya max-w-[260px]">
        Please enter the password on your invitation to continue
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4"
      >
        <Input
          {...register("password", {
            required: "Password is required",
          })}
          placeholder="Enter password"
          className="bg-white max-w-[240px] text-forest-green font-evafiya"
        />

        {errors.password && (
          <p className="text-red-500 text-sm font-adega">
            {errors.password.message}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-[200px] font-adega text-xl"
        >
          Continue
        </Button>
      </form>
    </div>
  )
}
