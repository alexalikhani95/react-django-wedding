import { useState } from "react"
import LogoBeige from "@/assets/Logo-Biege.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  setAccess: React.Dispatch<React.SetStateAction<string | null>>
}

export const PinScreen = ({ setAccess }: Props) => {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (code === "140826") {
      setAccess("weddingDay")
      localStorage.setItem("accessCode", "weddingDay")
    }
    if (code.toLowerCase() === "charlotte") {
      setAccess("charlotte")
      localStorage.setItem("accessCode", "charlotte")
    } else if (code.toLowerCase() === "alikhaniwedding") {
      setAccess("nightBefore")
      localStorage.setItem("accessCode", "nightBefore")
    } else {
      setError("Incorrect code. Please try again.")
    }
  }

  return (
    <div className="bg-forest-green text-beige min-h-screen flex flex-col items-center gap-6 px-5 text-center justify-center">
      <img src={LogoBeige} className="w-[120px] opacity-80" />

      <h2 className="text-5xl font-mattedly">Welcome</h2>
      <p className="text-md font-evafiya max-w-[260px]">
        Please enter the password on your invitation to continue
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6"
      >
        <Input
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            setError("")
          }}
          placeholder="Enter password"
          className="bg-white max-w-[240px] text-forest-green font-evafiya"
        />

        {error && <p className="text-red-600 text-sm font-adega">{error}</p>}

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
