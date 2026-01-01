import { Link, useNavigate } from "react-router"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "./ui/button"

type Props = {
  setAccessCode: React.Dispatch<React.SetStateAction<string | null>>
}

export const Header = ({ setAccessCode }: Props) => {
  const navigate = useNavigate()
  return (
    <div className="bg-primary p-5 text-primary-foreground border-b border-primary-foreground">
      <div className="flex justify-between items-center flex-wrap gap-4">
        {/* Navigation Links */}
        <div className="flex gap-4 items-center flex-wrap">
          <Link to="/">Home</Link>
          <Link to="/rsvp-list">RSVP List</Link>
          <Link to="/meal-counts">Meal Counts</Link>
          <Link to="/guests">Guests</Link>
          <Link to="/seating">Seating</Link>
          <Link to="/costs">Costs</Link>
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
        <ThemeToggle />
      </div>
    </div>
  )
}
