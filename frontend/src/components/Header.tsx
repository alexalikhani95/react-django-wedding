import { Link } from "react-router"
import { ThemeToggle } from "./ThemeToggle"

export const Header = () => {
  return (
    <div className="bg-primary p-5 text-primary-foreground">
      <div className="flex justify-between items-center">
        {/* Navigation Links */}
        <div className="flex gap-4">
          <Link to="/rsvp">RSVP</Link>
          <Link to="/rsvp-list">RSVP List</Link>
          <Link to="/information">Information</Link>
          <Link to="/guests">Guests</Link>
          <Link to="/seating">Seating</Link>
        </div>
        <ThemeToggle />
      </div>
    </div>
  )
}