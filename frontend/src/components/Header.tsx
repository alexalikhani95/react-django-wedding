import { NavLink, useNavigate } from "react-router"
import { Button } from "./ui/button"

type Props = {
  setAccessCode: React.Dispatch<React.SetStateAction<string | null>>
}

export const Header = ({ setAccessCode }: Props) => {
  const navigate = useNavigate()
  const links = [
    { to: "/", label: "Home" },
    { to: "/rsvp-list", label: "RSVP List" },
    { to: "/meal-counts", label: "Meal Counts" },
    { to: "/guests", label: "Guests" },
    { to: "/seating", label: "Seating" },
    { to: "/costs", label: "Costs" },
  ]

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "inline-flex items-center px-1 py-0.5 transition-colors duration-150",
      "hover:text-beige hover:underline hover:underline-offset-4",
      "focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4",
      isActive
        ? "text-beige underline underline-offset-4"
        : "text-primary-foreground/90",
    ].join(" ")

  return (
    <div className="bg-primary p-5 text-primary-foreground border-b border-primary-foreground w-full max-w-full overflow-x-hidden">
      <div className="flex justify-between items-center flex-wrap gap-4 w-full max-w-full">
        {/* Navigation Links */}
        <div className="flex flex-1 justify-between">
          <div className="flex gap-3">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={navLinkClass}
                end={to === "/"}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <Button
            variant={"primary"}
            onClick={() => {
              localStorage.removeItem("accessCode")
              setAccessCode(null)
              navigate("/")
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
