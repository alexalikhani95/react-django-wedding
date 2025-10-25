import { Link } from "react-router"

export const Header = () => {
  return (
    <div className="bg-emerald-900 p-5 text-white">
      <div className="flex gap-4">
        <Link to="/rsvp">RSVP</Link>
        <Link to="/rsvp-list">RSVP List</Link>
        <Link to="/information">Information</Link>
        <Link to="/guests">Guests</Link>
        <Link to="/seating">Seating</Link>
      </div>
    </div>
  )
}
