import { type SubmitHandler, useForm } from "react-hook-form"
import LogoBeige from "@/assets/Logo-Biege.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

type Props = {
  setAccess: React.Dispatch<React.SetStateAction<string | null>>
}

type FormInput = {
  password: string
}

const FLOATING_ITEMS = [
  { emoji: "💐", size: "text-3xl", x: 8, delay: 0, duration: 12 },
  { emoji: "🌿", size: "text-2xl", x: 20, delay: 2, duration: 15 },
  { emoji: "💍", size: "text-2xl", x: 35, delay: 4, duration: 11 },
  { emoji: "🌸", size: "text-3xl", x: 50, delay: 1, duration: 14 },
  { emoji: "🕊️", size: "text-2xl", x: 65, delay: 3, duration: 13 },
  { emoji: "🌿", size: "text-xl", x: 78, delay: 5, duration: 16 },
  { emoji: "💐", size: "text-2xl", x: 88, delay: 2.5, duration: 10 },
  { emoji: "🌸", size: "text-xl", x: 12, delay: 6, duration: 17 },
  { emoji: "💍", size: "text-3xl", x: 55, delay: 7, duration: 12 },
  { emoji: "🕊️", size: "text-xl", x: 92, delay: 1.5, duration: 15 },
  { emoji: "🌿", size: "text-2xl", x: 42, delay: 8, duration: 11 },
  { emoji: "💐", size: "text-xl", x: 70, delay: 4.5, duration: 14 },
]

export const PinScreen = ({ setAccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInput>()

  const [shake, setShake] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

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
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <div className="bg-forest-green text-beige min-h-screen flex flex-col items-center gap-6 px-5 text-center justify-center overflow-hidden relative">
      {/* Animated floating background elements */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-10vh) rotate(20deg); opacity: 0; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes logo-shimmer {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(248,248,244,0)); }
          50% { filter: drop-shadow(0 0 12px rgba(248,248,244,0.45)); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
        .float-item { position: absolute; bottom: -10%; pointer-events: none; animation: float-up linear infinite; }
        .logo-shimmer { animation: logo-shimmer 3s ease-in-out infinite; }
        .fade-in-up { animation: fade-in-up 0.7s ease-out both; }
        .shake { animation: shake 0.6s ease-in-out; }
      `}</style>

      {FLOATING_ITEMS.map((item, i) => (
        <span
          key={i}
          className={`float-item ${item.size}`}
          style={{
            left: `${item.x}%`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.emoji}
        </span>
      ))}

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center gap-5"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s" }}
      >
        <img
          src={LogoBeige}
          alt=""
          className="w-[130px] opacity-90 logo-shimmer fade-in-up"
          style={{ animationDelay: "0s" }}
        />

        <div
          className="fade-in-up flex flex-col items-center gap-1"
          style={{ animationDelay: "0.15s" }}
        >
          <h2 className="text-5xl font-mattedly leading-tight">Welcome</h2>
          <p className="text-sm font-adega tracking-widest opacity-70 uppercase">
            Alexander &amp; Charlotte
          </p>
        </div>

        <p
          className="fade-in-up text-md font-evafiya max-w-[280px] opacity-90 leading-relaxed"
          style={{ animationDelay: "0.3s" }}
        >
          You're on the guest list — enter the password from your invitation to
          unlock your RSVP ✨
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fade-in-up flex flex-col items-center gap-4 w-full max-w-[280px]"
          style={{ animationDelay: "0.45s" }}
        >
          <div className={`w-full ${shake ? "shake" : ""}`}>
            <Input
              {...register("password", {
                required: "Password is required",
              })}
              placeholder="Enter your password"
              className="bg-white/10 border border-beige/40 placeholder:text-beige/50 text-beige max-w-full text-center font-evafiya focus:border-beige/80 focus:bg-white/15 transition-all"
            />
          </div>

          {errors.password && (
            <p className="text-red-300 text-sm font-adega animate-bounce">
              {errors.password.message}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full font-adega text-xl hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            Open My Invite
          </Button>
        </form>

        <p
          className="fade-in-up text-xs font-evafiya opacity-40 mt-2"
          style={{ animationDelay: "0.6s" }}
        >
          14 · 08 · 26 · Burley Manor
        </p>
      </div>
    </div>
  )
}
